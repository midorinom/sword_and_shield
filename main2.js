"use strict";

// Create class for upgrades
class Upgrades {
  constructor(stages12Upgrades = {}, stages34Upgrades = {}) {
    (this.stages12Upgrades = stages12Upgrades),
      (this.stages34Upgrades = stages34Upgrades);
  }

  getUpgradeDescription(imageLink) {
    for (let i = 0; i < 4; i++) {
      if (imageLink === Object.keys(this.stages12Upgrades)[i]) {
        return Object.values(this.stages12Upgrades)[i];
      }
    }

    for (let i = 0; i < 4; i++) {
      if (imageLink === Object.keys(this.stages34Upgrades)[i]) {
        return Object.values(this.stages34Upgrades)[i];
      }
    }
  }

  activateUpgrade(imageLink, Player) {
    if (imageLink === Object.keys(this.stages12Upgrades)[0]) {
      Player.agility -= 10;
    } else if (imageLink === Object.keys(this.stages12Upgrades)[1]) {
      Player.strength += 3;
    } else if (imageLink === Object.keys(this.stages12Upgrades)[2]) {
      Player.hp += 50;
      Player.maxHp += 50;
    } else if (imageLink === Object.keys(this.stages12Upgrades)[3]) {
      Player.armour -= 0.25;
    }
  }
}

// Create instances for player
const player = new Player(
  100,
  100,
  5,
  1,
  50,
  0,
  { attack: false, defend: false },
  { defendStance: false, stun: false }
);

// Create instance for upgrades
const upgrades = new Upgrades(
  {
    "images/stages12_upgrade1.png": "\n\n\nAction Gauge\nSpeed +",
    "images/stages12_upgrade2.png": "\n\n\nStrength +",
    "images/stages12_upgrade3.png": "\n\n\nHealth +",
    "images/stages12_upgrade4.png": "\n\n\nArmour +",
  },
  {
    "images/stages34_upgrade1.png":
      "\n\nParrying will stun the enemy for 1.5 seconds",
    "images/stages34_upgrade2.png":
      "\n\nEach attack will\nhave a 30%\nchance to deal\n1.5x damage",
    "images/stages34_upgrade3.png":
      "\n\nAttacks will now hit twice, each attack does 55% damage",
    "images/stages34_upgrade4.png":
      "\n\nWhen you are attacked, there is a 50% chance to defend",
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
