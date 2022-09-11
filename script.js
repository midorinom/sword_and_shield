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
    // Check if player is defending and update Text Log accordingly
    if (player.status.defendStance === true) {
      // Set defendStance back to false
      player.status.defendStance = false;
      // Round the resulting damage to an integer
      damage = Math.round(damage * 0.3);
      Player.hp -= damage;
      const text = `You defended! The enemy only dealt ${damage} damage to you.`;
      updateTextLog(text);
    } else {
      Player.hp -= damage;
      const text = `The enemy dealt ${damage} damage to you.`;
      updateTextLog(text);
    }
    // Subtract the damage from player hp and update the hp value
    updatePlayerHp(Player.hp);
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
  50,
  0,
  { attack: false, defend: false },
  { defendStance: false }
);
const enemy = new Enemy(100, 1, 1, 100, 0);

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

// =========================================================================================================
// Functions
// =========================================================================================================
function updatePlayerHp(hp) {
  document.querySelector("#player_hp_value").innerText = hp;
}

function updateEnemyHp(hp) {
  document.querySelector("#enemy_hp_value").innerText = hp;
}

function updateTextLog(newText = "test") {
  // add new text into textLog[0] then remove textLog[4] so the array doesn't grow infinitely. Then update the css.
  textLog.unshift(newText);
  textLog.pop();
  document.querySelector("#textlog_line1").innerText = textLog[0];
  document.querySelector("#textlog_line2").innerText = textLog[1];
  document.querySelector("#textlog_line3").innerText = textLog[2];
  document.querySelector("#textlog_line4").innerText = textLog[3];
}

function performDamageFomula(strength, opponentArmour) {
  // Roll a random number between 1 to 20
  const modifier = Math.ceil(Math.random() * 20);
  let damage = 0;
  // Coin toss to decide whether to add or subtract that random number from the strength value. Then account for opponent's armour.
  if (Math.round(Math.random()) === 0) {
    damage = Math.round(strength * ((100 - modifier) / 100) * opponentArmour);
  } else {
    damage = Math.round(strength * ((100 + modifier) / 100) * opponentArmour);
  }
  return damage;
}

function fillPlayerActionGauge() {
  // Make the height of the progress bar correspond to the counter value, then increment counter
  if (player.actionGaugeCounter < 100) {
    player.actionGaugeCounter += 1;
    playerActionGauge1.style.height = player.actionGaugeCounter + "%";
  }
  if (player.actionGaugeCounter >= 100 && player.actionGaugeCounter < 200) {
    player.actionGaugeCounter += 1;
    playerActionGauge2.style.height = player.actionGaugeCounter - 100 + "%";
  }
}

function fillEnemyActionGauge() {
  if (enemy.actionGaugeCounter < 100) {
    enemy.actionGaugeCounter += 1;
    enemyActionGauge1.style.height = enemy.actionGaugeCounter + "%";
  } else {
    // Enemy automatically attacks when Action Gauge is full
    enemy.attack(player);
  }
}

function attackButtonSelected() {
  // check first if the button is already selected
  if (player.actionSelected.attack === false) {
    // if Action Gauge is < 100, make button bigger when selected
    if (player.actionGaugeCounter < 100) {
      attackButton.style.height = 85 + "%";
      attackButton.style.width = 15 + "%";
    }
    // set actionSelected state in the player class to true
    player.actionSelected.attack = true;
  } else {
    // de-select the button and make the button size small again
    player.actionSelected.attack = false;
    attackButton.style.height = 70 + "%";
    attackButton.style.width = 12 + "%";
  }
  // if any other button was selected, set it to false and make it small
  player.actionSelected.defend = false;
  defendButton.style.height = 70 + "%";
  defendButton.style.width = 12 + "%";
}

function defendButtonSelected() {
  if (player.actionSelected.defend === false) {
    if (player.actionGaugeCounter < 100) {
      defendButton.style.height = 85 + "%";
      defendButton.style.width = 15 + "%";
    }
    player.actionSelected.defend = true;
  } else {
    player.actionSelected.defend = false;
    defendButton.style.height = 70 + "%";
    defendButton.style.width = 12 + "%";
  }
  player.actionSelected.attack = false;
  attackButton.style.height = 70 + "%";
  attackButton.style.width = 12 + "%";
}

// This function will continually run throughout the fight as long as the player is not stunned
function playerContinuousEvents() {
  fillPlayerActionGauge();
  if (player.actionSelected.attack === true) {
    player.attack(enemy);
  }
  if (player.actionSelected.defend === true) {
    player.defend();
  }
}

// This function will continually run throughout the fight as long as the enemy is not stunned
function enemyContinuousEvents() {
  fillEnemyActionGauge();
}
