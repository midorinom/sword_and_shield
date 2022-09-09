"use strict";

// Defining variables
let playerActionGaugeCounter = 0;
let playerActionGaugeSpeed = 50;
let enemyActionGaugeCounter = 0;
let enemyActionGaugeSpeed = 100;
const playerActionGauge1 = document.querySelector(
  "#player_action_gauge1_progress"
);
const playerActionGauge2 = document.querySelector(
  "#player_action_gauge2_progress"
);
const enemyActionGauge1 = document.querySelector(
  "#enemy_action_gauge1_progress"
);

// Start filling the Action Gauge
let autoPlayerActionGauge = setInterval(
  fillPlayerActionGauge,
  playerActionGaugeSpeed
);

let autoEnemyActionGauge = setInterval(
  fillEnemyActionGauge,
  enemyActionGaugeSpeed
);

function fillPlayerActionGauge() {
  // Make the height of the progress bar correspond to the counter value, then increment counter
  if (playerActionGaugeCounter < 100) {
    playerActionGaugeCounter += 1;
    playerActionGauge1.style.height = playerActionGaugeCounter + "%";
  }
  if (playerActionGaugeCounter >= 100 && playerActionGaugeCounter < 200) {
    playerActionGaugeCounter += 1;
    playerActionGauge2.style.height = playerActionGaugeCounter - 100 + "%";
  }
}

function fillEnemyActionGauge() {
  if (enemyActionGaugeCounter < 100) {
    enemyActionGaugeCounter += 1;
    enemyActionGauge1.style.height = enemyActionGaugeCounter + "%";
  } else {
    // Enemy automatically attacks when Action Gauge is full
    executeEnemyAttack();
  }
}

function executePlayerAttack() {
  // Check first if there is at least 1 full bar of Action Gauge before executing the function
  if (playerActionGaugeCounter >= 100) {
    // Subtract 1 bar 's worth (100) from the counter
    playerActionGaugeCounter -= 100;

    // Adjust the height of the bars to reflect the deduction from the counter
    // if the player had only 1 full bar initially:
    if (playerActionGaugeCounter <= 100) {
      playerActionGauge2.style.height = 0;
      playerActionGauge1.style.height = playerActionGaugeCounter + "%";
    }
    // if the player had 2 full bars initially:
    else {
      playerActionGauge1.style.height = "100%";
      playerActionGauge2.style.height = playerActionGaugeCounter - 100 + "%";
    }
  }
}

// Execute the attack and reset the gauge to 0
function executeEnemyAttack() {
  enemyActionGaugeCounter = 0;
  enemyActionGauge1.style.height = 0;
}

// For testing purposes of simulating an action
document
  .querySelector("#attack_button")
  .addEventListener("click", executePlayerAttack);

document
  .querySelector("#defend_button")
  .addEventListener("click", executePlayerAttack);
