"use strict";

function showEnemyAttackDescription(Enemy, enemyQueueIndex) {
    const imageUrl = enemyQueue[enemyQueueIndex];
    const descriptionText = Enemy.getAttackDescription(imageUrl);
  
    if (enemyQueueIndex === 0) {
      document.querySelector("#enemy_queue1_description").innerText = descriptionText;
      document.querySelector("#enemy_queue1_description").style.display = "block";
      document.querySelector("#enemy_queue1").style.display = "none";
    } else if (enemyQueueIndex === 1) {
      document.querySelector("#enemy_queue2_description").innerText = descriptionText;
      document.querySelector("#enemy_queue2_description").style.display = "block";
      document.querySelector("#enemy_queue2").style.display = "none";
    } else if (enemyQueueIndex === 2) {
      document.querySelector("#enemy_queue3_description").innerText = descriptionText;
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
  
  function enemyAttackMegaChecker(Enemy, Player, attackPower){
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

  function generateEnemy (currentStage) {
    const randomNumber = Math.floor(Math.random() * 3);
    switch (randomNumber){
        case 0:
            switch (currentStage){
                case 1: currentEnemy = new EnemyBalancedEasy(100, 100, 1, 1, 30, 0, {
                    commonAttack: "images/enemy_attack1.png",
                    uncommonAttack: "images/enemy_attack2.webp",
                    rareAttack: "images/enemy_attack3.webp",
                  }, ["Scratch:\nDamage *", "Swipe:\nDamage **", "Stomp:\nDamage ***"], "Mushroom");
                  break
                case 2: currentEnemy = new EnemyBalancedEasy(100, 100, 1, 1, 30, 0, {
                    commonAttack: "images/enemy_attack1.png",
                    uncommonAttack: "images/enemy_attack2.webp",
                    rareAttack: "images/enemy_attack3.webp",
                  }, ["Scratch:\nDamage *", "Swipe:\nDamage **", "Stomp:\nDamage ***"], "Mushroom");
            }
        break
        case 1:
            switch (currentStage){
                case 1: currentEnemy = new EnemyFastEasy(100, 100, 1, 1, 30, 0, {
                    commonAttack: "images/enemy_attack1.png",
                    uncommonAttack: "images/enemy_attack2.webp",
                    rareAttack: "images/enemy_attack1.png",
                  }, ["Scratch:\nDamage *", "Swipe:\nDamage **", "Scratch:\nDamage *"], "Slime");
                  break
                case 2: currentEnemy = new EnemyFastEasy(100, 100, 1, 1, 30, 0, {
                    commonAttack: "images/enemy_attack1.png",
                    uncommonAttack: "images/enemy_attack2.webp",
                    rareAttack: "images/enemy_attack1.png",
                  }, ["Scratch:\nDamage *", "Swipe:\nDamage **", "Scratch:\nDamage *"], "Slime");
            }
        break
        case 2:
            switch (currentStage){
                case 1: currentEnemy = new EnemySlowEasy(100, 100, 1, 1, 30, 0, {
                    commonAttack: "images/enemy_attack2.webp",
                    uncommonAttack: "images/enemy_attack3.webp",
                    rareAttack: "images/enemy_attack2.webp",
                  }, ["Swipe:\nDamage **", "Stomp:\nDamage ***", "Swipe:\nDamage **"], "Snail");
                  break
                case 2: currentEnemy = new EnemySlowEasy(100, 100, 1, 1, 30, 0, {
                    commonAttack: "images/enemy_attack2.webp",
                    uncommonAttack: "images/enemy_attack3.webp",
                    rareAttack: "images/enemy_attack2.webp",
                  }, ["Swipe:\nDamage **", "Stomp:\nDamage ***", "Swipe:\nDamage **"], "Snail");
            }
    }
  }