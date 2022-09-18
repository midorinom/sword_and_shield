"use strict";

// ====================
// Continuous Functions
// ====================
function fillPlayerActionGauge() {
  // Increment the counter then make the height of the progress bar correspond to the counter value
  // If the player does not have 1 full bar yet
  if (player.actionGaugeCounter < 100) {
    player.actionGaugeCounter += 1;
    playerActionGauge1.style.height = player.actionGaugeCounter + "%";
  }
  // If the player has at least 1 bar filled already
  if (player.actionGaugeCounter >= 100 && player.actionGaugeCounter < 200) {
    player.actionGaugeCounter += 1;
    playerActionGauge2.style.height = player.actionGaugeCounter - 100 + "%";
  }
}

function fillEnemyActionGauge(Enemy) {
  // Increment the counter then make the height of the progress bar correspond to the counter value
  if (Enemy.actionGaugeCounter < 100) {
    Enemy.actionGaugeCounter += 1;
    enemyActionGauge1.style.height = Enemy.actionGaugeCounter + "%";
  } else {
    // Enemy automatically attacks when Action Gauge is full
    Enemy.attack(player);
  }
}

// This function will continually run throughout the fight as long as the player is not stunned
function playerContinuousEvents(Enemy) {
  fillPlayerActionGauge();
  // Check if the player has attack or defend selected. If so, call the respective functions
  if (player.actionSelected.attack === true) {
    player.attack(Enemy);
  }
  if (player.actionSelected.defend === true) {
    player.defend();
  }
  // Check if the player is dead, then run the endgame defeat function
  if (player.hp <= 0) {
    endgameScreen(false);
  }
}

// This function will continually run throughout the fight as long as the enemy is not stunned
function enemyContinuousEvents(Enemy) {
  fillEnemyActionGauge(Enemy);
  updateEnemyAttackDescriptions(Enemy);

  // If the currentStage is 4 or 5, check if the enemy is below 50% hp and has not yet gone berserk
  if (currentStage >= 4) {
    if (Enemy.hp / Enemy.maxHp < 0.5 && Enemy.status.berserk === false) {
      // Set the enemy's berserk to true so this code doesn't run again
      // Increase the enemy's stats accordingly and update the textlog
      Enemy.status.berserk = true;
      Enemy.strength += 5;
      Enemy.armour -= 0.3;
      Enemy.agility -= 10;

      const text = `The ${Enemy.name} has gone BERSERK and is much stronger now!`;
      updateTextLog(text);
    }
  }

  // Check if the enemy is dead. If it is not the final stage, run the goToUpgradeScreen function
  // If it is already  the final stage, run the endgame victory function
  if (Enemy.hp <= 0) {
    if (currentStage === 5) {
      endgameScreen(true);
    } else {
      goToUpgradeScreen();
    }
  }
}

// =============================================
// Event Listeners for Attack and Defend Buttons
// =============================================
function attackButtonSelected() {
  // Check first if the attack button was already selected
  if (player.actionSelected.attack === false) {
    // If Action Gauge is < 100, upsize the button when selected
    if (player.actionGaugeCounter < 100) {
      attackButton.style.height = 85 + "%";
      attackButton.style.width = 20 + "%";
    }
    // Set actionSelected state in the player class to true
    player.actionSelected.attack = true;
  }
  // The attack button was not already selected
  else {
    // De-select the button and downsize the button again
    player.actionSelected.attack = false;
    attackButton.style.height = 70 + "%";
    attackButton.style.width = 12 + "%";
  }
  // In case the defend button was selected, set it to false and downsize it
  player.actionSelected.defend = false;
  defendButton.style.height = 70 + "%";
  defendButton.style.width = 12 + "%";
}

function defendButtonSelected() {
  // Check first if the defend button was already selected
  if (player.actionSelected.defend === false) {
    // If Action Gauge is < 100, upsize the button when selected
    if (player.actionGaugeCounter < 100) {
      defendButton.style.height = 85 + "%";
      defendButton.style.width = 20 + "%";
    }
    // Set actionSelected state in the player class to true
    player.actionSelected.defend = true;
  }
  // The defend button was not already selected
  else {
    // De-select the button and downsize the button again
    player.actionSelected.defend = false;
    defendButton.style.height = 70 + "%";
    defendButton.style.width = 12 + "%";
  }
  // In case the defend button was selected, set it to false and downsize it
  player.actionSelected.attack = false;
  attackButton.style.height = 70 + "%";
  attackButton.style.width = 12 + "%";
}

// ==================================
// Functions that Update the Frontend
// ==================================
// Sets opacity of all the elements
function setBackgroundOpacity(opacity) {
  document.querySelector("#hp_bars").style.opacity = opacity;
  document.querySelector("#main_container").style.opacity = opacity;
  document.querySelector("#bottom_container").style.opacity = opacity;
  document.querySelector("#textlog").style.opacity = opacity;
}

// Update hp bar width, colour and hp value
function updateHp(isPlayer, ClassName) {
  // Define variables to be used later
  let hpValue;
  let hpBar;
  // If updating the hp of the player, use the player's hp elements
  if (isPlayer === true) {
    hpValue = "#player_hp_value";
    hpBar = "#player_hp_bar";
  }
  // If update the hp of the enemy, use the enemy's hp elements
  else {
    hpValue = "#enemy_hp_value";
    hpBar = "#enemy_hp_bar";
  }

  // Have the hp value on screen reflect the current hp in the backend
  document.querySelector(hpValue).innerText = ClassName.hp;

  // Have the hp bar on screen reflect the current hp proportion in the backend
  const hpPercentage = (ClassName.hp / ClassName.maxHp) * 100;
  document.querySelector(hpBar).style.width = hpPercentage + "%";

  // Change the colour of the hp bar depending on the hp proportion
  if (hpPercentage < 25) {
    document.querySelector(hpBar).style.backgroundColor = "red";
  } else if (hpPercentage >= 25 && hpPercentage < 50) {
    document.querySelector(hpBar).style.backgroundColor = "yellow";
  } else if (hpPercentage >= 50 && hpPercentage < 75) {
    document.querySelector(hpBar).style.backgroundColor = "lightgreen";
  } else {
    document.querySelector(hpBar).style.backgroundColor = "lightblue";
  }
}

// Update the text log with whatever new text is to be added
function updateTextLog(newText = "test") {
  // Add new text into textLog[0] then remove textLog[4] so the array doesn't grow infinitely.
  // Then, have the changes in the array be reflected on screen
  textLog.unshift(newText);
  textLog.pop();
  document.querySelector("#textlog_line1").innerText = textLog[0];
  document.querySelector("#textlog_line2").innerText = textLog[1];
  document.querySelector("#textlog_line3").innerText = textLog[2];
  document.querySelector("#textlog_line4").innerText = textLog[3];
}
