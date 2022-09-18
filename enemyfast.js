"use strict";

// =================================
// Create Fast Enemy Class (Stage 3)
// =================================
class EnemyFast3 extends EnemyFastEasy {
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
    let stun = false;
    let duration = 0;

    // Determine what is next up in the enemyQueue array and execute the attack. Modify the damage accordingly.
    // This section is the only difference between each enemy class. It is the configuration for this Enemy Class's
    // 3 attacks: the damage of each attack and how long it stuns (if it does).
    if (arrEnemyQueue[0] === Object.keys(this.attacks)[0]) {
      attackPower += 2;
    } else if (arrEnemyQueue[0] === Object.keys(this.attacks)[1]) {
      attackPower += 1;
      stun = true;
      duration = 1000;
    } else if (arrEnemyQueue[0] === Object.keys(this.attacks)[2]) {
      attackPower += 1;
      stun = true;
      duration = 1500;
    }
    enemyAttackMegaChecker(this, Player, attackPower, stun, duration);
  }
}

// =================================
// Create Fast Enemy Class (Stage 4)
// =================================
class EnemyFast4 extends EnemyFastEasy {
  // Stage 4 and 5 Enemies have the status parameter to enable Berserk
  constructor(
    maxHp,
    hp,
    strength,
    armour,
    agility,
    actionGaugeCounter = 0,
    attacks = {},
    name,
    image,
    status = {}
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
    ),
      (this.status = status);
  }

  // --- Attack Function ---
  attack(Player) {
    // Initialise variables to be modified later
    let attackPower = this.strength;
    let stun = false;
    let duration = 0;

    // Determine what is next up in the enemyQueue array and execute the attack. Modify the damage accordingly.
    // This section is the only difference between each enemy class. It is the configuration for this Enemy Class's
    // 3 attacks: the damage of each attack and how long it stuns (if it does).
    if (arrEnemyQueue[0] === Object.keys(this.attacks)[0]) {
      attackPower += 2;
      stun = true;
      duration = 1500;
    } else if (arrEnemyQueue[0] === Object.keys(this.attacks)[1]) {
      attackPower += 1;
    } else if (arrEnemyQueue[0] === Object.keys(this.attacks)[2]) {
      attackPower += 3;
    }
    enemyAttackMegaChecker(this, Player, attackPower, stun, duration);
  }
}

// =================================
// Create Fast Enemy Class (Stage 5)
// =================================
class EnemyFast5 extends EnemyFastEasy {
  // Stage 4 and 5 Enemies have the status parameter to enable Berserk
  constructor(
    maxHp,
    hp,
    strength,
    armour,
    agility,
    actionGaugeCounter = 0,
    attacks = {},
    name,
    image,
    status = {}
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
    ),
      (this.status = status);
  }

  // --- Attack Function ---
  attack(Player) {
    // Initialise variables to be modified later
    let attackPower = this.strength;
    let stun = false;
    let duration = 0;

    // Determine what is next up in the enemyQueue array and execute the attack. Modify the damage accordingly.
    // This section is the only difference between each enemy class. It is the configuration for this Enemy Class's
    // 3 attacks: the damage of each attack and how long it stuns (if it does).
    if (arrEnemyQueue[0] === Object.keys(this.attacks)[0]) {
      attackPower += 2;
      stun = true;
      duration = 1500;
    } else if (arrEnemyQueue[0] === Object.keys(this.attacks)[1]) {
      attackPower += 3;
    } else if (arrEnemyQueue[0] === Object.keys(this.attacks)[2]) {
      attackPower += 2;
      stun = true;
      duration = 1500;
    }
    enemyAttackMegaChecker(this, Player, attackPower, stun, duration);
  }
}
