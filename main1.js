"use strict";

// Define variables
let currentStage = 1;
const playerActionGauge1 = document.querySelector(
  "#player_action_gauge1_progress"
);
const playerActionGauge2 = document.querySelector(
  "#player_action_gauge2_progress"
);
const enemyActionGauge1 = document.querySelector(
  "#enemy_action_gauge1_progress"
);
const attackButton = document.querySelector("#attack_button");
const defendButton = document.querySelector("#defend_button");
const textLog = ["", "", "", ""];
const arrEnemyQueue = [];
const enemyQueue1 = document.querySelector("#enemy_queue1_container");
const enemyQueue2 = document.querySelector("#enemy_queue2_container");
const enemyQueue3 = document.querySelector("#enemy_queue3_container");
let currentEnemy;
let chosenUpgrade = "notSelected";
let randomUpgrade1, randomUpgrade2;
const upgradesContainer = document.querySelector("#upgrades_container");
let upgrades1Selected = false;
let upgrades2Selected = false;
const upgradesImage1 = document.querySelector("#upgrades_image1");
const upgradesImage2 = document.querySelector("#upgrades_image2");
const upgradesImage1Container = document.querySelector(
  "#upgrades_image1_container"
);
const upgradesImage2Container = document.querySelector(
  "#upgrades_image2_container"
);
const arrUpgrades = [];

// Create EnemyBalancedEasy class
class EnemyBalancedEasy {
  constructor(
    maxHp,
    hp,
    strength,
    armour,
    agility,
    actionGaugeCounter = 0,
    attacks = {},
    name,
    image
  ) {
    (this.maxHp = maxHp),
      (this.hp = hp),
      (this.strength = strength),
      (this.armour = armour),
      (this.agility = agility),
      (this.actionGaugeCounter = actionGaugeCounter),
      (this.attacks = attacks),
      (this.name = name),
      (this.image = image);
  }

  getAttackDescription(imageLink) {
    for (let i = 0; i < 3; i++) {
      if (imageLink === Object.keys(this.attacks)[i]) {
        return Object.values(this.attacks)[i];
      }
    }
  }

  attack(Player) {
    // Determine what is next up in the enemyQueue array and execute the attack. Modify strength accordingly.
    let attackPower = this.strength;
    if (arrEnemyQueue[0] === Object.keys(this.attacks)[1]) {
      attackPower += 1;
    } else if (arrEnemyQueue[0] === Object.keys(this.attacks)[2]) {
      attackPower += 2;
    }
    enemyAttackMegaChecker(this, Player, attackPower);
  }
}

// Create Player class
class Player extends EnemyBalancedEasy {
  constructor(
    maxHp,
    hp,
    strength,
    armour,
    agility,
    actionGaugeCounter,
    actionSelected = {},
    status = {}
  ) {
    super(maxHp, hp, strength, armour, agility, actionGaugeCounter),
      (this.actionSelected = actionSelected),
      (this.status = status);
  }

  attack(Enemy) {
    // Check first if there is at least 1 full bar of Action Gauge before executing the function
    if (this.actionGaugeCounter >= 100) {
      // setActionSelected and defendStance to false, downsize the attack button back to its original size
      this.actionSelected.attack = false;
      this.status.defendStance = false;
      attackButton.style.height = 70 + "%";
      attackButton.style.width = 12 + "%";
      // Subtract from the counter and adjust height of the bars to reflect the deduction
      this.actionGaugeCounter -= 100;
      if (this.actionGaugeCounter <= 100) {
        playerActionGauge2.style.height = 0;
        playerActionGauge1.style.height = this.actionGaugeCounter + "%";
      } else {
        playerActionGauge1.style.height = "100%";
        playerActionGauge2.style.height = this.actionGaugeCounter - 100 + "%";
      }
      // Perform the damage formula
      let damage = performDamageFomula(this.strength, Enemy.armour);
      // Subtract the damage from enemy hp and update the hp value
      Enemy.hp -= damage;
      updateHp(false, Enemy);
      // Update Text Log
      const text = `You dealt ${damage} damage to the ${Enemy.name}.`;
      updateTextLog(text);
    }
  }

  defend() {
    // Check first if there is at least 1 full bar of Action Gauge before executing the function
    if (this.actionGaugeCounter >= 100) {
      // set ActionSelected back to false, set defendStance to true, downsize the defend button back to its original size
      this.actionSelected.defend = false;
      this.status.defendStance = true;
      defendButton.style.height = 70 + "%";
      defendButton.style.width = 12 + "%";
      // Subtract from the counter and adjust height of the bars to reflect the deduction
      this.actionGaugeCounter -= 100;
      if (this.actionGaugeCounter <= 100) {
        playerActionGauge2.style.height = 0;
        playerActionGauge1.style.height = this.actionGaugeCounter + "%";
      } else {
        playerActionGauge1.style.height = "100%";
        playerActionGauge2.style.height = this.actionGaugeCounter - 100 + "%";
      }
    }
  }
}

// Create EnemyFastEasy class
class EnemyFastEasy extends EnemyBalancedEasy {
  constructor(
    maxHp,
    hp,
    strength,
    armour,
    agility,
    actionGaugeCounter = 0,
    attacks = {},
    name,
    image
  ) {
    super(
      maxHp,
      hp,
      strength,
      armour,
      agility,
      actionGaugeCounter,
      attacks,
      name,
      image
    );
  }

  attack(Player) {
    // Determine what is next up in the enemyQueue array and execute the attack. Modify strength accordingly.
    let attackPower = this.strength;
    if (arrEnemyQueue[0] === Object.keys(this.attacks)[0]) {
      attackPower += 1;
    } else if (arrEnemyQueue[0] === Object.keys(this.attacks)[1]) {
      attackPower += 2;
    } else if (arrEnemyQueue[0] === Object.keys(this.attacks)[2]) {
      attackPower += 1;
    }
    enemyAttackMegaChecker(this, Player, attackPower);
  }
}

class EnemySlowEasy extends EnemyBalancedEasy {
  constructor(
    maxHp,
    hp,
    strength,
    armour,
    agility,
    actionGaugeCounter = 0,
    attacks = {},
    name,
    image
  ) {
    super(
      maxHp,
      hp,
      strength,
      armour,
      agility,
      actionGaugeCounter,
      attacks,
      name,
      image
    );
  }

  attack(Player) {
    // Determine what is next up in the enemyQueue array and execute the attack. Modify strength accordingly.
    let attackPower = this.strength;
    if (arrEnemyQueue[0] === Object.keys(this.attacks)[0]) {
      attackPower += 2;
    } else if (arrEnemyQueue[0] === Object.keys(this.attacks)[1]) {
      attackPower += 3;
    } else if (arrEnemyQueue[0] === Object.keys(this.attacks)[2]) {
      attackPower += 2;
    }
    enemyAttackMegaChecker(this, Player, attackPower);
  }
}

class EnemyBalancedHard extends EnemyBalancedEasy {
  constructor(
    maxHp,
    hp,
    strength,
    armour,
    agility,
    actionGaugeCounter = 0,
    attacks = {},
    name,
    image
  ) {
    super(
      maxHp,
      hp,
      strength,
      armour,
      agility,
      actionGaugeCounter,
      attacks,
      name,
      image
    );
  }
}

class EnemyFastHard extends EnemyFastEasy {
  constructor(
    maxHp,
    hp,
    strength,
    armour,
    agility,
    actionGaugeCounter = 0,
    attacks = {},
    name,
    image
  ) {
    super(
      maxHp,
      hp,
      strength,
      armour,
      agility,
      actionGaugeCounter,
      attacks,
      name,
      image
    );
  }
}

class EnemySlowHard extends EnemySlowEasy {
  constructor(
    maxHp,
    hp,
    strength,
    armour,
    agility,
    actionGaugeCounter = 0,
    attacks = {},
    name,
    image
  ) {
    super(
      maxHp,
      hp,
      strength,
      armour,
      agility,
      actionGaugeCounter,
      attacks,
      name,
      image
    );
  }
}
