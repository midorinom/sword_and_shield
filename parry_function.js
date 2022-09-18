"use strict";

function parryMiniGame(Enemy, Player, damage, stun, stunDuration, parryTimerSetting) {
  pause();

  // Create an array for the boxes that need to be pressed/clicked
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

  // Timer Interval: 1.6 seconds, also report success/failure
  let timerCounter = 100;

  // Coin Toss to decide whether to play the key pressing or the clicking game
  if (Math.round(Math.random()) === 0) {
    // Create container for the keys that will appear on screen
    const container = document.createElement("div");
    container.style.height = "15%";
    container.style.width = "40%";
    container.style.position = "absolute";
    container.style.top = "50%";
    container.style.left = "50%";
    container.style.transform = `translate(-50%, -50%)`;
    container.style.textAlign = "center";
    document.querySelector("body").append(container);

    // All possible keys
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
      // Randomly assign a key and making the text appear
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
      for (let i = 0; i < arrKeys.length; i++) {
        if (
          e.code === `Key${arrKeys[i].innerText}` ||
          e.code === `Digit${arrKeys[i].innerText}`
        ) {
          arrKeys[i].style.backgroundColor = "lightgreen";
          arrKeys[i].style.borderColor = "green";
          arrKeys.push("");
        }
      }
    });

    const timerInterval = setInterval(() => {
      switch (parryTimerSetting) {
        case "classic":
          timerCounter -= 0.625;
          break;
        case "normal":
          timerCounter -= 0.32;
          break;
        case "easy":
          timerCounter -= 0.2;
      }
      timer.style.width = timerCounter + "%";
      // Success
      if (timerCounter > 0 && arrKeys.length === 6) {
        container.remove();
        success(timerInterval);
      } // Failure
      else if (timerCounter <= 0) {
        container.remove();
        fail(timerInterval);
      }
    }, 10);
  } else {
    // ==============
    // Mouse Event
    // ==============
    for (let i = 0; i < 3; i++) {
      const clickBox = document.createElement("div");
      clickBox.style.height = "15%";
      clickBox.style.width = "10%";
      clickBox.style.backgroundColor = "lightgreen";
      clickBox.style.borderColor = "orange";
      clickBox.style.borderStyle = "solid";
      clickBox.style.borderWidth = "thick";
      clickBox.style.position = "absolute";
      clickBox.style.top = Math.floor(Math.random() * 80) + "%";
      clickBox.style.left = Math.floor(Math.random() * 85) + "%";
      arrKeys.push(clickBox);
      clickBox.addEventListener("click", () => {
        clickBox.remove();
        arrKeys.push("");
      });
      document.querySelector("body").append(clickBox);
    }

    const timerInterval = setInterval(() => {
      switch (parryTimerSetting){
        case "classic":
          timerCounter -= 0.625;
          break;
        case "normal":
          timerCounter -= 0.32;
          break;
        case "easy":
          timerCounter -= 0.2;
      }
      timer.style.width = timerCounter + "%";
      // Success
      if (timerCounter > 0 && arrKeys.length === 6) {
        success(timerInterval);
      } // Failure
      else if (timerCounter <= 0) {
        for (let i = 0; i < 3; i++) {
          arrKeys[i].remove();
        }
        fail(timerInterval);
      }
    }, 10);
  }

  // Success and Failure functions
  function success(timerInterval) {
    clearInterval(timerInterval);
    timerContainer.remove();

    let text = "";
    const parryDamage = performDamageFomula(Player.strength, Enemy.armour);

    if (arrUpgrades.includes("images/stages34_upgrade1.png") === true) {
      text = `You parried! You took no damage and counterattacked, dealing ${parryDamage} damage to the ${Enemy.name} and stunning it for 1.5 seconds.`;
      enemyGotStunned(1500);
    } else {
      text = `You parried! You took no damage and counterattacked, dealing ${parryDamage} damage to the ${Enemy.name}.`;
      autoEnemyActionGauge = setInterval(() => {
        enemyContinuousEvents(Enemy);
      }, Enemy.agility);
    }
    // Set player animation back to idle
    playerSprite.src = "images/player_idle.gif";

    updateTextLog(text);
    Enemy.hp -= parryDamage;
    updateHp(false, Enemy);

    autoPlayerActionGauge = setInterval(() => {
      playerContinuousEvents(Enemy);
    }, Player.agility);

    unpause();
  }

  function fail(timerInterval) {
    clearInterval(timerInterval);
    timerContainer.remove();

    const reducedDamage = Math.round(damage * 0.3);
    const text = `You defended! The ${Enemy.name} only dealt ${reducedDamage} damage to you.`;

    // Set player animation back to idle
    playerSprite.src = "images/player_idle.gif";

    updateTextLog(text);
    Player.hp -= damage;
    updateHp(true, Player);

    if (stun === true) {
      playerGotStunned(stunDuration);
      const seconds = stunDuration / 1000;
      updateTextLog(`You got stunned for ${seconds} seconds.`);
    } else {
      autoPlayerActionGauge = setInterval(() => {
        playerContinuousEvents(Enemy);
      }, Player.agility);
    }
    autoEnemyActionGauge = setInterval(() => {
      enemyContinuousEvents(Enemy);
    }, Enemy.agility);
    unpause();
  }
}
