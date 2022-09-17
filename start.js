"use strict";
// Start Button
const startButton = document.querySelector("#start_button");

function startGame() {
  location.href = "main.html";
}

startButton.addEventListener("click", startGame);

// Github Repo Button
const githubRepoButton = document.querySelector("#github_repo_button");

function goToGithubRepo() {
  window.open("https://github.com/midorinom/sword_and_shield", "_blank");
}

githubRepoButton.addEventListener("click", goToGithubRepo);

// Asset Credits Button
const assetCreditsButton = document.querySelector("#asset_credits_button");

function goToAssetCredits(){
  window.open("https://github.com/midorinom/sword_and_shield/blob/main/asset_credits.txt", "_blank");
}

assetCreditsButton.addEventListener("click", goToAssetCredits);