"use strict";

function updatePlayerHp(hp) {
  document.querySelector("#player_hp_value").innerText = hp;
}

function updateEnemyHp(hp) {
  document.querySelector("#enemy_hp_value").innerText = hp;
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

function fillEnemyActionGauge() {
  if (enemy.actionGaugeCounter < 100) {
    enemy.actionGaugeCounter += 1;
    enemyActionGauge1.style.height = enemy.actionGaugeCounter + "%";
  } else {
    // Enemy automatically attacks when Action Gauge is full
    enemy.attack(player);
  }
}

function attackButtonSelected() {
  // check first if the button is already selected
  if (player.actionSelected.attack === false) {
    // if Action Gauge is < 100, make button bigger when selected
    if (player.actionGaugeCounter < 100) {
      attackButton.style.height = 85 + "%";
      attackButton.style.width = 15 + "%";
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
      defendButton.style.width = 15 + "%";
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
function playerContinuousEvents() {
  fillPlayerActionGauge();
  if (player.actionSelected.attack === true) {
    player.attack(enemy);
  }
  if (player.actionSelected.defend === true) {
    player.defend();
  }
}

// This function will continually run throughout the fight as long as the enemy is not stunned
function enemyContinuousEvents() {
  fillEnemyActionGauge();
}

function setBackgroundOpacity(opacity) {
  document.querySelector("#hp_bars").style.opacity = opacity;
  document.querySelector("#main_div").style.opacity = opacity;
  document.querySelector("#action_buttons").style.opacity = opacity;
  document.querySelector("#textlog").style.opacity = opacity;
}
