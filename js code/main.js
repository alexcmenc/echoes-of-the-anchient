let gameState = "start";
let playerName = "";

// references for screens
const startScreen = document.querySelector(".starting-view");
const introStory = document.querySelector(".story-view");
const nameScreen = document.querySelector(".name-container");
const storyText = document.querySelector("#story-text");

// references for btns and input-box

const startBtn = document.querySelector("#start-button");
const nextBtn = document.querySelector("#next-button");
const nameInput = document.querySelector("#player-name");

// declaring which screen will be displayed

function screenDisplayed(screen) {
  startScreen.style.display = "none";
  introStory.style.display = "none";
  nameScreen.style.display = "none";

  if (screen === "start") {
    startScreen.style.display = "flex";
  }
  if (screen === "intro") {
    introStory.style.display = "flex";
  }
  if (screen === "name") {
    nameScreen.style.display = "flex";
  }
}

//setting initial page to be displayed on loading
window.onload = () => {
  screenDisplayed("start");
};

//starting the game
startBtn.addEventListener("click", () => {
  currentSceneIndex = 0;
  displayScene();
  screenDisplayed("intro");
});

// setting the nextButton (story.js)
