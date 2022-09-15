"use strict";

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
    playerIsStunned(5000);
    if (arrEnemyQueue[0] === Object.keys(this.attacks)[1]) {
      attackPower += 1;
    } else if (arrEnemyQueue[0] === Object.keys(this.attacks)[2]) {
      attackPower += 2;
    }
    enemyAttackMegaChecker(this, Player, attackPower);
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
    playerIsStunned(5000);
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
    playerIsStunned(5000);
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
