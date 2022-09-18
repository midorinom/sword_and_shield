"use strict";

// ====================================
// Function that Creates Enemy Instance
// ====================================
function generateEnemy() {
  // Chooses between 1 of 3 enemy types (Balanced, Fast, Slow), then checks for the currentStage and generate the corresponding enemy
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
              "images/enemy_attack1a.png": "Damage *",
              "images/enemy_attack2a.png": "Damage **",
              "images/enemy_attack3a.png": "Damage ***",
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
              "images/enemy_attack1a.png": "Damage *",
              "images/enemy_attack2a.png": "Damage **",
              "images/enemy_attack3a.png": "Damage ***",
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
              "images/enemy_attack2a.png": "Damage **",
              "images/enemy_attackstun1a.png": "Damage *\nStun 1s",
              "images/enemy_attack3a.png": "Damage ***",
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
              "images/enemy_attack2a.png": "Damage **",
              "images/enemy_attackstun2a.png": "Damage **\nStun 1.5s",
              "images/enemy_attack3a.png": "Damage ***",
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
            65,
            0,
            {
              "images/enemy_attackstun2a.png": "Damage **\nStun 1.5s",
              "images/enemy_attack3a.png": "Damage ***",
              "images/enemy_attack3b.png": "Damage ***",
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
              "images/enemy_attack1a.png": "Damage *",
              "images/enemy_attack2a.png": "Damage **",
              "images/enemy_attack2b.png": "Damage **",
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
              "images/enemy_attack1a.png": "Damage *",
              "images/enemy_attack2a.png": "Damage **",
              "images/enemy_attack2b.png": "Damage **",
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
              "images/enemy_attack2a.png": "Damage **",
              "images/enemy_attackstun1a.png": "Damage *\nStun 1s",
              "images/enemy_attackstun1b.png": "Damage *\nStun 1s",
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
            50,
            0,
            {
              "images/enemy_attackstun2a.png": "Damage **\nStun 1.5s",
              "images/enemy_attack1a.png": "Damage *",
              "images/enemy_attack3a.png": "Damage ***",
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
            50,
            0,
            {
              "images/enemy_attackstun2a.png": "Damage **\nStun 1.5s",
              "images/enemy_attack3a.png": "Damage ***",
              "images/enemy_attackstun2b.png": "Damage **\nStun 1.5s",
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
            30,
            30,
            5,
            0.8,
            100,
            0,
            {
              "images/enemy_attack2a.png": "Damage **",
              "images/enemy_attack3a.png": "Damage ***",
              "images/enemy_attack3b.png": "Damage ***",
            },
            "Rat",
            "images/stage1_slow.gif"
          );
          break;
        case 2:
          currentEnemy = new EnemySlowEasy(
            35,
            35,
            6,
            0.8,
            95,
            0,
            {
              "images/enemy_attack2a.png": "Damage **",
              "images/enemy_attack3a.png": "Damage ***",
              "images/enemy_attack3b.png": "Damage ***",
            },
            "Giant",
            "images/stage2_slow.gif"
          );
          break;
        case 3:
          currentEnemy = new EnemySlow3(
            45,
            45,
            7,
            0.8,
            90,
            0,
            {
              "images/enemy_attackstun2a.png": "Damage **\nStun 1.5s",
              "images/enemy_attack3a.png": "Damage ***",
              "images/enemy_attackstun2b.png": "Damage **\nStun 1.5s",
            },
            "Ogre",
            "images/stage3_slow.gif"
          );
          break;
        case 4:
          currentEnemy = new EnemySlow4(
            55,
            55,
            9,
            0.8,
            85,
            0,
            {
              "images/enemy_attackstun2a.png": "Damage **\nStun 1.5s",
              "images/enemy_attackstun3a.png": "Damage ***\nStun 2s",
              "images/enemy_attackstun2b.png": "Damage **\nStun 1.5s",
            },
            "Arch Fiend",
            "images/stage4_slow.gif",
            { berserk: false }
          );
          break;
        case 5:
          currentEnemy = new EnemySlow5(
            75,
            75,
            10,
            0.6,
            80,
            0,
            {
              "images/enemy_attackstun3a.png": "Damage ***\nStun 2s",
              "images/enemy_attackstun3b.png": "Damage ***\nStun 2s",
              "images/enemy_attackstun3c.png": "Damage ***\nStun 2s",
            },
            "Golden Wyrm",
            "images/stage5_slow.gif",
            { berserk: false }
          );
      }
  }
}
