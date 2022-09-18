"use strict";

function parryMiniGame(Enemy, Player, damage, stun, stunDuration, parryTimerSetting) {
  pause();

  // Create an array for the boxes that need to be pressed/clicked. Will be used to check for failure/victory condition later
  const arrKeys = [];

  // Create container for the timer
  const timerContainer = document.createElement("div");
  timerContainer.style.height = "2em";
  timerContainer.style.width = "60%";
  timerContainer.style.position = "absolute";
  timerContainer.style.top = "30%";
  timerContainer.style.left = "20%";
  timerContainer.style.borderStyle = "solid";
  timerContainer.style.borderColor = "black";
  timerContainer.style.borderWidth = "medium";
  document.querySelector("body").append(timerContainer);

  // Create timer
  const timer = document.createElement("div");
  timer.style.backgroundColor = "orange";
  timer.style.height = "100%";
  timerContainer.append(timer);

  // Create the timer counter that will be decremented later. It will also be tied to the width of the timer bar 
  let timerCounter = 100;

  // Coin Toss to decide whether to play the key pressing or the clicking game
  // =================
  // Keyboard Minigame
  // =================
  if (Math.round(Math.random()) === 0) {
    // Create container for the keys that will appear on screen
    const container = document.createElement("div");
    container.style.height = "15%";
    container.style.width = "40%";
    // Place it in the center of the screen
    container.style.position = "absolute";
    container.style.top = "50%";
    container.style.left = "50%";
    container.style.transform = `translate(-50%, -50%)`;
    container.style.textAlign = "center";
    document.querySelector("body").append(container);

    // All the possible keys that will appear
    const allPossibleKeys = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
    ];

    // Using a loop to create the 3 keys
    for (let i = 0; i < 3; i++) {
      const newKey = document.createElement("div");
      // Styling
      newKey.style.height = "100%";
      newKey.style.width = "25%";
      newKey.style.backgroundColor = "yellow";
      newKey.style.borderColor = "red";
      newKey.style.borderStyle = "solid";
      newKey.style.borderWidth = "thick";
      newKey.style.fontSize = "2em";
      newKey.style.textAlign = "center";
      newKey.style.lineHeight = "4em";
      newKey.style.marginRight = "1em";
      newKey.style.color = "black";
      newKey.style.float = "left";
      // Randomly assign a key and making the text appear by appending the key to the container
      const randomNumber = Math.floor(Math.random() * allPossibleKeys.length);
      newKey.innerText = allPossibleKeys[randomNumber];
      container.append(newKey);
      // Delete from the list of possible keys, to avoid getting duplicates
      allPossibleKeys.splice(randomNumber, 1);
      // Put the newKey into the arrKeys array
      arrKeys.push(newKey);
    }

    // Event Listener for key presses
    window.addEventListener("keydown", function (e) {
      // The arrKeys at this moment contains the elements of the 3 randomly generated keys which are also shown on the screen
      // Iterate through the array to check if the player inputs those keys
      for (let i = 0; i < arrKeys.length; i++) {
        if (
          e.code === `Key${arrKeys[i].innerText}` ||
          e.code === `Digit${arrKeys[i].innerText}`
        ) {
          // If the player successfully inputs a key, change the color of the corresponding key on the screen to green
          arrKeys[i].style.backgroundColor = "lightgreen";
          arrKeys[i].style.borderColor = "green";
          // Push in 1 empty string into the arrKeys array for each key that the player inputs correctly
          // This will be used to check for success/failure later
          arrKeys.push("");
        }
      }
    });

    // Start the timer. The speed that the timer decreases depends on the parryTimerSetting that is currently selected
    // The timerCounter starts at a value of 100 which makes the timer bar start with a width of 100% accordingly
    // The interval set here is 1/100 of a second. The timer duration will be however long it takes to decrease timerCounter to 0
    const timerInterval = setInterval(() => {
      switch (parryTimerSetting) {
        // 1.6 seconds
        case "classic":
          timerCounter -= 0.625;
          break;
        // 3.1 seconds
        case "normal":
          timerCounter -= 0.32;
          break;
        // 5 seconds
        case "easy":
          timerCounter -= 0.2;
      }
      // Associate the width of the timer bar to the timerCounter variable
      timer.style.width = timerCounter + "%";
      // Success if the timer has not run out and arrKeys has 6 items (3 from the randomly generated keys and the 3 empty strings that
      // were pushed in whenever the player successfully input keys)
      if (timerCounter > 0 && arrKeys.length === 6) {
        container.remove();
        success(timerInterval);
      } // Failure if the timer hits 0
      else if (timerCounter <= 0) {
        container.remove();
        fail(timerInterval);
      }
    }, 10);
  } 
  // =================
  // Clicking Minigame
  // =================
  else {
    // Using a loop to create the 3 click boxes
    for (let i = 0; i < 3; i++) {
      const clickBox = document.createElement("div");
      clickBox.style.height = "15%";
      clickBox.style.width = "10%";
      clickBox.style.backgroundColor = "lightgreen";
      clickBox.style.borderColor = "orange";
      clickBox.style.borderStyle = "solid";
      clickBox.style.borderWidth = "thick";
      // Spawn the click box at a random position throughout the screen
      // The top and left position values have to account for the height and width of the click box so it doesn't spawn out of screen
      clickBox.style.position = "absolute";
      clickBox.style.top = Math.floor(Math.random() * 80) + "%";
      clickBox.style.left = Math.floor(Math.random() * 85) + "%";
      // Push each click box into the arrKeys array which will be used to check for success/failure later
      arrKeys.push(clickBox);
      // Add a click event listener that removes the clickbox when clicked and also push an empty string into the arrKeys array, it will
      // be used to check for success/failure later
      clickBox.addEventListener("click", () => {
        clickBox.remove();
        arrKeys.push("");
      });
      // Append the click box to the body element
      document.querySelector("body").append(clickBox);
    }

    // Start the timer. The speed that the timer decreases depends on the parryTimerSetting that is currently selected
    // The timerCounter starts at a value of 100 which makes the timer bar start with a width of 100% accordingly
    // The interval set here is 1/100 of a second. The timer duration will be however long it takes to decrease timerCounter to 0
    const timerInterval = setInterval(() => {
      switch (parryTimerSetting){
        // 1.6 seconds
        case "classic":
          timerCounter -= 0.625;
          break;
        // 3.1 seconds
        case "normal":
          timerCounter -= 0.32;
          break;
        // 5 seconds
        case "easy":
          timerCounter -= 0.2;
      }
      // Associate the width of the timer bar to the timerCounter variable
      timer.style.width = timerCounter + "%";
      // Success if the timer has not run out and arrKeys has 6 items (3 from the randomly generated click boxes and the 3 empty 
      // strings that were pushed in whenever the player successfully clicked the click boxes)
      if (timerCounter > 0 && arrKeys.length === 6) {
        success(timerInterval);
      } // Failure if the timer hits 0
      else if (timerCounter <= 0) {
        for (let i = 0; i < 3; i++) {
          arrKeys[i].remove();
        }
        fail(timerInterval);
      }
    }, 10);
  }

  // =============================
  // Success and Failure Functions
  // =============================
  // Success
  function success(timerInterval) {
    // Clear the timer interval and remove it from the screen
    clearInterval(timerInterval);
    timerContainer.remove();

    // Define variables that will be used later
    let text = "";
    const parryDamage = performDamageFomula(Player.strength, Enemy.armour);

    // Check if the player has the Parry Stun upgrade. If so, update the text accordingly with the parryDamage and apply the stun effect to the enemy
    if (arrUpgrades.includes("images/stages34_upgrade1.png") === true) {
      text = `You parried! You took no damage and counterattacked, dealing ${parryDamage} damage to the ${Enemy.name} and stunning it for 1.5 seconds.`;
      enemyGotStunned(1500);
    } 
    // If the player does not have the Parry Stun upgrade, update the text accordingly and start up the enemyContinuousEvents
    // Did not have to start up the enemyContinuousEvents in the previous case because the enemyGotStunned function does it already
    else {
      text = `You parried! You took no damage and counterattacked, dealing ${parryDamage} damage to the ${Enemy.name}.`;
      autoEnemyActionGauge = setInterval(() => {
        enemyContinuousEvents(Enemy);
      }, Enemy.agility);
    }
    // Set player animation back to idle
    playerSprite.src = "images/player_idle.gif";

    // Update the text log
    updateTextLog(text);

    // Update the enemy hp
    Enemy.hp -= parryDamage;
    updateHp(false, Enemy);

    // Start up the playerContinuousEvents as well
    autoPlayerActionGauge = setInterval(() => {
      playerContinuousEvents(Enemy);
    }, Player.agility);

    // Unpause the game
    unpause();
  }

  // Fail
  function fail(timerInterval) {
    // Clear the timer interval and remove it from the screen
    clearInterval(timerInterval);
    timerContainer.remove();

    // Define variables that will be used later. The outcome for failing the parry is a defend, mitigating 70% of incoming damage
    const reducedDamage = Math.round(damage * 0.3);
    const text = `You defended! The ${Enemy.name} only dealt ${reducedDamage} damage to you.`;

    // Set player animation back to idle
    playerSprite.src = "images/player_idle.gif";

    // Update the text log
    updateTextLog(text);

    // Update the enemy hp
    Player.hp -= damage;
    updateHp(true, Player);

    // Check if the enemy's attack has a stun property. If it does, stun the player for the duration specified in the enemy's attack
    // Update the text log accordingly with the stun duration after converting it from milliseconds to seconds
    if (stun === true) {
      playerGotStunned(stunDuration);
      const seconds = stunDuration / 1000;
      updateTextLog(`You got stunned for ${seconds} seconds.`);
    } 
    // If the enemy's attack does not stun, start up the playerContinuousEvents
    // Did not have to start up the playerrContinuousEvents in the previous case because the playerGotStunned function does it already
    else {
      autoPlayerActionGauge = setInterval(() => {
        playerContinuousEvents(Enemy);
      }, Player.agility);
    }
    // Start up the enemyContinuousEvents as well
    autoEnemyActionGauge = setInterval(() => {
      enemyContinuousEvents(Enemy);
    }, Enemy.agility);

    // Unpause the game
    unpause();
  }
}
