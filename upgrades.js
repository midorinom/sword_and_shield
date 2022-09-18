"use strict";

// ==============================
// Generating the Upgrade Choices
// ==============================
// Determining the two upgrades
function determineTwoRandomUpgrades() {
  // Get two random numbers between 0 to 99
  const randomNumber1 = Math.floor(Math.random() * 100);
  const randomNumber2 = Math.floor(Math.random() * 100);

  // For the stage 1 and 2 Upgrade Screen (both choices are stat upgrades)
  if (currentStage < 3) {
    // If either random number rolls the 16% chance for Action Gauge Speed +
    if (randomNumber1 < 16 || randomNumber2 < 16) {
      // Assign the left upgrade to be Action Gauge Speed +
      randomUpgrade1 = Object.keys(upgrades.stages12Upgrades)[0];
      // Assign the right upgrade to be a random one among the remaining 3 options (equal  odds)
      randomUpgrade2 = Object.keys(upgrades.stages12Upgrades)[
        Math.ceil(Math.random() * 3)
      ];
    }
    // If the player did not roll 16% on either random number
    else {
      // There will not be Action Gauge Speed + so there are only 3 possible permutations
      // Roll a random number between 0 to 2 and assign the respective permutation of upgrades
      const randomNumber3 = Math.floor(Math.random() * 3);
      switch (randomNumber3) {
        case 0:
          randomUpgrade1 = Object.keys(upgrades.stages12Upgrades)[1];
          randomUpgrade2 = Object.keys(upgrades.stages12Upgrades)[2];
          break;
        case 1:
          randomUpgrade1 = Object.keys(upgrades.stages12Upgrades)[1];
          randomUpgrade2 = Object.keys(upgrades.stages12Upgrades)[3];
          break;
        case 2:
          randomUpgrade1 = Object.keys(upgrades.stages12Upgrades)[2];
          randomUpgrade2 = Object.keys(upgrades.stages12Upgrades)[3];
      }
    }
  }
  // For the stage 3 and 4 Upgrade Screens (left choice is stat upgrade, right choice is special upgrade)
  else {
    // Check if the first number rolled the 16% for Action Gauge Speed +
    if (randomNumber1 < 16) {
      // Assign the left upgrade to Action Gauge Speed +
      randomUpgrade1 = Object.keys(upgrades.stages12Upgrades)[0];
    }
    // The first number did not roll the 16%, so it will be a random upgrade among the remaining 3 (equal odds)
    else {
      randomUpgrade1 = Object.keys(upgrades.stages12Upgrades)[
        Math.ceil(Math.random() * 3)
      ];
    }
    // For the right choice in Stage 3, all 4 special upgrades are available in the pool
    if (currentStage === 3) {
      // All 4 upgrades have equal odds of appearing, so just roll a random number from 0 to 3
      randomUpgrade2 = Object.keys(upgrades.stages34Upgrades)[
        Math.floor(Math.random() * 4)
      ];
    }
    // For the right choice in Stage 4, only 3/4 of the special upgrades remain in the pool
    else if (currentStage === 4) {
      // Make an array containing the 4 special upgrades by taking them from the upgrades class
      const poolOfUpgrades = [...Object.keys(upgrades.stages34Upgrades)];
      // Iterate through this array to find a match for the upgrade that the player chose in stage 3
      // That upgrade would be stored in arrUpgrades[2]. Remove that upgrade from the poolOfUpgrades array
      for (let i = 0; i < 4; i++) {
        if (poolOfUpgrades[i] === arrUpgrades[2]) {
          poolOfUpgrades.splice(i, 1);
        }
      }
      // The poolOfUpgrades array now only contain the remaining available 3 upgrades in the pool
      // All 3 upgrades have equal odds of appearing so just use a random number from 0 to 2 to determine the right choice
      randomUpgrade2 = poolOfUpgrades[Math.floor(Math.random() * 3)];
    }
  }
  // Update the images with the 2 random upgrades that have been determined
  upgradesImage1.src = randomUpgrade1;
  upgradesImage2.src = randomUpgrade2;

  // Update the descriptions of the 2 upgrades by using the getUpgradeDescription function in the upgrades class
  upgradesDescription1.innerText =
    upgrades.getUpgradeDescription(randomUpgrade1);

  upgradesDescription2.innerText =
    upgrades.getUpgradeDescription(randomUpgrade2);
}

// ==============================================
// Event Listeners for Clicking on Upgrade Images
// ==============================================
// Show/hide the upgrade description
function showUpgradesDescription1() {
  upgradesDescription1.style.display = "flex";
}
function hideUpgradesDescription1() {
  upgradesDescription1.style.display = "none";
}
function showUpgradesDescription2() {
  upgradesDescription2.style.display = "flex";
}
function hideUpgradesDescription2() {
  upgradesDescription2.style.display = "none";
}

// When the left upgrade is clicked on
function selectUpgrade1Image() {
  // In case the right upgrade was selected already:
  // Down size it, set the state of upgrades2Selected to false, hide the description
  upgradesImage2.style.height = 30 + "%";
  upgradesImage2.style.width = 15 + "%";
  upgrades2Selected = false;
  hideUpgradesDescription2();

  // If the left upgrade was not already selected
  if (upgrades1Selected === false) {
    // Upsize it, set the state of upgrades1Selected to true, show the description
    upgradesImage1.style.height = 50 + "%";
    upgradesImage1.style.width = 20 + "%";
    upgrades1Selected = true;
    showUpgradesDescription1();
    // Assign the chosenUpgrade variable
    chosenUpgrade = randomUpgrade1;
    // If the left upgrade was already selected
  } else {
    // Downsize it, set the state of upgrades1Selected to false, hide the description
    upgradesImage1.style.height = 30 + "%";
    upgradesImage1.style.width = 15 + "%";
    upgrades1Selected = false;
    hideUpgradesDescription1();
    // Un-assign the chosenUpgrade variable
    chosenUpgrade = "notSelected";
  }
}

// When the right upgrade is clicked on
function selectUpgrade2Image() {
  // In case the left upgrade was selected already:
  // Down size it, set the state of upgrades1Selected to false, hide the description
  upgradesImage1.style.height = 30 + "%";
  upgradesImage1.style.width = 15 + "%";
  upgrades1Selected = false;
  hideUpgradesDescription1();

  // If the right upgrade was not already selected
  if (upgrades2Selected === false) {
    // Upsize it, set the state of upgrades2Selected to true, show the description
    upgradesImage2.style.height = 50 + "%";
    upgradesImage2.style.width = 20 + "%";
    upgrades2Selected = true;
    showUpgradesDescription2();
    // Assign the chosenUpgrade variable
    chosenUpgrade = randomUpgrade2;
    // If the right upgrade was already selected
  } else {
    // Downsize it, set the state of upgrades1Selected to false, hide the description
    upgradesImage2.style.height = 30 + "%";
    upgradesImage2.style.width = 15 + "%";
    upgrades2Selected = false;
    hideUpgradesDescription2();
    // Un-assign the chosenUpgrade variable
    chosenUpgrade = "notSelected";
  }
}

// ================================
// Event Listener for Submit Button
// ================================
function upgradesSubmitButton() {
  // if no upgrade has been chosen, prompt the user to select an upgrade
  if (chosenUpgrade === "notSelected") {
    alert("Please select an upgrade");
  }
  // An upgrade has been selected
  else {
    // If the upgrade is a stat upgrade, activate its effects using the activateUpgrade function in the upgrades class
    upgrades.activateUpgrade(chosenUpgrade, player);

    // Add the chosenUpgrade into the arrUpgrades array
    arrUpgrades.push(chosenUpgrade);

    // Update the inventory images with the respective upgrade that has been chosen at every stage
    switch (currentStage) {
      case 1:
        document.querySelector("#upgrades_inventory_image1").src =
          chosenUpgrade;
        document.querySelector("#upgrades_inventory_image1").style.display =
          "block";
        break;
      case 2:
        document.querySelector("#upgrades_inventory_image2").src =
          chosenUpgrade;
        document.querySelector("#upgrades_inventory_image2").style.display =
          "block";
        break;
      case 3:
        document.querySelector("#upgrades_inventory_image3").src =
          chosenUpgrade;
        document.querySelector("#upgrades_inventory_image3").style.display =
          "block";
        break;
      case 4:
        document.querySelector("#upgrades_inventory_image4").src =
          chosenUpgrade;
        document.querySelector("#upgrades_inventory_image4").style.display =
          "block";
    }

    // --- Reset the state of affairs in the Upgrade Screen, so that it can be re-used in the next stage ---
    // Hide the descriptions of both upgrade choices and down size the images
    hideUpgradesDescription1();
    upgrades1Selected = false;
    upgradesImage1.style.height = 30 + "%";
    upgradesImage1.style.width = 15 + "%";
    hideUpgradesDescription2();
    upgrades2Selected = false;
    upgradesImage2.style.height = 30 + "%";
    upgradesImage2.style.width = 15 + "%";
    // Un-assign the chosenUpgrade variable
    chosenUpgrade = "notSelected";
    // Remove the click event listeners on the upgrade choices
    upgradesImage1.removeEventListener("click", selectUpgrade1Image);
    upgradesImage2.removeEventListener("click", selectUpgrade2Image);
    // Hide the upgrade screen
    upgradesContainer.style.display = "none";

    // --- Moving on to the next stage ---
    // Increment the currentStage variable and generate the enemy for the next stage
    currentStage += 1;
    generateEnemy();

    // Start the next stage
    startStage(player, currentEnemy);

    // Start up the Continuous Events
    autoPlayerActionGauge = setInterval(() => {
      playerContinuousEvents(currentEnemy);
    }, player.agility);
    autoEnemyActionGauge = setInterval(() => {
      enemyContinuousEvents(currentEnemy);
    }, currentEnemy.agility);
  }
}
