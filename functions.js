"use strict";

function startStage(Player, Enemy){
  // Display player and enemy hp values onto the page
updateHp(true, Player);
updateHp(false, Enemy);

// Start Enemy Queue
first3EnemyAttacks(Enemy);
updateEnemyQueue();

// Event Listeners for enemy queue to show a description of the attacks
const enemyQueue1 = document.querySelector("#enemy_queue1_container");
const enemyQueue2 = document.querySelector("#enemy_queue2_container");
const enemyQueue3 = document.querySelector("#enemy_queue3_container");

enemyQueue1.addEventListener("mouseover", () => {
  showEnemyAttackDescription(Enemy, 0);
});
enemyQueue2.addEventListener("mouseover", () => {
  showEnemyAttackDescription(Enemy, 1);
});
enemyQueue3.addEventListener("mouseover", () => {
  showEnemyAttackDescription(Enemy, 2);
});
enemyQueue1.addEventListener("mouseout", () => {
  hideEnemyAttackDescription(0);
});
enemyQueue2.addEventListener("mouseout", () => {
  hideEnemyAttackDescription(1);
});
enemyQueue3.addEventListener("mouseout", () => {
  hideEnemyAttackDescription(2);
});
}

function updateHp(isPlayer, ClassName) {
  let hpValue;
  let hpBar;
  if (isPlayer === true) {
    hpValue = "#player_hp_value";
    hpBar = "#player_hp_bar";
  } else {
    hpValue = "#enemy_hp_value";
    hpBar = "#enemy_hp_bar";
  }
  document.querySelector(hpValue).innerText = ClassName.hp;
  const hpPercentage = (ClassName.hp / ClassName.maxHp) * 100;
  document.querySelector(hpBar).style.width = hpPercentage + "%";

  if (hpPercentage < 25) {
    document.querySelector(hpBar).style.backgroundColor = "red";
  } else if (hpPercentage >= 25 && hpPercentage < 50) {
    document.querySelector(hpBar).style.backgroundColor = "yellow";
  } else if (hpPercentage >= 50 && hpPercentage < 75) {
    document.querySelector(hpBar).style.backgroundColor = "lightgreen";
  } else {
    document.querySelector(hpBar).style.backgroundColor = "lightblue";
  }
}

function updatePlayerHp(Player) {
  document.querySelector("#player_hp_value").innerText = Player.hp;
  const hpPercentage = (Player.hp / Player.maxHp) * 100;
  document.querySelector("#player_hp_bar").style.width = hpPercentage + "%";
}

function updateEnemyHp(Enemy) {
  document.querySelector("#enemy_hp_value").innerText = Enemy.hp;
  const hpPercentage = (Enemy.hp / Enemy.maxHp) * 100;
  document.querySelector("#enemy_hp_bar").style.width = hpPercentage + "%";
}

function updateTextLog(newText = "test") {
  // add new text into textLog[0] then remove textLog[4] so the array doesn't grow infinitely. Then update the css.
  textLog.unshift(newText);
  textLog.pop();
  document.querySelector("#textlog_line1").innerText = textLog[0];
  document.querySelector("#textlog_line2").innerText = textLog[1];
  document.querySelector("#textlog_line3").innerText = textLog[2];
  document.querySelector("#textlog_line4").innerText = textLog[3];
}

function performDamageFomula(strength, opponentArmour) {
  // Roll a random number between 1 to 20
  const modifier = Math.ceil(Math.random() * 20);
  let damage = 0;
  // Coin toss to decide whether to add or subtract that random number from the strength value. Then account for opponent's armour.
  if (Math.round(Math.random()) === 0) {
    damage = Math.round(strength * ((100 - modifier) / 100) * opponentArmour);
  } else {
    damage = Math.round(strength * ((100 + modifier) / 100) * opponentArmour);
  }
  return damage;
}

function fillPlayerActionGauge() {
  // Make the height of the progress bar correspond to the counter value, then increment counter
  if (player.actionGaugeCounter < 100) {
    player.actionGaugeCounter += 1;
    playerActionGauge1.style.height = player.actionGaugeCounter + "%";
  }
  if (player.actionGaugeCounter >= 100 && player.actionGaugeCounter < 200) {
    player.actionGaugeCounter += 1;
    playerActionGauge2.style.height = player.actionGaugeCounter - 100 + "%";
  }
}

function fillEnemyActionGauge(Enemy) {
  if (Enemy.actionGaugeCounter < 100) {
    Enemy.actionGaugeCounter += 1;
    enemyActionGauge1.style.height = Enemy.actionGaugeCounter + "%";
  } else {
    // Enemy automatically attacks when Action Gauge is full
    Enemy.attack(player);
  }
}

function attackButtonSelected() {
  // check first if the button is already selected
  if (player.actionSelected.attack === false) {
    // if Action Gauge is < 100, make button bigger when selected
    if (player.actionGaugeCounter < 100) {
      attackButton.style.height = 85 + "%";
      attackButton.style.width = 20 + "%";
    }
    // set actionSelected state in the player class to true
    player.actionSelected.attack = true;
  } else {
    // de-select the button and make the button size small again
    player.actionSelected.attack = false;
    attackButton.style.height = 70 + "%";
    attackButton.style.width = 12 + "%";
  }
  // if any other button was selected, set it to false and make it small
  player.actionSelected.defend = false;
  defendButton.style.height = 70 + "%";
  defendButton.style.width = 12 + "%";
}

function defendButtonSelected() {
  if (player.actionSelected.defend === false) {
    if (player.actionGaugeCounter < 100) {
      defendButton.style.height = 85 + "%";
      defendButton.style.width = 20 + "%";
    }
    player.actionSelected.defend = true;
  } else {
    player.actionSelected.defend = false;
    defendButton.style.height = 70 + "%";
    defendButton.style.width = 12 + "%";
  }
  player.actionSelected.attack = false;
  attackButton.style.height = 70 + "%";
  attackButton.style.width = 12 + "%";
}

// This function will continually run throughout the fight as long as the player is not stunned
function playerContinuousEvents(Enemy) {
  fillPlayerActionGauge();
  if (player.actionSelected.attack === true) {
    player.attack(Enemy);
  }
  if (player.actionSelected.defend === true) {
    player.defend();
  }
}

// This function will continually run throughout the fight as long as the enemy is not stunned
function enemyContinuousEvents(Enemy) {
  fillEnemyActionGauge(Enemy);
}

function setBackgroundOpacity(opacity) {
  document.querySelector("#hp_bars").style.opacity = opacity;
  document.querySelector("#main_div").style.opacity = opacity;
  document.querySelector("#action_buttons").style.opacity = opacity;
  document.querySelector("#textlog").style.opacity = opacity;
}

function first3EnemyAttacks(Enemy) {
  const allAttacks = Object.values(Enemy.attacks);
  for (let i = 0; i < 3; i++) {
    const randomAttack =
      allAttacks[Math.floor(Math.random() * allAttacks.length)];
    enemyQueue.push(randomAttack);
  }
}

function updateEnemyQueue() {
  document.querySelector("#enemy_queue1").src = enemyQueue[0];
  document.querySelector("#enemy_queue2").src = enemyQueue[1];
  document.querySelector("#enemy_queue3").src = enemyQueue[2];
}

function moveEnemyQueueAlong(attacks) {
  // get rid of the first attack in the queue
  enemyQueue.shift();
  // put in a new attack at the end of the queue
  const allAttacks = Object.values(attacks);
  const randomAttack =
    allAttacks[Math.floor(Math.random() * allAttacks.length)];
  enemyQueue.push(randomAttack);
}

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