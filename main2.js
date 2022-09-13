"use strict";
// Event Listeners for the Attack and Defend buttons
attackButton.addEventListener("click", attackButtonSelected);
defendButton.addEventListener("click", defendButtonSelected);

  // Start filling the Action Gauge, also set the interval to variables
  let currentEnemy = enemy1;
  
  let autoPlayerActionGauge = setInterval(()=>{playerContinuousEvents(currentEnemy)}, player.agility);
  
  let autoEnemyActionGauge = setInterval(()=>{enemyContinuousEvents(currentEnemy)}, currentEnemy.agility);
  
  startStage(player, currentEnemy);