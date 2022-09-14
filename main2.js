"use strict";

// Create class for upgrades
class Upgrades {
  constructor(stages12Upgrades = {}, stages34Upgrades = {}) {
    (this.stages12Upgrades = stages12Upgrades),
      (this.stages34Upgrades = stages34Upgrades);
  }

  getUpgradeDescription(imageUrl) {
    if (currentStage < 3) {
      for (let i = 0; i < 4; i++) {
        if (imageUrl === Object.keys(this.stages12Upgrades)[i]) {
          return Object.values(this.stages12Upgrades)[i];
        }
      }
    }
  }

  activateUpgrade(imageUrl, Player) {
    console.log(Object.keys(this.stages12Upgrades));
    if (imageUrl === Object.keys(this.stages12Upgrades)[0]) {
      Player.agility -= 60;
      console.log("agility upgrade");
    } else if (imageUrl === Object.keys(this.stages12Upgrades)[1]) {
      Player.strength += 10;
      console.log("strength upgrade");
    } else if (imageUrl === Object.keys(this.stages12Upgrades)[2]) {
      Player.hp += 50;
      Player.maxHp += 50;
      console.log("hp upgrade");
    } else if (imageUrl === Object.keys(this.stages12Upgrades)[3]) {
      Player.armour -= 0.5;
      console.log("armour upgrade");
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
    "images/stages12_upgrade1.png": "upgrade 1",
    "images/stages12_upgrade2.png": "upgrade 2",
    "images/stages12_upgrade3.png": "upgrade 3",
    "images/stages12_upgrade4.png": "upgrade 4",
  },
  { "nothing yet": "nothing yet" }
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
