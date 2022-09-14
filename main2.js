"use strict";

// Create class for upgrades
class Upgrades {
  constructor(stages12Upgrades = {}, stages34Upgrades = {}) {
    (this.stages12Upgrades = stages12Upgrades),
      (this.stages34Upgrades = stages34Upgrades);
  }

  getUpgradeDescription(upgradeNumber, currentStage) {
    switch (upgradeNumber) {
      case 1:
        if (currentStage < 3) {
          for (let i = 0; i < 4; i++) {
            if (upgradesImage1 === Object.keys(stages12Upgrades)[i]) {
              return Object.values(stages12Upgrades)[i];
            }
          }
        } else {
          for (let i = 0; i < 4; i++) {
            if (upgradesImage1 === Object.keys(stages34Upgrades)[i]) {
              return Object.values(stages34Upgrades)[i];
            }
          }
        }
        break;
      case 2:
        if (currentStage < 3) {
          for (let i = 0; i < 4; i++) {
            if (upgradesImage2 === Object.keys(stages12Upgrades)[i]) {
              return Object.values(stages12Upgrades)[i];
            }
          }
        } else {
          for (let i = 0; i < 4; i++) {
            if (upgradesImage2 === Object.keys(stages34Upgrades)[i]) {
              return Object.values(stages34Upgrades)[i];
            }
          }
        }
    }
  }

  // activateUpgrade(imageUrl) {
  //   if (imageUrl ===
  // }
}

// Create instance for upgrades
const upgrades = new Upgrades();

// Create instances for player
const player = new Player(
  100,
  100,
  5,
  1,
  20,
  0,
  { attack: false, defend: false },
  { defendStance: false }
);

// Randomly select an enemy and create instance
generateEnemy(1);

// Start filling the Action Gauge, also set the interval to variables
let autoPlayerActionGauge = setInterval(() => {
  playerContinuousEvents(currentEnemy);
}, player.agility);
let autoEnemyActionGauge = setInterval(() => {
  enemyContinuousEvents(currentEnemy);
}, currentEnemy.agility);

startStage(player, currentEnemy);
