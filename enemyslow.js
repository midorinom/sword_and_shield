"use strict";

// =================================
// Create Slow Enemy Class (Stage 3)
// =================================
class EnemySlow3 extends EnemySlowEasy {
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

// =================================
// Create Slow Enemy Class (Stage 4)
// =================================
class EnemySlow4 extends EnemySlowEasy {
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
    // Determine what is next up in the enemyQueue array and execute the attack. Modify strength accordingly.
    let attackPower = this.strength;
    let stun = false;
    let duration = 0;

    if (arrEnemyQueue[0] === Object.keys(this.attacks)[0]) {
      attackPower += 2;
      stun = true;
      duration = 1500;
    } else if (arrEnemyQueue[0] === Object.keys(this.attacks)[1]) {
      attackPower += 3;
      stun = true;
      duration = 2000;
    } else if (arrEnemyQueue[0] === Object.keys(this.attacks)[2]) {
      attackPower += 2;
      stun = true;
      duration = 1500;
    }
    enemyAttackMegaChecker(this, Player, attackPower, stun, duration);
  }
}

// =================================
// Create Slow Enemy Class (Stage 5)
// =================================
class EnemySlow5 extends EnemySlowEasy {
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
    // Determine what is next up in the enemyQueue array and execute the attack. Modify strength accordingly.
    let attackPower = this.strength;
    let stun = false;
    let duration = 0;

    attackPower += 3;
    stun = true;
    duration = 2000;

    enemyAttackMegaChecker(this, Player, attackPower, stun, duration);
  }
}
