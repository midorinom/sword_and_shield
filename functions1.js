"use strict";

function startStage(Player, Enemy) {
  document
    .querySelector("#upgrades_submit_button")
    .removeEventListener("click", upgradesSubmitButton);
  // Display player and enemy hp values onto the page
  updateHp(true, Player);
  updateHp(false, Enemy);

  // Start Enemy Queue
  first3EnemyAttacks(Enemy);
  updateEnemyQueue();

  unpause();
}

function unpause() {
  setBackgroundOpacity(1);

  attackButton.addEventListener("click", attackButtonSelected);
  defendButton.addEventListener("click", defendButtonSelected);

  enemyQueue1.addEventListener("mouseover", showEnemyAttackDescription1);
  enemyQueue2.addEventListener("mouseover", showEnemyAttackDescription2);
  enemyQueue3.addEventListener("mouseover", showEnemyAttackDescription3);
  enemyQueue1.addEventListener("mouseout", hideEnemyAttackDescription1);
  enemyQueue2.addEventListener("mouseout", hideEnemyAttackDescription2);
  enemyQueue3.addEventListener("mouseout", hideEnemyAttackDescription3);
}

function pause() {
  setBackgroundOpacity(0.4);

  clearInterval(autoPlayerActionGauge);
  clearInterval(autoEnemyActionGauge);

  attackButton.removeEventListener("click", attackButtonSelected);
  defendButton.removeEventListener("click", defendButtonSelected);

  enemyQueue1.removeEventListener("mouseover", showEnemyAttackDescription1);
  enemyQueue2.removeEventListener("mouseover", showEnemyAttackDescription2);
  enemyQueue3.removeEventListener("mouseover", showEnemyAttackDescription3);
  enemyQueue1.removeEventListener("mouseout", hideEnemyAttackDescription1);
  enemyQueue2.removeEventListener("mouseout", hideEnemyAttackDescription2);
  enemyQueue3.removeEventListener("mouseout", hideEnemyAttackDescription3);
}

// Defining functions for showing/hiding enemy attack descriptions
function showEnemyAttackDescription1() {
  showEnemyAttackDescription(0);
}
function showEnemyAttackDescription2() {
  showEnemyAttackDescription(1);
}
function showEnemyAttackDescription3() {
  showEnemyAttackDescription(2);
}
function hideEnemyAttackDescription1() {
  hideEnemyAttackDescription(0);
}
function hideEnemyAttackDescription2() {
  hideEnemyAttackDescription(1);
}
function hideEnemyAttackDescription3() {
  hideEnemyAttackDescription(2);
}

function setBackgroundOpacity(opacity) {
  document.querySelector("#hp_bars").style.opacity = opacity;
  document.querySelector("#main_div").style.opacity = opacity;
  document.querySelector("#bottom_container").style.opacity = opacity;
  document.querySelector("#textlog").style.opacity = opacity;
}

function updateHp(isPlayer, ClassName) {
  let hpValue;
  let hpBar;
  if (isPlayer === true) {
    hpValue = "#player_hp_value";
    hpBar = "#player_hp_bar";
  } else {
    hpValue = "#enemy_hp_value";
    hpBar = "#enemy_hp_bar";
  }
  document.querySelector(hpValue).innerText = ClassName.hp;
  const hpPercentage = (ClassName.hp / ClassName.maxHp) * 100;
  document.querySelector(hpBar).style.width = hpPercentage + "%";

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

function updatePlayerHp(Player) {
  document.querySelector("#player_hp_value").innerText = Player.hp;
  const hpPercentage = (Player.hp / Player.maxHp) * 100;
  document.querySelector("#player_hp_bar").style.width = hpPercentage + "%";
}

function updateEnemyHp(Enemy) {
  document.querySelector("#enemy_hp_value").innerText = Enemy.hp;
  const hpPercentage = (Enemy.hp / Enemy.maxHp) * 100;
  document.querySelector("#enemy_hp_bar").style.width = hpPercentage + "%";
}

function updateTextLog(newText = "test") {
  // add new text into textLog[0] then remove textLog[4] so the array doesn't grow infinitely. Then update the css.
  textLog.unshift(newText);
  textLog.pop();
  document.querySelector("#textlog_line1").innerText = textLog[0];
  document.querySelector("#textlog_line2").innerText = textLog[1];
  document.querySelector("#textlog_line3").innerText = textLog[2];
  document.querySelector("#textlog_line4").innerText = textLog[3];
}

function performDamageFomula(strength, opponentArmour) {
  // Roll a random number between 1 to 20
  const modifier = Math.ceil(Math.random() * 20);
  let damage = 0;
  // Coin toss to decide whether to add or subtract that random number from the strength value. Then account for opponent's armour.
  if (Math.round(Math.random()) === 0) {
    damage = Math.round(strength * ((100 - modifier) / 100) * opponentArmour);
  } else {
    damage = Math.round(strength * ((100 + modifier) / 100) * opponentArmour);
  }
  return damage;
}

function fillPlayerActionGauge() {
  // Make the height of the progress bar correspond to the counter value, then increment counter
  if (player.actionGaugeCounter < 100) {
    player.actionGaugeCounter += 1;
    playerActionGauge1.style.height = player.actionGaugeCounter + "%";
  }
  if (player.actionGaugeCounter >= 100 && player.actionGaugeCounter < 200) {
    player.actionGaugeCounter += 1;
    playerActionGauge2.style.height = player.actionGaugeCounter - 100 + "%";
  }
}

function fillEnemyActionGauge(Enemy) {
  if (Enemy.actionGaugeCounter < 100) {
    Enemy.actionGaugeCounter += 1;
    enemyActionGauge1.style.height = Enemy.actionGaugeCounter + "%";
  } else {
    // Enemy automatically attacks when Action Gauge is full
    Enemy.attack(player);
  }
}

function attackButtonSelected() {
  // check first if the button is already selected
  if (player.actionSelected.attack === false) {
    // if Action Gauge is < 100, make button bigger when selected
    if (player.actionGaugeCounter < 100) {
      attackButton.style.height = 85 + "%";
      attackButton.style.width = 20 + "%";
    }
    // set actionSelected state in the player class to true
    player.actionSelected.attack = true;
  } else {
    // de-select the button and make the button size small again
    player.actionSelected.attack = false;
    attackButton.style.height = 70 + "%";
    attackButton.style.width = 12 + "%";
  }
  // if any other button was selected, set it to false and make it small
  player.actionSelected.defend = false;
  defendButton.style.height = 70 + "%";
  defendButton.style.width = 12 + "%";
}

function defendButtonSelected() {
  if (player.actionSelected.defend === false) {
    if (player.actionGaugeCounter < 100) {
      defendButton.style.height = 85 + "%";
      defendButton.style.width = 20 + "%";
    }
    player.actionSelected.defend = true;
  } else {
    player.actionSelected.defend = false;
    defendButton.style.height = 70 + "%";
    defendButton.style.width = 12 + "%";
  }
  player.actionSelected.attack = false;
  attackButton.style.height = 70 + "%";
  attackButton.style.width = 12 + "%";
}

// This function will continually run throughout the fight as long as the player is not stunned
function playerContinuousEvents(Enemy) {
  fillPlayerActionGauge();
  if (player.actionSelected.attack === true) {
    player.attack(Enemy);
  }
  if (player.actionSelected.defend === true) {
    player.defend();
  }
  if (player.hp <= 0) {
    endgameScreen(false);
  }
}

// This function will continually run throughout the fight as long as the enemy is not stunned
function enemyContinuousEvents(Enemy) {
  fillEnemyActionGauge(Enemy);
  updateEnemyAttackDescriptions(Enemy);
  if (Enemy.hp <= 0) {
    if (currentStage === 3) {
      endgameScreen(true);
    } else {
      stageLoop();
    }
  }
}

function showUpgradesDescription1() {
  document.querySelector("#upgrades_description1").style.display = "block";
  document.querySelector("#upgrades_image1").style.display = "none";
}
function hideUpgradesDescription1() {
  document.querySelector("#upgrades_image1").style.display = "block";
  document.querySelector("#upgrades_description1").style.display = "none";
}
function showUpgradesDescription2() {
  document.querySelector("#upgrades_description2").style.display = "block";
  document.querySelector("#upgrades_image2").style.display = "none";
}
function hideUpgradesDescription2() {
  document.querySelector("#upgrades_image2").style.display = "block";
  document.querySelector("#upgrades_description2").style.display = "none";
}

function selectUpgrade1Image() {
  upgradesImage2Container.style.height = 50 + "%";
  upgradesImage2Container.style.width = 20 + "%";
  upgrades2Selected = false;
  hideUpgradesDescription2();

  if (upgrades1Selected === false) {
    showUpgradesDescription1();
    upgradesImage1Container.style.height = 70 + "%";
    upgradesImage1Container.style.width = 30 + "%";
    upgrades1Selected = true;
    chosenUpgrade = randomUpgrade1;
  } else {
    hideUpgradesDescription1();
    upgradesImage1Container.style.height = 50 + "%";
    upgradesImage1Container.style.width = 20 + "%";
    upgrades1Selected = false;
  }
}

function selectUpgrade2Image() {
  upgradesImage1Container.style.height = 50 + "%";
  upgradesImage1Container.style.width = 20 + "%";
  upgrades1Selected = false;
  hideUpgradesDescription1();

  if (upgrades2Selected === false) {
    showUpgradesDescription2();
    upgradesImage2Container.style.height = 70 + "%";
    upgradesImage2Container.style.width = 30 + "%";
    upgrades2Selected = true;
    chosenUpgrade = randomUpgrade2;
  } else {
    hideUpgradesDescription2();
    upgradesImage2Container.style.height = 50 + "%";
    upgradesImage2Container.style.width = 20 + "%";
    upgrades2Selected = false;
  }
}

function determineTwoRandomUpgrades() {
  const rollForAgility1 = Math.floor(Math.random() * 100);
  const rollForAgility2 = Math.floor(Math.random() * 100);

  if (rollForAgility1 < 16 || rollForAgility2 < 16) {
    randomUpgrade1 = Object.keys(upgrades.stages12Upgrades)[0];
    randomUpgrade2 = Object.keys(upgrades.stages12Upgrades)[
      Math.ceil(Math.random() * 3)
    ];
  } else {
    const randomNumber = Math.floor(Math.random() * 3);
    switch (randomNumber) {
      case 0:
        randomUpgrade1 = Object.keys(upgrades.stages12Upgrades)[1];
        randomUpgrade2 = Object.keys(upgrades.stages12Upgrades)[2];
        break;
      case 1:
        randomUpgrade1 = Object.keys(upgrades.stages12Upgrades)[1];
        randomUpgrade2 = Object.keys(upgrades.stages12Upgrades)[3];
        break;
      case 2:
        randomUpgrade1 = Object.keys(upgrades.stages12Upgrades)[2];
        randomUpgrade2 = Object.keys(upgrades.stages12Upgrades)[3];
    }
  }
  // Update the images
  upgradesImage1.src = randomUpgrade1;
  upgradesImage2.src = randomUpgrade2;
  // Update the description
  document.querySelector("#upgrades_description1").innerText =
    upgrades.getUpgradeDescription(randomUpgrade1);
  document.querySelector("#upgrades_description2").innerText =
    upgrades.getUpgradeDescription(randomUpgrade2);
}

function upgradesSubmitButton() {
  if (chosenUpgrade === "notSelected") {
    alert("Please select an upgrade");
  } else {
    upgrades.activateUpgrade(chosenUpgrade, player);

    hideUpgradesDescription1();
    upgrades1Selected = false;
    upgradesImage1Container.style.height = 50 + "%";
    upgradesImage1Container.style.width = 20 + "%";
    hideUpgradesDescription2();
    upgrades2Selected = false;
    upgradesImage2Container.style.height = 50 + "%";
    upgradesImage2Container.style.width = 20 + "%";

    chosenUpgrade = "notSelected";

    currentStage += 1;

    generateEnemy();

    upgradesImage1Container.removeEventListener("click", selectUpgrade1Image);
    upgradesImage2Container.removeEventListener("click", selectUpgrade2Image);
    upgradesContainer.style.display = "none";

    startStage(player, currentEnemy);

    autoPlayerActionGauge = setInterval(() => {
      playerContinuousEvents(currentEnemy);
    }, player.agility);
    autoEnemyActionGauge = setInterval(() => {
      enemyContinuousEvents(currentEnemy);
    }, currentEnemy.agility);
  }
}

function stageLoop() {
  pause();
  // Show Upgrade Screen
  upgradesContainer.style.display = "block";
  // Pick 2 random upgrades
  determineTwoRandomUpgrades();
  // Add Click Events for the upgrades
  upgradesImage1Container.addEventListener("click", selectUpgrade1Image);
  upgradesImage2Container.addEventListener("click", selectUpgrade2Image);
  // Add click event for submit button
  document
    .querySelector("#upgrades_submit_button")
    .addEventListener("click", upgradesSubmitButton);
}

function endgameScreen(won = false) {
  pause();
  document.querySelector("#endgame_container").style.display = "block";
  document
    .querySelector("#endgame_restart_button")
    .addEventListener("click", restartButton);
  document
    .querySelector("#endgame_home_button")
    .addEventListener("click", homeButton);

  if (won === false) {
    document.querySelector("#endgame_title").innerText = "You lost";
  } else {
    document.querySelector("#endgame_title").innerText = "You won!";
  }
}

function restartButton() {
  location.reload();
}

function homeButton() {
  location.href = "index.html";
}
