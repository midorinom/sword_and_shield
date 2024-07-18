# Sword and Shield

## Table of Contents
* [Introduction](#Introduction)
* [Pictures](#Pictures)
* [Technologies Used](#Technologies)
* [Broad Game Overview](#Overview)
* [Game Features](#Features)
    * [Health Points](#Health)
    * [Action Gauges & Continuous Functions](#ActionGauge)
    * [Text Log](#TextLog)
    * [Player Attack](#PlayerAttack)
    * [Player Defend](#PlayerDefend)
    * [Enemy Attack](#EnemyAttack)
    * [Parry](#Parry)
    * [Enemy Queue](#EnemyQueue)
    * [Enemy Attack Pool](#EnemyAttackPool)
    * [Enemy Types](#EnemyTypes)
    * [Upgrades](#Upgrades)
    * [Pause/Unpause](#Pause)
* [Ideas for More Content](#Ideas)

<a name="Introduction"></a>
## Introduction

This game project was created as part of General Assembly's Software Engineering Immersive course. The requirement was to make a finished game using HTML, CSS and Javascript. The game is deployed <a href ="https://sword-and-shield.vercel.app" target="_blank">here</a> on Vercel.

When brainstorming for ideas, I figured that making some sort of RPG game would be the best approach. For a RPG game, it would be easy to think up ways of incorporating the various concepts that I have learned in the course such as classes, arrays, objects and events. In particular, a turn-based game sounded like a great idea as there would be no character movement or map generation required. The focus would be on stats and combat, which seemed manageable enough for a first-ever coding project.

In this document I will explain the rationale behind the game design of various features as well as the codes that make them work.

I do not own any of the assets and images that I used in this project, I obtained them from free sources online which I have credited in this [asset_credits.txt](asset_credits.txt) file.

<a name="Pictures"></a>
## Pictures
### Home Page
<img src="/images/readme/Instructions.png" alt="Home Page" title="Home Page">

### Gameplay
<img src="/images/readme/Gameplay.png" alt="Gameplay" title="Gameplay">

<a name="Technologies"></a>
## Technologies Used
<div style="display:flex">
<img src="/images/readme/Javascript.png" alt="Javascript" title="Javascript">
<img src="/images/readme/HTML.png" alt="HTML" title="HTML">
<img src="/images/readme/CSS.png" alt="CSS" title="CSS">
<img src="/images/readme/Vercel.png" alt="Vercel" title="Vercel">
</div>

<a name="Overview"></a>
## Broad Game Overview

The goal of the game is to beat all 5 stages and not have health points be reduced to 0.

The gameplay mainly revolves around the 2 actions of Attacking and Defending. Attacking deals damage while defending reduces the damage taken by enemy attacks. Taking an action requires 1 bar of Action Gauge, which is a resource that naturally fills up over time. The enemy also has an Action Gauge, which it will automatically consume to attack the player whenever the gauge is full.

The Defend action puts the player into a a defensive stance. If the player is attacked by the enemy while in this defensive stance, the player will get to play a quick minigame. There is a time limit for the minigame and if the player were to successfully clear the minigame, the enemy's attack would be parried entirely, with the player taking no damage and also launching a counterattack. If the player fails the minigame, the player would take only 30% of the damage (as a result of defending) but will not parry. The time limit for the parry minigame can be changed for easier/harder difficulty.

After clearing each stage, the player is presented with the opportunity to select a permanent upgrade. It will be a choice between 2 random options, with the stronger upgrades either being rarer or only appearing in later stages.

As the player gets stronger with each stage, so too does the enemy, with enemies in later stages also having attacks that can stun. Being stunned would result in the Action Gauge being frozen and not filling until the stun duration is over. Also, enemies in later stages enter into a berserk mode when they fall below 50% health, gaining increased stats and a faster Action Gauge. This makes the second half of the fight more intense and also makes defeating the enemy more satisfying when the player is able to overcome the berserk phase.

The next 3 attacks to be used by the enemy are displayed in a queue on the screen, with descriptions of the attacks' damage and stun duration being shown when the enemy's attack queue is hovered over.

Attacks are chosen at random, with some attacks having higher probabilities of being chosen than others. Enemies themselves are also randomised, with each stage having 3 possible enemies that could be encountered, for a total of 15 possible enemies in the game. Each enemy has different stats and attack pools.

Randomness is also introduced in the damage calculations, with the basic damage formula being a 80-120% damage spread. There are also upgrades which involve probability-based effects, such as critical hits.

The game also includes a text log at the bottom of the screen that logs every instance of combat. This text log displays useful information such as the damage dealt/taken by either side, successful parries, stun duration (if applicable) and when the enemy enters berserk mode.

<a name="Features"></a>
## Game Features

My vision of the game was one that would be (1) sufficiently challenging, (2) have replayability and (3) have simple systems. These goals guided many of my game design decisions, which I will further elaborate upon when explaining all the game features. Apart from the game design aspect, I will also explain in-depth how the codes work for each feature.

<a name="Health"></a>
### Health Points

The player and enemy health points are stored within their respective class instances. Whenever either side takes damage, the health points will be subtracted from the class instance and then the `updateHp` function will be called. This function updates the hp number value on the screen to reflect the post-combat hp values. The function also calculates the percentage of the `current hp` / `max hp` and then visually reflects it on the hp bar with 100% being a full bar. Also, this function checks for whether the hp percentage falls under the breakpoints of 75%, 50% and 25% and then changes the colour of the hp bar from blue > green > yellow > red.

<a name="ActionGauge"></a>
### Action Gauges & Continuous Functions

The filling of the action gauges are a result of the continuous `setInterval` functions of `autoPlayerActionGauge` and `autoEnemyActionGauge`. The speed at which these intervals repeat is decided by the `agility` stat within the player/enemy class. These functions contain the `fillPlayerActionGauge` and `fillEnemyActionGauge` functions which simply increase the `actionGaugeCounter` within the player/enemy class. The height of the action gauge bar is then set to be equivalent to the `actionGaugeCounter` value, with 100 being a full bar and 200 being 2 full barss.

To reflect 1 bar being expended, the `actionGaugeCounter` within the player/enemy class is subtracted by 100 whenever the player/enemy uses an action. The change in height of the action gauge would then be shown almost immediately due to how frequently the continuous functions repeat every second.

Apart from being responsible for filling the action gauges, the continuous functions also check for whether either party is dead. If the player is dead, the loss screen will be shown whileif the enemy is dead, either the upgrade screen or victory screen(if it is the last stage) will be shown. For stages 4 and 5, the continuous function `autoEnemyActionGauge` also checks for whether the enemy has fallen below 50% `hp` and if so, makes the enemy go berserk.

<a name="TextLog"></a>
### Text Log

The `updateTextLog` function displays the contents of the 4 items in the `textLog` array onto the 4 textlog lines on the screen. At the start of every stage, the `textLog` will be set to contain 4 empty strings of `""` which will display 4 empty textlog lines. Combat-related functions will `unshift` new text into the start of the array and then `pop` off the text at the end of the array. The new textlog configuration will then be displayed onto the screen with `updateTextLog` after the array is modified.

<a name="PlayerAttack"></a>
### Player Attack

The `attackButtonSelected` function is used for the `click` event listener of the attack button. When clicked on, the button is upsized if it wasn't already selected beforehand. If it was already selected, clicking on the button would instead de-select it and the button would be downsized. If the player does not have 1 bar of action gauge and thus cannot execute the attack yet, the button stays upsized and only downsizes after the attack is executed. Also, if the defend button was clicked already, clicking the attack button would downsize the defend button. To know whether either of the buttons is already clicked, the code checks for the boolean value of the `actionSelected.attack` and `actionSelected.defend` variables within the player class.

The continuous function of `autoPlayerActionGauge` is what constantly checks for whether the attack button is selected and if the player has 1 bar of action gauge, the function executes the `attack` function within the player class. The `attack` function then runs through a long check for conditions such as whether the player has the doublehit or critical upgrades and whether the player rolled a critical hit on each attack. The function does all the appropriate damage calculations, playing the appropriate attack animation, update the textlog, update the enemy hp after the player's attack animation finishes and return the player back to its idle animation.

<a name="PlayerDefend"></a>
### Player Defend

The `click` event listener for the defend button works the exact same way as the attack button, just with a different function of `defendButtonSelected`. The main variable in the player class that is referred to is `actionSelected.defend`.

Same with attacking, the continuous function of `autoPlayerActionGauge` checks for whether the defend button is selected and that the player has 1 bar of action gauge. It then executes the `defend` function within the player class. This `defend` function plays the defend animation to visually show the player being in a defensive stance and importantly, sets the `status.defendStance` variable within the player class to true. This boolean value is then checked by the enemy's `attack` function when the enemy attacks.

<a name="EnemyAttack"></a>
### Enemy Attack

When the enemy's action gauge is full, the `fillEnemyActionGauge` function automatically executes the `attack` function within the enemy class. The function first determines which attack is next in the queue by checking `arrEnemyQueue[0]` against the keys stored in the enemy's class `.attacks` key-value pair. The appropriate `attackPower`, `stun` and `duration` are then taken into account and passed into the `enemyAttackMegaChecker` do-all function.

This `enemyAttackMegaChecker` function checks for whether the player is defending and if so, executes the `parryMiniGame` function. Otherwise, the enemy's attack will be resolved. Stuns will be applied (if any), the textlog and post-combat hp values will be updated.

<a name="Parry"></a>
### Parry

The parry mechanic is core to this game's identity as the game balance heavily revolves around it. The difficulty of the game I had in mind was for the game to be clearable only if the player presses the defend button in time for 80% of the enemy attacks and successfully clears the parry minigame 50% of the time. Parrying gains increasing importance in later stages when enemy attacks start to stun, as parrying is the only way to avoid getting stunned. Also, parrying is epecially important for getting through the stages 4 and 5 berserk phase without losing too much health.

I have balanced the numbers of player and enemy stats, enemy attacks, berserk buff, and upgrades around my personal experience of testing the game with a 80% defend and 50% parry rate. That is also the reason for why I added the option to adjust the parry timer as the default 1.6s timer may be too difficult for some to achieve a 50% parry rate, which would then make the game expontentially more difficult for them.

The reason for having two minigames is to add some variety and a small extra layer of complexity as the two minigames require different motor skills/hand-eye coordination as well as different peripheral devices.

The codes for the `click` event listeners for setting the parry timer are all contained within the "Change Parry Timer" heading in the [functions3.js](functions3.js) file. The only thing of note here is that the `parryTimerSetting` variable is utilised by the `parryMiniGame` function where the timer duration is then determined. As for the parry minigames themselves, the codes are self-explanatory and can easily be found as they are contained within one big `parryMiniGame` function, with an entire [parry_function.js](parry_function.js) file being dedicated to this one function as well.

<a name="EnemyQueue"></a>
### Enemy Queue

The enemy class contains a key-value pair called `.attacks` which includes in the key, the image link of the attack image, and in the value, the description text of the attack. This key-value pair is used to create the enemy queue.

At the start of every stage, the `first3EnemyAttacks` function is executed which determines 3 random enemy attacks and `pushes` the respective image links of the attacks from the key of `.attacks` into the `arrEnemyQueue` array. The images of the 3 attacks in the enemy queue on the screen are then updated via the `updateEnemyQueue` function, which sets the image `src` of the 3 enemy queue images to be the 3 items in the `arrEnemyQueue`.

The description text of the attacks are updated by the `updateEnemyAttackDescriptions` function which is refreshed repeatedly by the enemy continuous function `autoEnemyActionGauge`. The `mouseover` and `mouseout` event listeners which execute the `showEnemyAttackDescription` and `hideEnemyAttackDescription` respectively shows the description when the image is hovered over, and hides it when the cursor is moved away.

The enemy's queue is managed in the `enemyAttackMegaChecker` function which executes whenever the enemy attacks. Within `enemyAttackMegaChecker`, the `moveEnemyQueueAlong` function is executed which `shifts` out the first item in the `arrEnemyQueue` array as that attack had just been used by the enemy. Then, a new attack is determined randomly and then `pushed` into the array and the enemy queue images are refreshed with the `updateEnemyQueue` function.

<a name="EnemyAttackPool"></a>
### Enemy Attack Pool

For the enemy's 3 attacks in the enemy class's `.attacks` key-value pair, I have assigned the probabilities of 60% to the first attack, 30% to the second and 10% to the third. These probabilities are put into effect in the `first3EnemyAttacks` and `updateEnemyQueue` functions when determining the next attacks to be used by the enemy.

The probabilities make intuitive sense when looking at enemies that have 3 different attacks. However, an attack can also have a higher probability than 60 / 30 / 10 if it is duplicated in the `.attacks` key-value pair. The same attack being put in both the first and third slots would essentially make it have a 70% probability of appearing. The only issue is that keys in key-value pairs need to be unique and there must not be duplicates. The workaround I have created was to add "a" "b" or "c" to the image link name to create different keys, but the images are still the exact same.

This allowed me to design some interesting permutations of enemy attacks with some enemies having a 60 / 40 or 70 / 30 probability split and one enemy (stage 5 slow) even having only 1 attack, so that attack has a 100% probability of being chosen. I really liked the randomness introduced by the enemy attacks and it added good variety to the combat.

<a name="EnemyTypes"></a>
### Enemy Types

For the different enemies, I settled on a simple concept of having archetypes of "Balanced", "Fast" and "Slow" enemies. The fast enemies would be characterised by having lower health, armor and less damaging attacks but they attack fast with a fast filling action gauge. The slow enemies would be the opposite, being tankier and having heavy hitting attacks but they have a slow filling action gauge. The balanced enemies would strike a balance between the other two types. This creates different play patterns when facing different enemies, with the fight being more fast paced and intense when facing a fast enemy but slow and precise when facing a slow enemy.

The enemy stats are configured in the big `generateEnemy` function found in its own file of [generateEnemy_function.js](generateEnemy_function.js). The attack pool and probabilities of each attack can also be configured here by modifying the image link and description text found in the `.attacks` key-value pair. The actual effects of each attack (attack power, whether it stuns, stun duration) are configured in the class declarations of every enemy. These enemy class declarations are all contained within their own files of [enemyeasy.js](enemyeasy.js), [enemybalanced.js](enemybalanced.js), [enemyfast.js](enemyfast.js) and [enemyslow.js](enemyslow.js).

<a name="Upgrades"></a>
### Upgrades

Upgrades are an important part of making the game replayable as the player will encounter different permutations of upgrades in every playthrough of the game, so each playthrough will be different. The fun part is that the upgrade selection is partly random and partly within the player's control as the player always has a choice between the 2 random upgrades shown.

Stages 1 and 2 offer a selection between 2 random stat upgrades (Strength, Health, Armour, ActionGaugeSpeed). Stages 3 and 4 offer a selection between a random stat upgrade and a random special upgrade. The player is allowed to have duplicates of stat upgrades as they can appear again as an option even if the player has chosen the same upgrade before in a previous upgrade screen. This is not the case for the special upgrades, so the Stage 4 random special upgrade will definitely be different from the Stage 3 one. The code for deciding the random upgrades is found in the `determineTwoRandomUpgrades` function.

When designing the upgrades, I wanted the first 2 stages of upgrades to be just simple ones that increase stats. However, I realised that although the ActionSpeedGauge+ upgrade was fun to play with, it was difficult to balance. Being able to increase the speed at which the action gauge fills is so invaluable in this game as it allows the player to take more actions over the same period of time. I decided to make the probability of ActionSpeedGauge+ 16%, you can find the specifics of how the code works in the `determineTwoRandomUpgrades` function. Apart from this function, all other relevant codes managing the upgrade screen are contained in one [upgrades.js](upgrades.js) file.

I was quite satisfied with Strength+, Health+ and Armour+ being at 28% each, making it rather unlikely to get multiple ActionSpeedGauge+ upgrades in a playthrough, but if that were to happen it would be a funny low probability occurence that I don't mind having in the game. Another funny low probability possibility is getting 4 Armour+ upgrades in a single game which would make the player so tanky to the point where it would be almost impossible to lose, due to the exponential scaling of the armour stat. I have balanced the Armour+ upgrade to be worse than the Health+ upgrade when the player has only 1 or 2 Armour+ but it shines if the player were to get it 3 times, with 4 being an extremely unlikely but essentially guaranteed win.

When designing the special upgrades that appear after stages 3 and 4, I wanted the upgrades to synergise with other upgrades as well as make both offensive and defensive playstyles viable. The LuckyBlock upgrade has increased value if the player has taken more defensive upgrades (Health+ and Armour+). A higher effective health pool would mean that the player can take more hits and thus, have more opportunities to take advantage of the LuckyBlock chance. The DoubleHit and Critical upgrades obviously synergise well with Strength+ but additionally, if the player has both DoubleHit and Critical, there is massive synergy and results in a substantial increase in damage. The ParryStun upgrade is one that supports a defensive playstyle and winning the war of attribution by prioritising defending over attacking and building an incremental resource advantage by repeatedly stopping the enemy's action gauge.

Transitioning to the upgrades screen is done by the `goToUpgradeScreen` function which is executed by the continuous `autoPlayerActionGauge` function when the enemy's health reaches 0 and if it is not yet the final stage.

The `click` event listeners upsize an upgrade image when clicked on and downsizes it when clicked again while already selected. Clicking an upgrade while another one is already selected would downsize the previously selected one. The logic here is similar to that of the attack and defend buttons.

Whenever an upgrade is selected, the image link of that upgrade is assigned to the `chosenUpgrade` variable. If no upgrades are selected,`chosenUpgrade` would be set to `notSelected`. If the player attempts to click the OK button when no upgrade is selected, an alert will prompt the player to select an upgrade.

There is a `click` event listener for the OK button which executes the `upgradesSubmitButton` function. This function locks in the `chosenUpgrade` variable and `pushes` it into the `arrUpgrades` array. The `upgradesSubmitButton` function then continues on to display the image icon of the newly selected upgrade in the upgrades inventory at the left side of the screen as well as start the next stage.

<a name="Pause"></a>
### Pause/Unpause

The `pause` and `unpause` functions are used quite often when running the parry minigame and transitioning between the combat, upgrade, loss/victory and changeParryTimer screens.

The `pause` function sets the background elements to be half-transparent, stop the continuous events of `autoPlayerActionGauge` and `autoEnemyActionGauge` and removes all event listeners.

The `unpause` function sets the background elements back to fully opaque and adds all event listeners again. However, the continuous events are not started up again as that may not be desired when unpausing after a parry minigame. If either the player or the enemy is stunned (the player by an enemy's stun attack after failing to parry, or the enemy by the player's ParryStun effect), the `unpause` function starting up the continuous event again would negate the stun effect.

<a name="Ideas"></a>
## Ideas for More Content

- Second action gauge for enemy in later stages. Also add new attacks that require 2 gauges to be full before executing.
- Some kind of final boss. My initial idea was to have the final boss be the player's alter ego and looks identical to te player. One of the boss's attacks would be to defend, putting the boss into a defensive stance for a few seconds. If the player attacks the boss while he is in the defensive stance, the boss would parry it.
- An easter egg kind of special upgrade in later stages that has a very low probability of appearing,like maybe 5%. Adds a new action button for the player. Would be some kind of ulimate move that requires 2 full gauges to use.
- An option to play as a different player character, perhaps unlocked only after beating the game once. Maybe a mage. The Attack/Defend actions might be changed to have different effects to make it more interesting. Pressing defend for the mage character would make grant a shield, pressing attack would maybe require 1.5 gauges but does more damage, to simulate casting a big spell.
- More enemy moves like self-buffs that boost the enemy's stats for a period of time, or boosts its next attack ,or applies debuffs such as blind or poison
- More stages, a new tier of stage 5 and 6 upgrade selection, maybe more enemy archetypes, enemies having more than 3 moves (and more interesting permutations of probability distribution of attacks)
