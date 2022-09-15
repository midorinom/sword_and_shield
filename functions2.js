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

function generateEnemy() {
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
            "Mole",
            "images/stage1_balanced.gif"
          );
          break;
        case 2:
          currentEnemy = new EnemyBalancedEasy(
            20,
            20,
            1,
            1,
            30,
            0,
            {
              "images/enemy_attack1.png": "Scratch:\nDamage *",
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
              "images/enemy_attack3.webp": "Stomp:\nDamage ***",
            },
            "Skull Spider",
            "images/stage2_balanced.gif"
          );
          break;
        case 3:
          currentEnemy = new EnemyBalancedHard(
            30,
            30,
            1,
            1,
            30,
            0,
            {
              "images/enemy_attack1.png": "Scratch:\nDamage *",
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
              "images/enemy_attack3.webp": "Stomp:\nDamage ***",
            },
            "Arch Fiend",
            "images/stage3_balanced.gif"
          );
          break;
        case 4:
          currentEnemy = new EnemyBalancedHard(
            40,
            40,
            1,
            1,
            30,
            0,
            {
              "images/enemy_attack1.png": "Scratch:\nDamage *",
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
              "images/enemy_attack3.webp": "Stomp:\nDamage ***",
            },
            "Red Wyrm",
            "images/stage4_balanced.gif"
          );
          break;
        case 5:
          currentEnemy = new EnemyBalancedHard(
            50,
            50,
            1,
            1,
            30,
            0,
            {
              "images/enemy_attack1.png": "Scratch:\nDamage *",
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
              "images/enemy_attack3.webp": "Stomp:\nDamage ***",
            },
            "Red Wyrm",
            "images/stage4_balanced.gif"
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
            "Bat",
            "images/stage1_fast.gif"
          );
          break;
        case 2:
          currentEnemy = new EnemyFastEasy(
            20,
            20,
            1,
            1,
            30,
            0,
            {
              "images/enemy_attack1.png": "Scratch:\nDamage *",
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
              "images/enemy_attack1.png": "Scratch:\nDamage *",
            },
            "Night Mare",
            "images/stage2_fast.gif"
          );
          break;
        case 3:
          currentEnemy = new EnemyFastHard(
            30,
            30,
            1,
            1,
            30,
            0,
            {
              "images/enemy_attack1.png": "Scratch:\nDamage *",
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
              "images/enemy_attack1.png": "Scratch:\nDamage *",
            },
            "Abyss Worm",
            "images/stage3_fast.gif"
          );
          break;
        case 4:
          currentEnemy = new EnemyFastHard(
            40,
            40,
            1,
            1,
            30,
            0,
            {
              "images/enemy_attack1.png": "Scratch:\nDamage *",
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
              "images/enemy_attack1.png": "Scratch:\nDamage *",
            },
            "Poison Drake",
            "images/stage4_fast.gif"
          );
          break;
        case 5:
          currentEnemy = new EnemyFastHard(
            50,
            50,
            1,
            1,
            30,
            0,
            {
              "images/enemy_attack1.png": "Scratch:\nDamage *",
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
              "images/enemy_attack1.png": "Scratch:\nDamage *",
            },
            "Poison Drake",
            "images/stage4_fast.gif"
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
            "Rat",
            "images/stage1_slow.gif"
          );
          break;
        case 2:
          currentEnemy = new EnemySlowEasy(
            20,
            20,
            1,
            1,
            30,
            0,
            {
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
              "images/enemy_attack3.webp": "Stomp:\nDamage ***",
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
            },
            "Giant",
            "images/stage2_slow.gif"
          );
          break;
        case 3:
          currentEnemy = new EnemySlowHard(
            30,
            30,
            1,
            1,
            30,
            0,
            {
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
              "images/enemy_attack3.webp": "Stomp:\nDamage ***",
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
            },
            "Overlord",
            "images/stage3_slow.gif"
          );
          break;
        case 4:
          currentEnemy = new EnemySlowHard(
            40,
            40,
            1,
            1,
            30,
            0,
            {
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
              "images/enemy_attack3.webp": "Stomp:\nDamage ***",
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
            },
            "Golden Wyrm",
            "images/stage4_slow.gif"
          );
          break;
        case 5:
          currentEnemy = new EnemySlowHard(
            50,
            50,
            1,
            1,
            30,
            0,
            {
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
              "images/enemy_attack3.webp": "Stomp:\nDamage ***",
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
            },
            "Golden Wyrm",
            "images/stage4_slow.gif"
          );
      }
  }
}
