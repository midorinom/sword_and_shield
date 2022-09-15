"use strict";

// Create class for upgrades
class Upgrades {
  constructor(stages12Upgrades = {}, stages34Upgrades = {}) {
    (this.stages12Upgrades = stages12Upgrades),
      (this.stages34Upgrades = stages34Upgrades);
  }

  getUpgradeDescription(imageLink) {
    if (currentStage < 3) {
      for (let i = 0; i < 4; i++) {
        if (imageLink === Object.keys(this.stages12Upgrades)[i]) {
          return Object.values(this.stages12Upgrades)[i];
        }
      }
    } else {
      for (let i = 0; i < 4; i++) {
        if (imageLink === Object.keys(this.stages34Upgrades)[i]) {
          return Object.values(this.stages34Upgrades)[i];
        }
      }
    }
  }

  activateUpgrade(imageLink, Player) {
    if (currentStage < 3) {
      if (imageLink === Object.keys(this.stages12Upgrades)[0]) {
        Player.agility -= 60;
      } else if (imageLink === Object.keys(this.stages12Upgrades)[1]) {
        Player.strength += 10;
      } else if (imageLink === Object.keys(this.stages12Upgrades)[2]) {
        Player.hp += 50;
        Player.maxHp += 50;
      } else if (imageLink === Object.keys(this.stages12Upgrades)[3]) {
        Player.armour -= 0.5;
      }
    }
  }
}

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

// Create instance for upgrades
const upgrades = new Upgrades(
  {
    "images/stages12_upgrade1.png": "\nAction Gauge Speed +",
    "images/stages12_upgrade2.png": "\nStrength +",
    "images/stages12_upgrade3.png": "\nHealth +",
    "images/stages12_upgrade4.png": "\nArmour +",
  },
  {
    "images/stages12_upgrade1.png": "Stages 34 - upgrade 1",
    "images/stages12_upgrade2.png": "Stages 34 - upgrade 2",
    "images/stages12_upgrade3.png": "Stages 34 - upgrade 3",
    "images/stages12_upgrade4.png": "Stages 34 - upgrade 4",
  }
);

// Randomly select an enemy and create instance
generateEnemy();

// Start filling the Action Gauge, also set the interval to variables
let autoPlayerActionGauge = setInterval(() => {
  playerContinuousEvents(currentEnemy);
}, player.agility);
let autoEnemyActionGauge = setInterval(() => {
  enemyContinuousEvents(currentEnemy);
}, currentEnemy.agility);

startStage(player, currentEnemy);
