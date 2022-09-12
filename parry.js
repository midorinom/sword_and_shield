"use strict";

function parryMiniGame(thisHp, playerStrength, thisArmour, damage, playerHp) {
  // Stop the Action Gauges from filling
  clearInterval(autoPlayerActionGauge);
  clearInterval(autoEnemyActionGauge);
  // Create container for the keys that will appear on screen
  const container = document.createElement("div");
  container.style.height = "8em";
  container.style.width = "40%";
  container.style.position = "absolute";
  container.style.top = "50%";
  container.style.left = "50%";
  container.style.transform = `translate(-50%, -50%)`;
  container.style.textAlign = "center";
  document.querySelector("body").append(container);

  // Create the keys that need to be pressed
  const arrKeys = [];
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
        arrKeys.push(i);
      }
    }
  });

  // Create timer
  const timer = document.createElement("div");
  timer.style.backgroundColor = "orange";
  timer.style.height = "2em";
  timer.style.width = "60%";
  timer.style.position = "absolute";
  timer.style.top = "30%";
  timer.style.left = "20%";
  document.querySelector("body").append(timer);

  // Timer Interval: 1.6 seconds, also report success/failure
  let timerCounter = 100;

  const timerInterval = setInterval(() => {
    timerCounter -= 0.625;
    timer.style.width = timerCounter + "%";
    // Success
    if (timerCounter > 0 && arrKeys.length === 6) {
      clearInterval(timerInterval);
      timer.remove();
      container.remove();

      const parryDamage = performDamageFomula(playerStrength, thisArmour);
      const text = `You parried! You took no damage and counterattacked, dealing ${parryDamage} damage to the enemy.`;
      updateTextLog(text);
      thisHp -= parryDamage;
      updateEnemyHp(thisHp);
      setBackgroundOpacity(1);
      // Start the gauages again
      autoPlayerActionGauge = setInterval(
        playerContinuousEvents,
        player.agility
      );
      autoEnemyActionGauge = setInterval(enemyContinuousEvents, enemy.agility);
    } // Failure
    else if (timerCounter <= 0 && arrKeys.length < 6) {
      clearInterval(timerInterval);
      timer.remove();
      container.remove();

      const reducedDamage = Math.round(damage * 0.3);
      playerHp -= damage;
      const text = `You defended! The enemy only dealt ${reducedDamage} damage to you.`;
      updateTextLog(text);
      updatePlayerHp(playerHp);
      setBackgroundOpacity(1);
      // Start the gauges again
      autoPlayerActionGauge = setInterval(
        playerContinuousEvents,
        player.agility
      );
      autoEnemyActionGauge = setInterval(enemyContinuousEvents, enemy.agility);
    }
  }, 10);
}
