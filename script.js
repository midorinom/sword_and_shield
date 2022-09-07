"use strict";

let counter = 0;
const playerActionGauge1 = document.querySelector("#player_action_gauge1_progress");

function fillActionGauge() {
    playerActionGauge1.style.height = counter + "%";
    counter += 1;
}

const autoActionGauge = setInterval(fillActionGauge, 20);
    
if (counter >= 100) {
    clearInterval(autoActionGauge);
    counter = 0;
    playerActionGauge1.style.height = 0;
}
