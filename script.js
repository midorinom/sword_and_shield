"use strict";

let counter = 0;

const playerActionGauge1 = document.querySelector(
  "#player_action_gauge1_progress"
);

function fillActionGauge() {
  playerActionGauge1.style.height = counter + "%";
  counter += 1;
}

function resetGauge() {
  clearInterval(autoActionGauge);
  counter = 0;
  playerActionGauge1.style.height = 0;
  autoActionGauge = setInterval(fillActionGauge, 20);
}

let autoActionGauge = setInterval(fillActionGauge, 20);

document.querySelector("#reset_button").addEventListener("click", resetGauge);
