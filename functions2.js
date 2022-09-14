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
  // Update the description
  updateEnemyAttackDescriptions(Enemy);
}

function updateEnemyAttackDescriptions(Enemy) {
  for (let i = 0; i < 3; i++) {
    const imageUrl = arrEnemyQueue[i];
    const descriptionText = Enemy.getAttackDescription(imageUrl);
    if (i === 0) {
      document.querySelector("#enemy_queue1_description").innerText =
        descriptionText;
    } else if (i === 1) {
      document.querySelector("#enemy_queue2_description").innerText =
        descriptionText;
    } else {
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
    Player.hp -= damage;
    const text = `The ${Enemy.name} dealt ${damage} damage to you.`;
    updateTextLog(text);
    updateHp(true, Player);
  }
}

function generateEnemy(currentStage) {
  const randomNumber = Math.floor(Math.random() * 3);
  switch (randomNumber) {
    case 0:
      switch (currentStage) {
        case 1:
          currentEnemy = new EnemyBalancedEasy(
            10,
            10,
            1,
            1,
            30,
            0,
            {
              "images/enemy_attack1.png": "Scratch:\nDamage *",
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
              "images/enemy_attack3.webp": "Stomp:\nDamage ***",
            },
            "Mushroom"
          );
          break;
        case 2:
          currentEnemy = new EnemyBalancedEasy(
            10,
            10,
            1,
            1,
            30,
            0,
            {
              "images/enemy_attack1.png": "Scratch:\nDamage *",
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
              "images/enemy_attack3.webp": "Stomp:\nDamage ***",
            },
            "Mushroom"
          );
      }
      break;
    case 1:
      switch (currentStage) {
        case 1:
          currentEnemy = new EnemyFastEasy(
            10,
            10,
            1,
            1,
            30,
            0,
            {
              "images/enemy_attack1.png": "Scratch:\nDamage *",
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
              "images/enemy_attack1.png": "Scratch:\nDamage *",
            },
            "Slime"
          );
          break;
        case 2:
          currentEnemy = new EnemyFastEasy(
            10,
            10,
            1,
            1,
            30,
            0,
            {
              "images/enemy_attack1.png": "Scratch:\nDamage *",
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
              "images/enemy_attack1.png": "Scratch:\nDamage *",
            },
            "Slime"
          );
      }
      break;
    case 2:
      switch (currentStage) {
        case 1:
          currentEnemy = new EnemySlowEasy(
            10,
            10,
            1,
            1,
            30,
            0,
            {
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
              "images/enemy_attack3.webp": "Stomp:\nDamage ***",
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
            },
            "Snail"
          );
          break;
        case 2:
          currentEnemy = new EnemySlowEasy(
            10,
            10,
            1,
            1,
            30,
            0,
            {
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
              "images/enemy_attack3.webp": "Stomp:\nDamage ***",
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
            },
            "Snail"
          );
      }
  }
}
