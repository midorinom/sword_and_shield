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
    moveEnemyQueueAlong(Enemy.attacks);
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
      const text = `The enemy dealt ${damage} damage to you.`;
      updateTextLog(text);
      updateHp(true, Player);
    }
  }