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
    // Stages12 Pool
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
    // Stages34 Pool
    if (imageLink === Object.keys(this.stages34Upgrades)[0]) {
      Player.agility -= 60;
    } else if (imageLink === Object.keys(this.stages34Upgrades)[1]) {
      Player.strength += 10;
    } else if (imageLink === Object.keys(this.stages34Upgrades)[2]) {
      Player.hp += 50;
      Player.maxHp += 50;
    } else if (imageLink === Object.keys(this.stages34Upgrades)[3]) {
      Player.armour -= 0.5;
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
    "images/stages12_upgrade1.png": "\n\nAction Gauge Speed +",
    "images/stages12_upgrade2.png": "\n\nStrength +",
    "images/stages12_upgrade3.png": "\n\nHealth +",
    "images/stages12_upgrade4.png": "\n\nArmour +",
  },
  {
    "images/stages34_upgrade1.png":
      "\nParrying will stun the enemy for 1 second",
    "images/stages34_upgrade2.png":
      "\nEach attack will have a 30% chance to deal 1.5x damage",
    "images/stages34_upgrade3.png":
      "\nAttacks will now hit twice, each attack does 55% damage",
    "images/stages34_upgrade4.png":
      "\nWhen you are attacked, there is a 50% chance to defend.",
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
