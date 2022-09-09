"use strict";

// Defining variables
const playerActionGauge1 = document.querySelector(
  "#player_action_gauge1_progress"
);
const playerActionGauge2 = document.querySelector(
  "#player_action_gauge2_progress"
);
const enemyActionGauge1 = document.querySelector(
  "#enemy_action_gauge1_progress"
);

// Creating classes for Enemy and Player
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
    const modifier = Math.ceil(Math.random() * 20);
    let damage = 0;
    if (Math.round(Math.random()) === 0) {
      damage = Math.round(
        this.strength * ((100 - modifier) / 100) * Player.armour
      );
    } else {
      damage = Math.round(
        this.strength * ((100 + modifier) / 100) * Player.armour
      );
    }
    Player.hp -= damage;
    updatePlayerHp(Player.hp);
  }
}

class Player extends Enemy {
  constructor(hp, strength, armour, agility, actionGaugeCounter) {
    super(hp, strength, armour, agility, actionGaugeCounter);
  }

  attack(Enemy) {
    // Check first if there is at least 1 full bar of Action Gauge before executing the function
    if (this.actionGaugeCounter >= 100) {
      // Subtract 1 bar 's worth (100) from the counter
      this.actionGaugeCounter -= 100;

      // Adjust the height of the bars to reflect the deduction from the counter
      // if the player had only 1 full bar initially:
      if (this.actionGaugeCounter <= 100) {
        playerActionGauge2.style.height = 0;
        playerActionGauge1.style.height = this.actionGaugeCounter + "%";
      }
      // if the player had 2 full bars initially:
      else {
        playerActionGauge1.style.height = "100%";
        playerActionGauge2.style.height = this.actionGaugeCounter - 100 + "%";
      }
      const modifier = Math.ceil(Math.random() * 20);
      let damage = 0;
      if (Math.round(Math.random()) === 0) {
        damage = Math.round(
          this.strength * ((100 - modifier) / 100) * Enemy.armour
        );
      } else {
        damage = Math.round(
          this.strength * ((100 + modifier) / 100) * Enemy.armour
        );
      }
      Enemy.hp -= damage;
      updateEnemyHp(Enemy.hp);
    } else {
      console.log("test");
    }
  }
}

// Creating instances for player and enemy
const player = new Player(100, 5, 1, 50, 0);
const enemy = new Enemy(50, 1, 1, 100, 0);

// Display player and enemy hp values onto the page
updatePlayerHp(player.hp);
updateEnemyHp(enemy.hp);

// Start filling the Action Gauge
let autoPlayerActionGauge = setInterval(fillPlayerActionGauge, player.agility);

let autoEnemyActionGauge = setInterval(fillEnemyActionGauge, enemy.agility);

// For testing purposes of simulating an action
document
  .querySelector("#attack_button")
  .addEventListener("click", player.attack(enemy));

document
  .querySelector("#defend_button")
  .addEventListener("click", executeAttack);

// =========================================================================================================
// Functions
// =========================================================================================================
function updatePlayerHp(hp) {
  document.querySelector("#player_hp_value").innerText = hp;
}

function updateEnemyHp(hp) {
  document.querySelector("#enemy_hp_value").innerText = hp;
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

// For Testing
function executeAttack() {
  // Check first if there is at least 1 full bar of Action Gauge before executing the function
  if (player.actionGaugeCounter >= 100) {
    // Subtract 1 bar 's worth (100) from the counter
    player.actionGaugeCounter -= 100;

    // Adjust the height of the bars to reflect the deduction from the counter
    // if the player had only 1 full bar initially:
    if (player.actionGaugeCounter <= 100) {
      playerActionGauge2.style.height = 0;
      playerActionGauge1.style.height = player.actionGaugeCounter + "%";
    }
    // if the player had 2 full bars initially:
    else {
      playerActionGauge1.style.height = "100%";
      playerActionGauge2.style.height = player.actionGaugeCounter - 100 + "%";
    }
    const modifier = Math.ceil(Math.random() * 20);
    let damage = 0;
    if (Math.round(Math.random()) === 0) {
      damage = Math.round(
        this.strength * ((100 - modifier) / 100) * Enemy.armour
      );
    } else {
      damage = Math.round(
        this.strength * ((100 + modifier) / 100) * Enemy.armour
      );
    }
    Enemy.hp -= damage;
    updateEnemyHp(Enemy.hp);
  }
}
