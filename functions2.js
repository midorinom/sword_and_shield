"use strict";

// ==================
// Damage Calculation
// ==================
function performDamageFomula(strength, opponentArmour) {
  // Roll a random number between 1 to 20
  const modifier = Math.ceil(Math.random() * 20);
  let damage = 0;
  // Coin toss to decide whether to add or subtract that random number from the strength value. This creates a 80-120% damage spread
  // Then account for opponent's armour
  if (Math.round(Math.random()) === 0) {
    damage = Math.round(strength * ((100 - modifier) / 100) * opponentArmour);
  } else {
    damage = Math.round(strength * ((100 + modifier) / 100) * opponentArmour);
  }
  return damage;
}

// ==========================================
// All in One Check for Enemy Attack Function
// ==========================================
// This is a do-all function for the enemy attack function that resolves combat calculations and updates relevant variables
// that are common for all enemy classes
function enemyAttackMegaChecker(
  Enemy,
  Player,
  attackPower,
  stun,
  stunDuration
) {
  // Reset the enemy's action gauge to 0
  Enemy.actionGaugeCounter = 0;
  enemyActionGauge1.style.height = 0;
  // Push a new attack into the enemyQueue array, shift out the first one and then update the images
  moveEnemyQueueAlong(Enemy);
  updateEnemyQueue();
  // Perform the damage formula and initialise a damage variable to be modified later
  let damage = performDamageFomula(attackPower, Player.armour);
  // Check if player is defending
  if (Player.status.defendStance === true) {
    // Set defendStance back to false
    Player.status.defendStance = false;
    // Play the Parry minigame
    parryMiniGame(Enemy, Player, damage, stun, stunDuration, parryTimerSetting);
  } // Player is not defending
  else {
    // Check if the enemy's attack has a stun property. Stun the player for the specified duration and update textlog
    if (stun === true) {
      playerGotStunned(stunDuration);
      const seconds = stunDuration / 1000;
      updateTextLog(`You got stunned for ${seconds} seconds.`);
    }

    // Initialise a text variable to be decided later
    let text = "";
    // Check if the player has the lucky block upgrade
    if (arrUpgrades.includes("images/stages34_upgrade4.png") === true) {
      // Do a coin flip to decide whether Lucky Block activated, then assign the text accordingly
      if (Math.round(Math.random()) === 0) {
        damage = Math.round(damage * 0.3);
        text = `Lucky block! The ${Enemy.name} only dealt ${damage} damage to you.`;
      } else {
        text = `The ${Enemy.name} dealt ${damage} damage to you.`;
      }
    } 
    // The player does not have the lucky block upgrade
    else {
      text = `The ${Enemy.name} dealt ${damage} damage to you.`;
    }
    // Update the textlog and player hp
    updateTextLog(text);
    Player.hp -= damage;
    updateHp(true, Player);
  }
}

// =====
// Stuns
// =====
function playerGotStunned(stunDuration) {
  // Check if the player is not already stunned. This is to prevent stuns from compounding
  if (player.status.stun === false) {
    // Set the player's stun status to true
    player.status.stun = true;

    // Stop the player's continuous events
    clearInterval(autoPlayerActionGauge);
    setTimeout(() => {
      // After a delay, which is the duration of the stun, set the player's stun status to false 
      player.status.stun = false;

      // Also start up the player's continuous events again after the delay
      autoPlayerActionGauge = setInterval(() => {
        playerContinuousEvents(currentEnemy);
      }, player.agility);
    }, stunDuration);
  }
}

function enemyGotStunned(stunDuration) {
  // Stop the enemy's continuous events
  clearInterval(autoEnemyActionGauge);
  setTimeout(() => {
    // After a delay, which is the duration of the stun, start up the enemy's continuous events again
    autoEnemyActionGauge = setInterval(() => {
      enemyContinuousEvents(currentEnemy);
    }, currentEnemy.agility);
  }, stunDuration);
}

// =================
// Animation-related
// =================
// Sets the player to idle after a delay (the time required for the current animation to finish)
function setPlayerToIdle(delay) {
  setTimeout(() => {
    playerSprite.src = "images/player_idle.gif";
  }, delay);
}

// Delays the enemy's taking of damage until the player's attack animation has finished
function delayEnemyTakingDamage(delay, Enemy, damage, text) {
  // The delay will be the duration of the player's attack animation
  setTimeout(() => {
    // Update the textlog and enemy hp
    updateTextLog(text);
    Enemy.hp -= damage;
    updateHp(false, Enemy);
  }, delay);
}

// ===========
// Enemy Queue
// ===========
// Determine the first 3 attacks at the start of the wstage
function first3EnemyAttacks(Enemy) {
  for (let i = 0; i < 3; i++) {
    // 60%, 30%, 10% probability for the 3 attacks respectively
    let randomAttack;
    let randomNumber = Math.floor(Math.random() * 100);
    if (randomNumber < 10) {
      randomAttack = Object.keys(Enemy.attacks)[2];
    } else if (randomNumber < 30 && randomNumber >= 10) {
      randomAttack = Object.keys(Enemy.attacks)[1];
    } else {
      randomAttack = Object.keys(Enemy.attacks)[0];
    }
    // Push the random attack into the arrEnemyQueue array
    arrEnemyQueue.push(randomAttack);
  }
}

// Updates the images with the ones from the arrEnemyQueue array
function updateEnemyQueue() {
  document.querySelector("#enemy_queue1").src = arrEnemyQueue[0];
  document.querySelector("#enemy_queue2").src = arrEnemyQueue[1];
  document.querySelector("#enemy_queue3").src = arrEnemyQueue[2];
}

// Moves the enemy queue along by 1 new attack
function moveEnemyQueueAlong(Enemy) {
  // get rid of the first attack in the queue
  arrEnemyQueue.shift();
  // put in a new attack at the end of the queue
  // 60%, 30%, 10% probability for the 3 attacks respectively
  let randomAttack;
  let randomNumber = Math.floor(Math.random() * 100);
  if (randomNumber < 10) {
    randomAttack = Object.keys(Enemy.attacks)[2];
  } else if (randomNumber < 40 && randomNumber >= 10) {
    randomAttack = Object.keys(Enemy.attacks)[1];
  } else {
    randomAttack = Object.keys(Enemy.attacks)[0];
  }
  // Push into the array
  arrEnemyQueue.push(randomAttack);
  // Update the description of the current 3 attacks in the queue
  updateEnemyAttackDescriptions(Enemy);
}

// Function that updates the enemy attack descriptions
function updateEnemyAttackDescriptions(Enemy) {
  for (let i = 0; i < 3; i++) {
    // Iterates through the arrEnemyQueue array, taking each item to use as a parameter in the
    // getAttackDescription function from the enemy class. Then update the innertext of the enemy
    // queue description elements with the return value (which is the corresponding description text)
    const imageLink = arrEnemyQueue[i];
    const descriptionText = Enemy.getAttackDescription(imageLink);
    if (i === 0) {
      document.querySelector("#enemy_queue1_description").innerText =
        descriptionText;
    } else if (i === 1) {
      document.querySelector("#enemy_queue2_description").innerText =
        descriptionText;
    } else if (i === 2) {
      document.querySelector("#enemy_queue3_description").innerText =
        descriptionText;
    }
  }
}