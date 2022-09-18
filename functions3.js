"use strict";

// ====================
// Stage Loop Functions
// ====================
// Starting the next stage
function startStage(Player, Enemy) {
    // For stages past the first one
    if (currentStage != 1) {
      // Clear the intervals for continuous functions and reset the player gauges
      clearInterval(autoPlayerActionGauge);
      clearInterval(autoEnemyActionGauge);
      player.actionGaugeCounter = 0;
      playerActionGauge1.style.height = 0;
      playerActionGauge2.style.height = 0;
  
      // Empty the textlog of all text from the previous stage
      textLog = ["", "", "", ""];
      updateTextLog("");
    }
  
    // Remove the click event listener from the submit button in the upgrade screen
    document
      .querySelector("#upgrades_submit_button")
      .removeEventListener("click", upgradesSubmitButton);
  
    // Display player and enemy hp values onto the page. The player's hp values would change if a health+ upgrade
    // was chosen. The enemy's hp values are refreshed with the one from the new enemy in the next stage
    updateHp(true, Player);
    updateHp(false, Enemy);
  
    // Update the background image with the one from the next stage
    document.querySelector("#background").style.background =
      backgroundImages[currentStage - 1];
    document.querySelector("#background").style.backgroundSize = "cover";
  
    // Update enemy image
    document.querySelector("#enemy").src = Enemy.image;
  
    // Start the enemy queue
    first3EnemyAttacks(Enemy);
    updateEnemyQueue();
  
    // Unpause the game
    unpause();
  }
  
  // Finishing a stage and going into the upgrade screen
  function goToUpgradeScreen() {
    // Pause the game
    pause();
    // Clear the enemy queue
    for (let i = 0; i < 3; i++) {
      arrEnemyQueue.pop();
    }
    // Show Upgrade Screen
    upgradesContainer.style.display = "flex";
    // Pick 2 random upgrades
    determineTwoRandomUpgrades();
    // Add click event listeners for the upgrades
    upgradesImage1.addEventListener("click", selectUpgrade1Image);
    upgradesImage2.addEventListener("click", selectUpgrade2Image);
    // Add click event listener for the submit button
    document
      .querySelector("#upgrades_submit_button")
      .addEventListener("click", upgradesSubmitButton);
  }
  
  // The game is over, it will be either a defeat or victory
  function endgameScreen(won = false) {
    // Pause the game
    pause();
    // Show the endgame screen
    document.querySelector("#endgame_container").style.display = "block";
    // Add click event listeners for the restart and home buttons
    document
      .querySelector("#endgame_restart_button")
      .addEventListener("click", restartButton);
    document
      .querySelector("#endgame_home_button")
      .addEventListener("click", homeButton);
  
    // If the player lost
    if (won === false) {
      document.querySelector("#endgame_title").innerText = "You lost";
    } 
    // If the player won
    else {
      document.querySelector("#endgame_title").innerText = "Congratulations, you beat the game!";
    }
  }
  
  // Reloads the page
  function restartButton() {
    location.reload();
  }
  
  // Goes back to the title screen
  function homeButton() {
    location.href = "index.html";
  }

// =============
// Pause/Unpause
// =============
function unpause() {
    // Set the background back to fully opaque
    setBackgroundOpacity(1);
  
    // Add click event listeners for the attack, defend and changeParryTimer buttons
    attackButton.addEventListener("click", attackButtonSelected);
    defendButton.addEventListener("click", defendButtonSelected);
    changeParryTimerButton.addEventListener("click", changeParryTimer);
  
    // Add hover event listeners for the enemy queue images
    enemyQueue1.addEventListener("mouseover", showEnemyAttackDescription1);
    enemyQueue2.addEventListener("mouseover", showEnemyAttackDescription2);
    enemyQueue3.addEventListener("mouseover", showEnemyAttackDescription3);
    enemyQueue1.addEventListener("mouseout", hideEnemyAttackDescription1);
    enemyQueue2.addEventListener("mouseout", hideEnemyAttackDescription2);
    enemyQueue3.addEventListener("mouseout", hideEnemyAttackDescription3);
  }
  
  function pause() {
    // Hide the enemy queue descriptions
    hideEnemyAttackDescription1();
    hideEnemyAttackDescription2();
    hideEnemyAttackDescription3();
  
    // Set the background to half transparent
    setBackgroundOpacity(0.4);
  
    // Stop the continuous functions
    clearInterval(autoPlayerActionGauge);
    clearInterval(autoEnemyActionGauge);
  
    // Remove click event listeners for the attack, defend and changeParryTimer buttons
    attackButton.removeEventListener("click", attackButtonSelected);
    defendButton.removeEventListener("click", defendButtonSelected);
    changeParryTimerButton.removeEventListener("click", changeParryTimer);
  
    // Remove hover event listeners for the enemy queue images
    enemyQueue1.removeEventListener("mouseover", showEnemyAttackDescription1);
    enemyQueue2.removeEventListener("mouseover", showEnemyAttackDescription2);
    enemyQueue3.removeEventListener("mouseover", showEnemyAttackDescription3);
    enemyQueue1.removeEventListener("mouseout", hideEnemyAttackDescription1);
    enemyQueue2.removeEventListener("mouseout", hideEnemyAttackDescription2);
    enemyQueue3.removeEventListener("mouseout", hideEnemyAttackDescription3);
  }
  
  // Defining functions for showing/hiding enemy attack descriptions. Have to define
  // all 6 separately in order to remove them in the pause function.
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
  
  // Show enemy queue description
  function showEnemyAttackDescription(enemyQueueIndex) {
    // Checks which of the 3 images is being selected and shows the description while hiding the image
    if (enemyQueueIndex === 0) {
      document.querySelector("#enemy_queue1_description").style.display = "flex";
      document.querySelector("#enemy_queue1").style.display = "none";
    } else if (enemyQueueIndex === 1) {
      document.querySelector("#enemy_queue2_description").style.display = "flex";
      document.querySelector("#enemy_queue2").style.display = "none";
    } else if (enemyQueueIndex === 2) {
      document.querySelector("#enemy_queue3_description").style.display = "flex";
      document.querySelector("#enemy_queue3").style.display = "none";
    }
  }
  
  // Hide enemy queue description
  function hideEnemyAttackDescription(enemyQueueIndex) {
    // Checks which of the 3 images is being selected and hides the description while showing the image
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
  
  // ==================
  // Change Parry Timer
  // ==================
  // Event Listener for the "Change Parry Timer" button
  function changeParryTimer(){
    // Pause the game
    pause();
    // Show the change parry timer menu
    document.querySelector("#change_parry_timer_container").style.display = "flex";
    // Add event listeners for the 3 parry timer options. Have to make 3 separate ones with distinct names in order to remove them later
    document.querySelector("#change_parry_timer_setting_button1").addEventListener("click", setParryTimerClassic);
    document.querySelector("#change_parry_timer_setting_button2").addEventListener("click", setParryTimerNormal);
    document.querySelector("#change_parry_timer_setting_button3").addEventListener("click", setParryTimerEasy);
  }
  
  // Event Listener for the Classic option
  function setParryTimerClassic(){
    parryTimerSetting = "classic";
  
    // Remove the click event listeners for the 3 parry timer options
    removeSetParryTimerEvents();
  
    // Hide the change parry timer menu
    document.querySelector("#change_parry_timer_container").style.display = "none";
  
    // Unpause the game
    unpause();
  
    // Start up continuous events again for both the player and enemy
    autoPlayerActionGauge = setInterval(() => {
      playerContinuousEvents(currentEnemy);
    }, player.agility);
    autoEnemyActionGauge = setInterval(() => {
      enemyContinuousEvents(currentEnemy);
    }, currentEnemy.agility);
  }
  
  // Event Listener for the Normal option
  function setParryTimerNormal(){
    parryTimerSetting = "normal";
  
    // Remove the click event listeners for the 3 parry timer options
    removeSetParryTimerEvents();
  
    // Hide the change parry timer menu
    document.querySelector("#change_parry_timer_container").style.display = "none";
  
    // Unpause the game
    unpause();
  
    // Start up continuous events again for both the player and enemy
    autoPlayerActionGauge = setInterval(() => {
      playerContinuousEvents(currentEnemy);
    }, player.agility);
    autoEnemyActionGauge = setInterval(() => {
      enemyContinuousEvents(currentEnemy);
    }, currentEnemy.agility);
  }
  
  // Event Listener for the Easy option
  function setParryTimerEasy(){
    parryTimerSetting = "easy";
  
    // Remove the click event listeners for the 3 parry timer options
    removeSetParryTimerEvents();
  
    // Hide the change parry timer menu
    document.querySelector("#change_parry_timer_container").style.display = "none";
  
    // Unpause the game
    unpause();
  
    // Start up continuous events again for both the player and enemy
    autoPlayerActionGauge = setInterval(() => {
      playerContinuousEvents(currentEnemy);
    }, player.agility);
    autoEnemyActionGauge = setInterval(() => {
      enemyContinuousEvents(currentEnemy);
    }, currentEnemy.agility);
  }
  
  // Remove the event listeners for the 3 parry timer options
  function removeSetParryTimerEvents(){
    document.querySelector("#change_parry_timer_setting_button1").removeEventListener("click", setParryTimerClassic);
    document.querySelector("#change_parry_timer_setting_button2").removeEventListener("click", setParryTimerNormal);
    document.querySelector("#change_parry_timer_setting_button3").removeEventListener("click", setParryTimerEasy);
  }