"use strict";

// Defining variables
let playerActionGaugeCounter = 0;
const playerActionGauge1 = document.querySelector(
  "#player_action_gauge1_progress"
);
const playerActionGauge2 = document.querySelector(
  "#player_action_gauge2_progress"
);

function fillActionGauge() {
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

// Start filling the Action Gauge
let autoActionGauge = setInterval(fillActionGauge, 50);

function executeAction() {
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

// For testing purposes of simulating an action
document
  .querySelector("#execute_action")
  .addEventListener("click", executeAction);
