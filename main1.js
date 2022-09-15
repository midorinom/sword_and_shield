"use strict";

// Define variables
let currentStage = 1;
const playerActionGauge1 = document.querySelector(
  "#player_action_gauge1_progress"
);
const playerActionGauge2 = document.querySelector(
  "#player_action_gauge2_progress"
);
const enemyActionGauge1 = document.querySelector(
  "#enemy_action_gauge1_progress"
);
const attackButton = document.querySelector("#attack_button");
const defendButton = document.querySelector("#defend_button");
const textLog = ["", "", "", ""];
const arrEnemyQueue = [];
const enemyQueue1 = document.querySelector("#enemy_queue1_container");
const enemyQueue2 = document.querySelector("#enemy_queue2_container");
const enemyQueue3 = document.querySelector("#enemy_queue3_container");
let currentEnemy;
let chosenUpgrade = "notSelected";
let randomUpgrade1, randomUpgrade2;
const upgradesContainer = document.querySelector("#upgrades_container");
let upgrades1Selected = false;
let upgrades2Selected = false;
const upgradesImage1 = document.querySelector("#upgrades_image1");
const upgradesImage2 = document.querySelector("#upgrades_image2");
const upgradesImage1Container = document.querySelector(
  "#upgrades_image1_container"
);
const upgradesImage2Container = document.querySelector(
  "#upgrades_image2_container"
);
const arrUpgrades = [];
const backgroundImages = [
  "url('images/background1.png')",
  "url('images/background2.png')",
  "url('images/background3.png')",
  "url('images/background4.png')",
  "url('images/background4.png')",
];
const upgradesDescription1 = document.querySelector("#upgrades_description1");
const upgradesDescription2 = document.querySelector("#upgrades_description2");

// Create Player class
class Player {
  constructor(
    maxHp,
    hp,
    strength,
    armour,
    agility,
    actionGaugeCounter,
    actionSelected = {},
    status = {}
  ) {
    (this.maxHp = maxHp),
      (this.hp = hp),
      (this.strength = strength),
      (this.armour = armour),
      (this.agility = agility),
      (this.actionGaugeCounter = actionGaugeCounter),
      (this.actionSelected = actionSelected),
      (this.status = status);
  }

  attack(Enemy) {
    let text = "";
    let damage;
    // Check first if there is at least 1 full bar of Action Gauge before executing the function
    if (this.actionGaugeCounter >= 100) {
      // setActionSelected and defendStance to false, downsize the attack button back to its original size
      this.actionSelected.attack = false;
      this.status.defendStance = false;
      attackButton.style.height = 70 + "%";
      attackButton.style.width = 12 + "%";
      // Subtract from the counter and adjust height of the bars to reflect the deduction
      this.actionGaugeCounter -= 100;
      if (this.actionGaugeCounter <= 100) {
        playerActionGauge2.style.height = 0;
        playerActionGauge1.style.height = this.actionGaugeCounter + "%";
      } else {
        playerActionGauge1.style.height = "100%";
        playerActionGauge2.style.height = this.actionGaugeCounter - 100 + "%";
      }
      // If the player has Double Hit
      if (arrUpgrades.includes("images/stages34_upgrade3.png") === true) {
        for (let i = 0; i < 2; i++) {
          damage = Math.round(
            0.55 * performDamageFomula(this.strength, Enemy.armour)
          );
          // If the player has Crit
          if (arrUpgrades.includes("images/stages34_upgrade2.png") === true) {
            if (Math.floor(Math.random() * 100) < 30) {
              damage = Math.round(damage * 1.5);
              text = `Critical hit! You dealt ${damage} damage to the ${Enemy.name}.`;
            } else {
              text = `You dealt ${damage} damage to the ${Enemy.name}.`;
            }
            updateTextLog(text);
            Enemy.hp -= damage;
            updateHp(false, Enemy);
          } else {
            text = `You dealt ${damage} damage to the ${Enemy.name}.`;
            updateTextLog(text);
            Enemy.hp -= damage;
            updateHp(false, Enemy);
          }
        }
      } else {
        damage = performDamageFomula(this.strength, Enemy.armour);
        // If the player has Crit
        if (arrUpgrades.includes("images/stages34_upgrade2.png") === true) {
          if (Math.floor(Math.random() * 100) < 30) {
            damage = Math.round(damage * 1.5);
            text = `Critical hit! You dealt ${damage} damage to the ${Enemy.name}.`;
          } else {
            text = `You dealt ${damage} damage to the ${Enemy.name}.`;
          }
        } else {
          text = `You dealt ${damage} damage to the ${Enemy.name}.`;
        }
        updateTextLog(text);
        Enemy.hp -= damage;
        updateHp(false, Enemy);
      }
    }
  }

  defend() {
    // Check first if there is at least 1 full bar of Action Gauge before executing the function
    if (this.actionGaugeCounter >= 100) {
      // set ActionSelected back to false, set defendStance to true, downsize the defend button back to its original size
      this.actionSelected.defend = false;
      this.status.defendStance = true;
      defendButton.style.height = 70 + "%";
      defendButton.style.width = 12 + "%";
      // Subtract from the counter and adjust height of the bars to reflect the deduction
      this.actionGaugeCounter -= 100;
      if (this.actionGaugeCounter <= 100) {
        playerActionGauge2.style.height = 0;
        playerActionGauge1.style.height = this.actionGaugeCounter + "%";
      } else {
        playerActionGauge1.style.height = "100%";
        playerActionGauge2.style.height = this.actionGaugeCounter - 100 + "%";
      }
    }
  }
}
