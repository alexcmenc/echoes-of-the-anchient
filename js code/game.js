let gameArea = document.querySelector("#game-area");
let hud = document.querySelector("#hud");
let levelText = document.querySelector("#level-name");
let scoreText = document.querySelector("#score");
let playerHealth = 100;
const healthBar = document.getElementById("health-bar");
const gameOverScreen = document.querySelector(".game-over-screen");
const restartButton = document.getElementById("restart-button");

let goblinSpawnInterval;
let currentKills = 0;
let levelIndex = 0;
let goblinsToKill = 5;
let gameInProgress = false;

const levels = [
  {
    name: "level 1",
    goblinSpeed: 2,
    spawnRate: 1800,
    kills: 5,
    background: "url('../images/levels/level1-bosque.png')",
  },
  {
    name: "level 2",
    goblinSpeed: 3,
    spawnRate: 1100,
    kills: 12,
    background: "url('../images/levels/level2-bosque.png')",
  },
  { name: "Final Boss", boss: true },
];

function startGame() {
  gameInProgress = true;
  currentKills = 0;
  levelIndex = 0;
  loadLevel();
  document.addEventListener("keydown", shoot);
}

function loadLevel() {
  clearInterval(goblinSpawnInterval);

  const goblins = document.querySelectorAll(".goblin, .bullet, .boss");
  goblins.forEach((el) => el.remove());

  const level = levels[levelIndex];

  gameArea.style.backgroundImage = level.background || "none";
  gameArea.style.backgroundSize = "cover";
  gameArea.style.backgroundPosition = "center";

  updateHUD();

  if (level.boss) {
    spawnBoss();
  } else {
    goblinSpawnInterval = setInterval(() => {
      spawnGoblin(level.goblinSpeed);
    }, level.spawnRate);
    goblinsToKill = level.kills;
  }
}

function updateHUD() {
  const levelName = levels[levelIndex].name;
  levelText.textContent = levelName;
  scoreText.textContent = `Kills: ${currentKills}`;
}

function spawnGoblin(speed) {
  const goblin = document.createElement("div");
  goblin.classList.add("goblin");
  gameArea.appendChild(goblin);

  goblin.style.position = "absolute";
  goblin.style.top = "0px";
  goblin.style.left = gameArea.clientWidth - 50 + "px";
  const targetY = 85;

  let fallInterval = setInterval(() => {
    const currentTop = parseInt(goblin.style.top);
    if (currentTop >= gameArea.clientHeight - targetY - goblin.offsetHeight) {
      clearInterval(fallInterval);
      goblin.style.top =
        gameArea.clientHeight - targetY - goblin.offsetHeight + "px";
      runTowardPlayer(goblin, speed);
    } else {
      goblin.style.top = currentTop + 4 + "px"; // falling speed
    }
  }, 30);
}

function runTowardPlayer(goblin, speed) {
  const runInterval = setInterval(() => {
    if (!document.body.contains(goblin)) {
      clearInterval(runInterval);
      return;
    }

    const goblinRect = goblin.getBoundingClientRect();
    const player = document.getElementById("player");
    const playerRect = player.getBoundingClientRect();

    if (isColliding(goblin, player)) {
      updateHealth(20);
      goblin.remove();
      clearInterval(runInterval);
    } else {
      goblin.style.left = goblin.offsetLeft - speed + "px";
    }
  }, 30);
}

function shoot(e) {
  if (e.code !== "Space") return;

  const player = document.querySelector("#player");
  const bullet = document.createElement("div");
  bullet.className = "bullet";

  bullet.style.left = player.offsetLeft + player.offsetWidth + "px";

  const playerRect = player.getBoundingClientRect();
  const gameRect = gameArea.getBoundingClientRect();
  const bulletTop = playerRect.top - gameRect.top + player.offsetHeight / 2;

  bullet.style.top = bulletTop + "px";
  bullet.style.position = "absolute";

  gameArea.appendChild(bullet);

  let bulletInterval = setInterval(() => {
    bullet.style.left = bullet.offsetLeft + 10 + "px";

    const goblins = document.querySelectorAll(".goblin, .boss");
    goblins.forEach((g) => {
      if (isColliding(bullet, g)) {
        if (g.classList.contains("boss")) {
          g.dataset.hp--;
          if (g.dataset.hp <= 0) {
            g.remove();
            endGame();
          }
        } else {
          g.remove();
          currentKills++;
          updateHUD();
          if (currentKills >= goblinsToKill) {
            nextLevel();
          }
        }
        bullet.remove();
        clearInterval(bulletInterval);
      }
    });

    if (bullet.offsetLeft > gameArea.clientWidth) {
      bullet.remove();
      clearInterval(bulletInterval);
    }
  }, 30);
}

function isColliding(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();
  return !(
    aRect.top > bRect.bottom ||
    aRect.bottom < bRect.top ||
    aRect.left > bRect.right ||
    aRect.right < bRect.left
  );
}

function nextLevel() {
  clearInterval(goblinSpawnInterval);
  levelIndex++;
  currentKills = 0;

  if (levelIndex < levels.length) {
    loadLevel();
  } else {
    endGame();
  }
}

function spawnBoss() {
  const boss = document.createElement("div");
  boss.className = "boss";
  boss.classList.add("boss");
  boss.style.width = "100px";
  boss.style.height = "100px";
  boss.style.left = window.innerWidth - 150 + "px";
  boss.style.bottom = "200px";
  boss.dataset.hp = 10;
  gameArea.appendChild(boss);
}

function endGame() {
  clearInterval(goblinSpawnInterval);
  alert(`You won, ${player.name}! The dragon was defeated!`);
  gameInProgress = false;
}
function updateHealth(amount) {
  playerHealth = Math.max(0, playerHealth - amount);
  healthBar.style.width = playerHealth + "%";

  if (playerHealth <= 0) {
    clearInterval(goblinSpawnInterval);
    gameInProgress = false;

    gameOverScreen.style.display = "block";
  }
}
restartButton.addEventListener("click", () => {
  playerHealth = 100;
  currentKills = 0;
  coinCount = 0;
  levelIndex = 0;

  updateHUD();
  updateHealth(0);

  const gameElements = document.querySelectorAll(".goblin, .boss, .bullet");
  gameElements.forEach((el) => el.remove());

  gameOverScreen.style.display = "none";

  startGame();
});
