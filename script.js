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
const enemyQueue = [];

// Create Enemy class
class Enemy {
  constructor(
    maxHp,
    hp,
    strength,
    armour,
    agility,
    actionGaugeCounter = 0,
    attacks = {}
  ) {
    (this.maxHp = maxHp),
      (this.hp = hp),
      (this.strength = strength),
      (this.armour = armour),
      (this.agility = agility),
      (this.actionGaugeCounter = actionGaugeCounter);
    this.attacks = attacks;
  }

  attack(Player) {
    // Reset the gauge to 0
    this.actionGaugeCounter = 0;
    enemyActionGauge1.style.height = 0;
    // Determine what is next up in the enemyQueue array and execute the attack. Modify strength accordingly.
    let attackPower = this.strength;
    if (enemyQueue[0] === "images/enemy_attack1.png") {
      attackPower += 0;
    } else if (enemyQueue[0] === "images/enemy_attack2.webp") {
      attackPower += 1;
    } else if (enemyQueue[0] === "images/enemy_attack3.webp") {
      attackPower += 2;
    }
    // Push a new attack into the enemyQueue array, shift out the first one and then update the images
    moveEnemyQueueAlong(this.attacks);
    updateEnemyQueue();
    // Perform the damage formula
    let damage = performDamageFomula(attackPower, Player.armour);
    // Check if player is defending
    if (player.status.defendStance === true) {
      // Set defendStance back to false
      player.status.defendStance = false;
      // Blur the background then play the Parry minigame
      setBackgroundOpacity(0.5);
      parryMiniGame(this, Player, damage);
    } // Player is not defending
    else {
      Player.hp -= damage;
      const text = `The enemy dealt ${damage} damage to you.`;
      updateTextLog(text);
      updateHp(true, Player);
    }
  }
}

// Create Player class
class Player extends Enemy {
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
    super(maxHp, hp, strength, armour, agility, actionGaugeCounter),
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
      updateHp(false, Enemy);
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
  100,
  5,
  1,
  20,
  0,
  { attack: false, defend: false },
  { defendStance: false }
);
const enemy = new Enemy(100, 100, 1, 1, 30, 0, {
  attack1: "images/enemy_attack1.png",
  attack2: "images/enemy_attack2.webp",
  attack3: "images/enemy_attack3.webp",
});

// Display player and enemy hp values onto the page
updateHp(true, player);
updateHp(false, enemy);

// Start filling the Action Gauge
let autoPlayerActionGauge = setInterval(playerContinuousEvents, player.agility);

let autoEnemyActionGauge = setInterval(enemyContinuousEvents, enemy.agility);

// Event Listeners for the Attack and Defend buttons
attackButton.addEventListener("click", attackButtonSelected);

defendButton.addEventListener("click", defendButtonSelected);

// Start Enemy Queue
first3EnemyAttacks(enemy);
updateEnemyQueue();
