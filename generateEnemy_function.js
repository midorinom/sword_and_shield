"use strict";

function generateEnemy() {
  const randomNumber = Math.floor(Math.random() * 3);
  switch (randomNumber) {
    case 0:
      switch (currentStage) {
        case 1:
          currentEnemy = new EnemyBalancedEasy(
            10,
            10,
            1,
            1,
            30,
            0,
            {
              "images/enemy_attack1.png": "Scratch:\nDamage *",
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
              "images/enemy_attack3.webp": "Stomp:\nDamage ***",
            },
            "Mole",
            "images/stage1_balanced.gif"
          );
          break;
        case 2:
          currentEnemy = new EnemyBalancedEasy(
            20,
            20,
            1,
            1,
            30,
            0,
            {
              "images/enemy_attack1.png": "Scratch:\nDamage *",
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
              "images/enemy_attack3.webp": "Stomp:\nDamage ***",
            },
            "Skull Spider",
            "images/stage2_balanced.gif"
          );
          break;
        case 3:
          currentEnemy = new EnemyBalancedHard(
            30,
            30,
            1,
            1,
            30,
            0,
            {
              "images/enemy_attack1.png": "Scratch:\nDamage *",
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
              "images/enemy_attack3.webp": "Stomp:\nDamage ***",
            },
            "Warlock",
            "images/stage3_balanced.gif"
          );
          break;
        case 4:
          currentEnemy = new EnemyBalancedHard(
            40,
            40,
            1,
            1,
            30,
            0,
            {
              "images/enemy_attack1.png": "Scratch:\nDamage *",
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
              "images/enemy_attack3.webp": "Stomp:\nDamage ***",
            },
            "Chimera",
            "images/stage4_balanced.gif", {berserk: false});
          break;
        case 5:
          currentEnemy = new EnemyBalancedHard(
            50,
            50,
            1,
            1,
            30,
            0,
            {
              "images/enemy_attack1.png": "Scratch:\nDamage *",
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
              "images/enemy_attack3.webp": "Stomp:\nDamage ***",
            },
            "Red Wyrm",
            "images/stage5_balanced.gif", {berserk: false});
      }
      break;

    case 1:
      switch (currentStage) {
        case 1:
          currentEnemy = new EnemyFastEasy(
            10,
            10,
            1,
            1,
            30,
            0,
            {
              "images/enemy_attack1.png": "Scratch:\nDamage *",
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
              "images/enemy_attack3.webp": "Stomp:\nDamage ***",
            },
            "Bat",
            "images/stage1_fast.gif"
          );
          break;
        case 2:
          currentEnemy = new EnemyFastEasy(
            20,
            20,
            1,
            1,
            30,
            0,
            {
              "images/enemy_attack1.png": "Scratch:\nDamage *",
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
              "images/enemy_attack3.webp": "Stomp:\nDamage ***",
            },
            "Night Mare",
            "images/stage2_fast.gif"
          );
          break;
        case 3:
          currentEnemy = new EnemyFastHard(
            30,
            30,
            1,
            1,
            30,
            0,
            {
              "images/enemy_attack1.png": "Scratch:\nDamage *",
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
              "images/enemy_attack3.webp": "Stomp:\nDamage ***",
            },
            "Overlord",
            "images/stage3_fast.gif"
          );
          break;
        case 4:
          currentEnemy = new EnemyFastHard(
            40,
            40,
            1,
            1,
            30,
            0,
            {
              "images/enemy_attack1.png": "Scratch:\nDamage *",
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
              "images/enemy_attack3.webp": "Stomp:\nDamage ***",
            },
            "Abyss Worm",
            "images/stage4_fast.gif", {berserk: false});
          break;
        case 5:
          currentEnemy = new EnemyFastHard(
            50,
            50,
            1,
            1,
            30,
            0,
            {
              "images/enemy_attack1.png": "Scratch:\nDamage *",
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
              "images/enemy_attack3.webp": "Stomp:\nDamage ***",
            },
            "Blue Wyrm",
            "images/stage5_fast.gif", {berserk: false});
      }
      break;

    case 2:
      switch (currentStage) {
        case 1:
          currentEnemy = new EnemySlowEasy(
            10,
            10,
            1,
            1,
            30,
            0,
            {
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
              "images/enemy_attack3.webp": "Stomp:\nDamage ***",
              "images/enemy_attack1.png": "Scratch:\nDamage *",
            },
            "Rat",
            "images/stage1_slow.gif"
          );
          break;
        case 2:
          currentEnemy = new EnemySlowEasy(
            20,
            20,
            1,
            1,
            30,
            0,
            {
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
              "images/enemy_attack3.webp": "Stomp:\nDamage ***",
              "images/enemy_attack1.png": "Scratch:\nDamage *",
            },
            "Giant",
            "images/stage2_slow.gif"
          );
          break;
        case 3:
          currentEnemy = new EnemySlowHard(
            30,
            30,
            1,
            1,
            30,
            0,
            {
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
              "images/enemy_attack3.webp": "Stomp:\nDamage ***",
              "images/enemy_attack1.png": "Scratch:\nDamage *",
            },
            "Ogre",
            "images/stage3_slow.gif"
          );
          break;
        case 4:
          currentEnemy = new EnemySlowHard(
            40,
            40,
            1,
            1,
            30,
            0,
            {
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
              "images/enemy_attack3.webp": "Stomp:\nDamage ***",
              "images/enemy_attack1.png": "Scratch:\nDamage *",
            },
            "Arch Fiend",
            "images/stage4_slow.gif", {berserk: false});
          break;
        case 5:
          currentEnemy = new EnemySlowHard(
            50,
            50,
            1,
            1,
            30,
            0,
            {
              "images/enemy_attack2.webp": "Swipe:\nDamage **",
              "images/enemy_attack3.webp": "Stomp:\nDamage ***",
              "images/enemy_attack1.png": "Scratch:\nDamage *",
            },
            "Golden Wyrm",
            "images/stage5_slow.gif", {berserk: false});
      }
  }
}
