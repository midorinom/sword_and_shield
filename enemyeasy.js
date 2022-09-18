"use strict";

// ==========================================
// Create Balanced Enemy Class (Stage 1 & 2)
// ==========================================
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

  // --- getAttackDescription Function ---
  // This function will be inherited wholesale by all Enemy classes
  getAttackDescription(imageLink) {
    // Takes the imageLink passed into the function and checks which out of the enemy's 3 attacks it is.
    // Then, return the corresponding description.
    for (let i = 0; i < 3; i++) {
      if (imageLink === Object.keys(this.attacks)[i]) {
        return Object.values(this.attacks)[i];
      }
    }
  }

  // -- Attack Function ---
  attack(Player) {
    // Initialise variables to be modified later
    let attackPower = this.strength;
    // Determine what is next up in the enemyQueue array and execute the attack. Modify the damage accordingly.
    // This section is the only difference between each enemy class. It is the configuration for this Enemy Class's
    // 3 attacks: the damage of each attack and how long it stuns (if it does).
    if (arrEnemyQueue[0] === Object.keys(this.attacks)[0]) {
      attackPower += 1;
    } else if (arrEnemyQueue[0] === Object.keys(this.attacks)[1]) {
      attackPower += 2;
    } else if (arrEnemyQueue[0] === Object.keys(this.attacks)[2]) {
      attackPower += 3;
    }
    enemyAttackMegaChecker(this, Player, attackPower);
  }
}

// ==========================================
// Create Fast Enemy Class (Stage 1 & 2)
// ==========================================
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

  // --- Attack Function ---
  attack(Player) {
    // Initialise variables to be modified later
    let attackPower = this.strength;
    // Determine what is next up in the enemyQueue array and execute the attack. Modify the damage accordingly.
    // This section is the only difference between each enemy class. It is the configuration for this Enemy Class's
    // 3 attacks: the damage of each attack and how long it stuns (if it does).
    if (arrEnemyQueue[0] === Object.keys(this.attacks)[0]) {
      attackPower += 1;
    } else if (arrEnemyQueue[0] === Object.keys(this.attacks)[1]) {
      attackPower += 2;
    } else if (arrEnemyQueue[0] === Object.keys(this.attacks)[2]) {
      attackPower += 2;
    }
    enemyAttackMegaChecker(this, Player, attackPower);
  }
}

// ==========================================
// Create Slow Enemy Class (Stage 1 & 2)
// ==========================================
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

  // --- Attack Function ---
  attack(Player) {
    // Initialise variables to be modified later
    let attackPower = this.strength;
    // Determine what is next up in the enemyQueue array and execute the attack. Modify the damage accordingly.
    // This section is the only difference between each enemy class. It is the configuration for this Enemy Class's
    // 3 attacks: the damage of each attack and how long it stuns (if it does).
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
