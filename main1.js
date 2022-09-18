"use strict";

// =======================
// Define Global Variables
// =======================
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
let textLog = ["", "", "", ""];
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
const arrUpgrades = [];
const backgroundImages = [
  "url('images/background1.png')",
  "url('images/background2.png')",
  "url('images/background3.png')",
  "url('images/background4.png')",
  "url('images/background5.png')",
];
const upgradesDescription1 = document.querySelector("#upgrades_description1");
const upgradesDescription2 = document.querySelector("#upgrades_description2");
const playerSprite = document.querySelector("#player");
const changeParryTimerButton = document.querySelector(
  "#change_parry_timer_button"
);
let parryTimerSetting = "classic";

// ===================
// Create Player Class
// ===================
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

  // --- Attack Function ---
  attack(Enemy) {
    // First check if the player has at least 1 bar of Action Gauge before executing the function.
    if (this.actionGaugeCounter >= 100) {
      // Initialise text and damage variables, they will be modified later
      let text = "";
      let damage;
      // Set actionSelected.attack to false to prevent the player.attack function from getting triggered again by playerContinuousEvents
      this.actionSelected.attack = false;
      // Set status.defendStance to false in the event that the player was defending, the player will break out of the defend stance
      this.status.defendStance = false;
      // Downsize the attack button back to its original size
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
        let crit = false;

        // Loop 2 times, one for each attack
        for (let i = 0; i < 2; i++) {
          // Multiply the usual damage formula by 65%
          damage = Math.round(
            0.65 * performDamageFomula(this.strength, Enemy.armour)
          );
          // If the player has Crit, check to see if the player crits. Update text log accordingly.
          if (arrUpgrades.includes("images/stages34_upgrade2.png") === true) {
            if (Math.floor(Math.random() * 100) < 30) {
              damage = Math.round(damage * 2);
              text = `Critical hit! You dealt ${damage} damage to the ${Enemy.name}.`;
              crit = true;
            } else {
              text = `You dealt ${damage} damage to the ${Enemy.name}.`;
            }
            delayEnemyTakingDamage(1300, Enemy, damage, text);
          }
          // If the player doesn't have Crit
          else {
            text = `You dealt ${damage} damage to the ${Enemy.name}.`;
            delayEnemyTakingDamage(1300, Enemy, damage, text);
          }
        }
        // If at least 1 attack did crit, the crit variable will be updated to true. crit animation will be shown
        if (crit === true) {
          playerSprite.src = "images/player_crit.gif";
          setPlayerToIdle(1000);
        }
        // If the player didn't crit for both hits, the Double Hit animation will be shown.
        else {
          playerSprite.src = "images/player_doublehit.gif";
          setPlayerToIdle(1600);
        }

        // If the player does not have Double Hit
      } else {
        damage = performDamageFomula(this.strength, Enemy.armour);
        // If the player has Crit, check to see if the player crits. Update text log accordingly and show the crit animation if the player crits.
        if (arrUpgrades.includes("images/stages34_upgrade2.png") === true) {
          if (Math.floor(Math.random() * 100) < 30) {
            playerSprite.src = "images/player_crit.gif";
            setPlayerToIdle(1000);
            damage = Math.round(damage * 2);
            text = `Critical hit! You dealt ${damage} damage to the ${Enemy.name}.`;
          }
          // If the player doesn't crit, show the default attack animation
          else {
            playerSprite.src = "images/player_attack.gif";
            setPlayerToIdle(1100);
            text = `You dealt ${damage} damage to the ${Enemy.name}.`;
          }
        }
        // If the player does not have both Double Hit and Crit, show the default attack animation
        else {
          playerSprite.src = "images/player_attack.gif";
          setPlayerToIdle(1100);
          text = `You dealt ${damage} damage to the ${Enemy.name}.`;
        }
        delayEnemyTakingDamage(1100, Enemy, damage, text);
      }
    }
  }

  // --- Defend Function ---
  defend() {
    // Check first if there is at least 1 full bar of Action Gauge before executing the function
    if (this.actionGaugeCounter >= 100) {
      // Show the Defend animation. The player sprite will stay in the defending pose until the player gets hit or attacks
      playerSprite.src = "images/player_defend.gif";
      // Set actionSelected.defend back to false to prevent the player.defend function from getting triggered again by playerContinuousEvents
      this.actionSelected.defend = false;
      // Set status.defendStance to true so that the enemy.attack function will recognise that the player is defending
      this.status.defendStance = true;
      // Downsize the defend button back to its original size
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
