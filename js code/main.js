let gameState = "start";
let playerName = "";

// references for screens
const startScreen = document.querySelector(".starting-view");
const introStory = document.querySelector(".story-view");
const nameScreen = document.querySelector(".name-container");
const level1Screen = document.querySelector(".level1");

// references for btns and input-box

const startBtn = document.querySelector("#start-button");
const nextBtn = document.querySelector("#next-button");
const gameStart = document.querySelector("#submit-name");
const nameInput = document.querySelector("#name-input");

//reference for elements
const storyImage = document.querySelector("#story-image");
const storyText = document.querySelector("#story-text");

// declaring which screen will be displayed

function screenDisplayed(screen) {
  startScreen.style.display = "none";
  introStory.style.display = "none";
  nameScreen.style.display = "none";
  level1Screen.style.display = "none";

  if (screen === "start") {
    startScreen.style.display = "flex";
  }
  if (screen === "intro") {
    introStory.style.display = "flex";
  }
  if (screen === "name") {
    nameScreen.style.display = "flex";
  }
  if (screen === "level1") {
    level1Screen.style.display = "flex";
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

gameStart.addEventListener("click", () => {
  const name = nameInput.value.trim();
  if (name) {
    playerName = name;
    player = new Player(name);
    screenDisplayed("level1");
    startGame();
  } else {
    alert("Please enter your name!");
  }
});
