"use strict";

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

  attack(Player) {
    // Determine what is next up in the enemyQueue array and execute the attack. Modify strength accordingly.
    let attackPower = this.strength;
    let stun = false;
    let duration = 0;

    if (arrEnemyQueue[0] === Object.keys(this.attacks)[0]) {
      attackPower += 2;
    } else if (arrEnemyQueue[0] === Object.keys(this.attacks)[1]) {
      attackPower += 1;
      stun = true;
      duration = 1000;
    } else if (arrEnemyQueue[0] === Object.keys(this.attacks)[2]) {
      attackPower += 1;
      stun = true;
      duration = 1000;
    }
    enemyAttackMegaChecker(this, Player, attackPower, stun, duration);
  }
}

class EnemyFast4 extends EnemyFastEasy {
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

  attack(Player) {
    // Determine what is next up in the enemyQueue array and execute the attack. Modify strength accordingly.
    let attackPower = this.strength;
    let stun = false;
    let duration = 0;

    if (arrEnemyQueue[0] === Object.keys(this.attacks)[0]) {
      attackPower += 2;
      stun = true;
      duration = 2000;
    } else if (arrEnemyQueue[0] === Object.keys(this.attacks)[1]) {
      attackPower += 1;
    } else if (arrEnemyQueue[0] === Object.keys(this.attacks)[2]) {
      attackPower += 3;
    }
    enemyAttackMegaChecker(this, Player, attackPower, stun, duration);
  }
}

class EnemyFast5 extends EnemyFastEasy {
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

  attack(Player) {
    // Determine what is next up in the enemyQueue array and execute the attack. Modify strength accordingly.
    let attackPower = this.strength;
    let stun = false;
    let duration = 0;

    if (arrEnemyQueue[0] === Object.keys(this.attacks)[0]) {
      attackPower += 2;
      stun = true;
      duration = 2000;
    } else if (arrEnemyQueue[0] === Object.keys(this.attacks)[1]) {
      attackPower += 3;
    } else if (arrEnemyQueue[0] === Object.keys(this.attacks)[2]) {
      attackPower += 2;
      stun = true;
      duration = 2000;
    }
    enemyAttackMegaChecker(this, Player, attackPower, stun, duration);
  }
}
