"use strict";

// Define variables
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

// Create Enemy class
class Enemy {
  constructor(hp, strength, armour, agility, actionGaugeCounter = 0) {
    (this.hp = hp),
      (this.strength = strength),
      (this.armour = armour),
      (this.agility = agility),
      (this.actionGaugeCounter = actionGaugeCounter);
  }

  attack(Player) {
    // Execute the attack and reset the gauge to 0
    this.actionGaugeCounter = 0;
    enemyActionGauge1.style.height = 0;
    // Perform the damage formula
    let damage = performDamageFomula(this.strength, Player.armour);
    // Check if player is defending
    if (player.status.defendStance === true) {
      // Set defendStance back to false
      player.status.defendStance = false;
      // Blur the background then play the Parry minigame
      setBackgroundOpacity(0.5);
      parryMiniGame(this.hp, Player.strength, this.armour, damage, Player.hp);
    } // Player is not defending
    else {
      Player.hp -= damage;
      const text = `The enemy dealt ${damage} damage to you.`;
      updateTextLog(text);
      updatePlayerHp(Player.hp);
    }
  }
}

// Create Player class
class Player extends Enemy {
  constructor(
    hp,
    strength,
    armour,
    agility,
    actionGaugeCounter,
    actionSelected = {},
    status = {}
  ) {
    super(hp, strength, armour, agility, actionGaugeCounter),
      (this.actionSelected = actionSelected),
      (this.status = status);
  }

  attack(Enemy) {
    // Check first if there is at least 1 full bar of Action Gauge before executing the function
    if (this.actionGaugeCounter >= 100) {
      // setActionSelected and defendStance to false, downsize the attack button back to its original size
      player.actionSelected.attack = false;
      player.status.defendStance = false;
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
      // Perform the damage formula
      let damage = performDamageFomula(this.strength, Enemy.armour);
      // Subtract the damage from enemy hp and update the hp value
      Enemy.hp -= damage;
      updateEnemyHp(Enemy.hp);
      // Update Text Log
      const text = `You dealt ${damage} damage to the enemy.`;
      updateTextLog(text);
    }
  }

  defend() {
    // Check first if there is at least 1 full bar of Action Gauge before executing the function
    if (this.actionGaugeCounter >= 100) {
      // set ActionSelected back to false, set defendStance to true, downsize the defend button back to its original size
      player.actionSelected.defend = false;
      player.status.defendStance = true;
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

// Create instances for player and enemy
const player = new Player(
  100,
  5,
  1,
  20,
  0,
  { attack: false, defend: false },
  { defendStance: false }
);
const enemy = new Enemy(100, 1, 1, 30, 0);

// Display player and enemy hp values onto the page
updatePlayerHp(player.hp);
updateEnemyHp(enemy.hp);

// Start filling the Action Gauge
let autoPlayerActionGauge = setInterval(playerContinuousEvents, player.agility);

let autoEnemyActionGauge = setInterval(enemyContinuousEvents, enemy.agility);

// Event Listeners for the Attack and Defend buttons
document
  .querySelector("#attack_button")
  .addEventListener("click", attackButtonSelected);

document
  .querySelector("#defend_button")
  .addEventListener("click", defendButtonSelected);
