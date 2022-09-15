"use strict";

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
    arrEnemyQueue.push(randomAttack);
  }
}

function updateEnemyQueue() {
  document.querySelector("#enemy_queue1").src = arrEnemyQueue[0];
  document.querySelector("#enemy_queue2").src = arrEnemyQueue[1];
  document.querySelector("#enemy_queue3").src = arrEnemyQueue[2];
}

function moveEnemyQueueAlong(Enemy) {
  // get rid of the first attack in the queue
  arrEnemyQueue.shift();
  // put in a new attack at the end of the queue
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
  // Push into the array
  arrEnemyQueue.push(randomAttack);
  console.log(Enemy.attacks);
  // Update the description
  updateEnemyAttackDescriptions(Enemy);
}

function updateEnemyAttackDescriptions(Enemy) {
  for (let i = 0; i < 3; i++) {
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

function showEnemyAttackDescription(enemyQueueIndex) {
  if (enemyQueueIndex === 0) {
    document.querySelector("#enemy_queue1_description").style.display = "block";
    document.querySelector("#enemy_queue1").style.display = "none";
  } else if (enemyQueueIndex === 1) {
    document.querySelector("#enemy_queue2_description").style.display = "block";
    document.querySelector("#enemy_queue2").style.display = "none";
  } else if (enemyQueueIndex === 2) {
    document.querySelector("#enemy_queue3_description").style.display = "block";
    document.querySelector("#enemy_queue3").style.display = "none";
  }
}

function hideEnemyAttackDescription(enemyQueueIndex) {
  if (enemyQueueIndex === 0) {
    document.querySelector("#enemy_queue1_description").style.display = "none";
    document.querySelector("#enemy_queue1").style.display = "block";
  } else if (enemyQueueIndex === 1) {
    document.querySelector("#enemy_queue2_description").style.display = "none";
    document.querySelector("#enemy_queue2").style.display = "block";
  } else if (enemyQueueIndex === 2) {
    document.querySelector("#enemy_queue3_description").style.display = "none";
    document.querySelector("#enemy_queue3").style.display = "block";
  }
}

function enemyAttackMegaChecker(Enemy, Player, attackPower) {
  // Reset the gauge to 0
  Enemy.actionGaugeCounter = 0;
  enemyActionGauge1.style.height = 0;
  // Push a new attack into the enemyQueue array, shift out the first one and then update the images
  moveEnemyQueueAlong(Enemy);
  updateEnemyQueue();
  // Perform the damage formula
  let damage = performDamageFomula(attackPower, Player.armour);
  // Check if player is defending
  if (player.status.defendStance === true) {
    // Set defendStance back to false
    player.status.defendStance = false;
    // Play the Parry minigame
    parryMiniGame(Enemy, Player, damage);
  } // Player is not defending
  else {
    let text = "";
    // If player has Lucky Block
    if (arrUpgrades.includes("images/stages34_upgrade4.png") === true) {
      if (Math.round(Math.random()) === 0) {
        damage = Math.round(damage * 0.3);
        text = `Lucky block! The ${Enemy.name} only dealt ${damage} damage to you.`;
      } else {
        text = `The ${Enemy.name} dealt ${damage} damage to you.`;
      }
    } else {
      text = `The ${Enemy.name} dealt ${damage} damage to you.`;
    }
    updateTextLog(text);
    Player.hp -= damage;
    updateHp(true, Player);
  }
}

function unpause() {
  setBackgroundOpacity(1);

  attackButton.addEventListener("click", attackButtonSelected);
  defendButton.addEventListener("click", defendButtonSelected);

  enemyQueue1.addEventListener("mouseover", showEnemyAttackDescription1);
  enemyQueue2.addEventListener("mouseover", showEnemyAttackDescription2);
  enemyQueue3.addEventListener("mouseover", showEnemyAttackDescription3);
  enemyQueue1.addEventListener("mouseout", hideEnemyAttackDescription1);
  enemyQueue2.addEventListener("mouseout", hideEnemyAttackDescription2);
  enemyQueue3.addEventListener("mouseout", hideEnemyAttackDescription3);
}

function pause() {
  setBackgroundOpacity(0.4);

  clearInterval(autoPlayerActionGauge);
  clearInterval(autoEnemyActionGauge);

  attackButton.removeEventListener("click", attackButtonSelected);
  defendButton.removeEventListener("click", defendButtonSelected);

  enemyQueue1.removeEventListener("mouseover", showEnemyAttackDescription1);
  enemyQueue2.removeEventListener("mouseover", showEnemyAttackDescription2);
  enemyQueue3.removeEventListener("mouseover", showEnemyAttackDescription3);
  enemyQueue1.removeEventListener("mouseout", hideEnemyAttackDescription1);
  enemyQueue2.removeEventListener("mouseout", hideEnemyAttackDescription2);
  enemyQueue3.removeEventListener("mouseout", hideEnemyAttackDescription3);
}

// Defining functions for showing/hiding enemy attack descriptions
function showEnemyAttackDescription1() {
  showEnemyAttackDescription(0);
}
function showEnemyAttackDescription2() {
  showEnemyAttackDescription(1);
}
function showEnemyAttackDescription3() {
  showEnemyAttackDescription(2);
}
function hideEnemyAttackDescription1() {
  hideEnemyAttackDescription(0);
}
function hideEnemyAttackDescription2() {
  hideEnemyAttackDescription(1);
}
function hideEnemyAttackDescription3() {
  hideEnemyAttackDescription(2);
}

function playerIsStunned(duration) {
  clearInterval(autoPlayerActionGauge);
  setTimeout(() => {
    autoPlayerActionGauge = setInterval(() => {
      playerContinuousEvents(currentEnemy);
    }, player.agility);
  }, duration);
}

function enemyIsStunned(duration) {
  clearInterval(autoEnemyActionGauge);
  setTimeout(() => {
    autoEnemyActionGauge = setInterval(() => {
      enemyContinuousEvents(currentEnemy);
    }, currentEnemy.agility);
  }, duration);
}
