"use strict";

function generateEnemy() {
  const randomNumber = Math.floor(Math.random() * 3);
  switch (randomNumber) {
    case 0:
      switch (currentStage) {
        case 1:
          currentEnemy = new EnemyBalancedEasy(
            20,
            20,
            2,
            0.9,
            80,
            0,
            {
              "images/enemy_attack1a.png": "\nDamage *",
              "images/enemy_attack2a.png": "\nDamage **",
              "images/enemy_attack3a.png": "\nDamage ***",
            },
            "Mole",
            "images/stage1_balanced.gif"
          );
          break;
        case 2:
          currentEnemy = new EnemyBalancedEasy(
            25,
            25,
            3,
            0.9,
            75,
            0,
            {
              "images/enemy_attack1a.png": "\nDamage *",
              "images/enemy_attack2a.png": "\nDamage **",
              "images/enemy_attack3a.png": "\nDamage ***",
            },
            "Skull Spider",
            "images/stage2_balanced.gif"
          );
          break;
        case 3:
          currentEnemy = new EnemyBalanced3(
            35,
            35,
            4,
            0.9,
            70,
            0,
            {
              "images/enemy_attack2a.png": "\nDamage **",
              "images/enemy_attackstun1a.png": "\nDamage *\nStun 1s",
              "images/enemy_attack3a.png": "\nDamage ***",
            },
            "Warlock",
            "images/stage3_balanced.gif"
          );
          break;
        case 4:
          currentEnemy = new EnemyBalanced4(
            45,
            45,
            6,
            0.9,
            65,
            0,
            {
              "images/enemy_attack2a.png": "\nDamage **",
              "images/enemy_attackstun2a.png": "\nDamage **\nStun 2s",
              "images/enemy_attack3a.png": "\nDamage ***",
            },
            "Chimera",
            "images/stage4_balanced.gif",
            { berserk: false }
          );
          break;
        case 5:
          currentEnemy = new EnemyBalanced5(
            65,
            65,
            7,
            0.7,
            60,
            0,
            {
              "images/enemy_attackstun2a.png": "\nDamage **\nStun 2s",
              "images/enemy_attack3a.png": "\nDamage ***",
              "images/enemy_attack3b.png": "\nDamage ***",
            },
            "Red Wyrm",
            "images/stage5_balanced.gif",
            { berserk: false }
          );
      }
      break;

    case 1:
      switch (currentStage) {
        case 1:
          currentEnemy = new EnemyFastEasy(
            15,
            15,
            1,
            1,
            60,
            0,
            {
              "images/enemy_attack1a.png": "\nDamage *",
              "images/enemy_attack2a.png": "\nDamage **",
              "images/enemy_attack2b.png": "\nDamage **",
            },
            "Bat",
            "images/stage1_fast.gif"
          );
          break;
        case 2:
          currentEnemy = new EnemyFastEasy(
            20,
            20,
            2,
            1,
            55,
            0,
            {
              "images/enemy_attack1a.png": "\nDamage *",
              "images/enemy_attack2a.png": "\nDamage **",
              "images/enemy_attack2b.png": "\nDamage **",
            },
            "Night Mare",
            "images/stage2_fast.gif"
          );
          break;
        case 3:
          currentEnemy = new EnemyFast3(
            30,
            30,
            3,
            1,
            50,
            0,
            {
              "images/enemy_attack2a.png": "\nDamage **",
              "images/enemy_attackstun1a.png": "\nDamage *\nStun 1s",
              "images/enemy_attackstun1b.png": "\nDamage *\nStun 1s",
            },
            "Overlord",
            "images/stage3_fast.gif"
          );
          break;
        case 4:
          currentEnemy = new EnemyFast4(
            40,
            40,
            5,
            1,
            45,
            0,
            {
              "images/enemy_attackstun2a.png": "\nDamage **\nStun 2s",
              "images/enemy_attack1a.png": "\nDamage *",
              "images/enemy_attack3a.png": "\nDamage ***",
            },
            "Abyss Worm",
            "images/stage4_fast.gif",
            { berserk: false }
          );
          break;
        case 5:
          currentEnemy = new EnemyFast5(
            60,
            60,
            6,
            0.8,
            40,
            0,
            {
              "images/enemy_attackstun2a.png": "\nDamage **\nStun 2s",
              "images/enemy_attack3a.png": "\nDamage ***",
              "images/enemy_attackstun2b.png": "\nDamage **\nStun 2s",
            },
            "Blue Wyrm",
            "images/stage5_fast.gif",
            { berserk: false }
          );
      }
      break;

    case 2:
      switch (currentStage) {
        case 1:
          currentEnemy = new EnemySlowEasy(
            25,
            25,
            5,
            0.8,
            100,
            0,
            {
              "images/enemy_attack2a.png": "\nDamage **",
              "images/enemy_attack3a.png": "\nDamage ***",
              "images/enemy_attack3b.png": "\nDamage ***",
            },
            "Rat",
            "images/stage1_slow.gif"
          );
          break;
        case 2:
          currentEnemy = new EnemySlowEasy(
            30,
            30,
            6,
            0.8,
            95,
            0,
            {
              "images/enemy_attack2a.png": "\nDamage **",
              "images/enemy_attack3a.png": "\nDamage ***",
              "images/enemy_attack3b.png": "\nDamage ***",
            },
            "Giant",
            "images/stage2_slow.gif"
          );
          break;
        case 3:
          currentEnemy = new EnemySlow3(
            40,
            40,
            7,
            0.8,
            90,
            0,
            {
              "images/enemy_attackstun2a.png": "\nDamage **\nStun 2s",
              "images/enemy_attack3a.png": "\nDamage ***",
              "images/enemy_attackstun2b.png": "\nDamage **\nStun 2s",
            },
            "Ogre",
            "images/stage3_slow.gif"
          );
          break;
        case 4:
          currentEnemy = new EnemySlow4(
            50,
            50,
            9,
            0.8,
            85,
            0,
            {
              "images/enemy_attackstun2a.png": "\nDamage **\nStun 2s",
              "images/enemy_attackstun3a.png": "\nDamage ***\nStun 3s",
              "images/enemy_attackstun2b.png": "\nDamage **\nStun 2s",
            },
            "Arch Fiend",
            "images/stage4_slow.gif",
            { berserk: false }
          );
          break;
        case 5:
          currentEnemy = new EnemySlow5(
            70,
            70,
            10,
            0.6,
            80,
            0,
            {
              "images/enemy_attackstun3a.png": "\nDamage ***\nStun 3s",
              "images/enemy_attackstun3b.png": "\nDamage ***\nStun 3s",
              "images/enemy_attackstun3c.png": "\nDamage ***\nStun 3s",
            },
            "Golden Wyrm",
            "images/stage5_slow.gif",
            { berserk: false }
          );
      }
  }
}
