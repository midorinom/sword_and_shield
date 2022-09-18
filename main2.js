"use strict";

// =====================
// Create Upgrades Class
// =====================
class Upgrades {
  // For these objects, the keys would be the image links while the values would be the description text
  constructor(stages12Upgrades = {}, stages34Upgrades = {}) {
    (this.stages12Upgrades = stages12Upgrades),
      (this.stages34Upgrades = stages34Upgrades);
  }

  // --- getUpgradeDescription Function ---
  // Checks the image link passed into the function against the keys of all the objects stored in the class.
  // Then, return the corresponding value which would be the description text
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

  // --- activateUpgrade Function ---
  // Checks the iamge link passed into the function against the keys of the stages12Upgrades object
  // Then, activate the upgrade's effects by adding the relevant stats to the player class's variables
  activateUpgrade(imageLink, Player) {
    if (imageLink === Object.keys(this.stages12Upgrades)[0]) {
      Player.agility -= 6;
    } else if (imageLink === Object.keys(this.stages12Upgrades)[1]) {
      Player.strength += 1;
    } else if (imageLink === Object.keys(this.stages12Upgrades)[2]) {
      Player.hp += 50;
      Player.maxHp += 50;
    } else if (imageLink === Object.keys(this.stages12Upgrades)[3]) {
      Player.armour -= 0.22;
    }
  }
}

// ========================================
// Create instances for player and upgrades
// ========================================
const player = new Player(
  100,
  100,
  5,
  1,
  40,
  0,
  { attack: false, defend: false },
  { defendStance: false, stun: false }
);

const upgrades = new Upgrades(
  {
    "images/stages12_upgrade1.png": "Action Gauge Speed +",
    "images/stages12_upgrade2.png": "Strength +",
    "images/stages12_upgrade3.png": "Health +",
    "images/stages12_upgrade4.png": "Armour +",
  },
  {
    "images/stages34_upgrade1.png":
      "Parrying will stun the enemy for 1.5 seconds",
    "images/stages34_upgrade2.png":
      "Each attack will now have a 30% chance to critically strike for 2x damage",
    "images/stages34_upgrade3.png":
      "Attacks will now hit twice. Each attack does 65% damage",
    "images/stages34_upgrade4.png":
      "When you are attacked, there is a 50% chance to automatically defend",
  }
);

// ==================
// Setting up Stage 1
// ==================
// Randomly select an enemy and create instance
generateEnemy();

// Start filling the Action Gauge, also set the interval to variables
let autoPlayerActionGauge = setInterval(() => {
  playerContinuousEvents(currentEnemy);
}, player.agility);
let autoEnemyActionGauge = setInterval(() => {
  enemyContinuousEvents(currentEnemy);
}, currentEnemy.agility);

// Start the Stage
startStage(player, currentEnemy);
