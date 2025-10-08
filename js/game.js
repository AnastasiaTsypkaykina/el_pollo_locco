/**
 * The main game canvas element.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * The main game world instance.
 * @type {World}
 */
let world;

/**
 * Keyboard input handler.
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * Indicates if the endboss has been reached.
 * @type {boolean}
 */
let arrivedEndboss = false;

/**
 * Stores all interval IDs for stoppable intervals.
 * @type {number[]}
 */
let intervalIds = [];

/**
 * Number of bottles collected in the menu.
 * @type {number}
 */
let bottlesCollectedInMenu = 0;

/**
 * Number of bottles thrown in the menu.
 * @type {number}
 */
let bottlesThrowedInMenu = 0;

/**
 * Number of coins collected in the menu.
 * @type {number}
 */
let coinsCollectedInMenu = 0;

/**
 * Number of chickens killed in the menu.
 * @type {number}
 */
let killedChickenInMenu = 0;

/**
 * Starts the game by switching screens, initializing the level, and setting up controls.
 */
function startGame() {
  switchContainer("start-screen", "canvas");
  setTimeout(() => {
    gameSounds();
    initLevel();
    mobileButtons();
    document.getElementById("overlay").classList.remove("d-none");
    document.getElementById("won-screen").classList.add("d-none");
    document.getElementById("lost-screen").classList.add("d-none");
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
  }, 400);
}

/**
 * Shows the manual screen with key instructions.
 */
function showKeysManual() {
  document.getElementById("manual-screen").classList.remove("d-none");
}

/**
 * Shows the start screen and hides the manual.
 */
function showStartScreen() {
  document.getElementById("manual-screen").classList.add("d-none");
}

/**
 * Sets an interval that can be stopped later.
 * @param {Function} fn - The function to execute.
 * @param {number} time - The interval time in milliseconds.
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}

/**
 * Stops all intervals that were set with setStoppableInterval.
 */
function stopAllIntervals() {
  intervalIds.forEach(clearInterval);
}

/**
 * Switches visibility between two containers by their IDs.
 * @param {string} id1 - The ID of the container to hide.
 * @param {string} id2 - The ID of the container to show.
 */
function switchContainer(id1, id2) {
  document.getElementById(id1).classList.add("d-none");
  document.getElementById(id2).classList.remove("d-none");
}

/**
 * Resets all endgame statistics to zero.
 */
function setEndgameStatisticToNull() {
  bottlesCollectedInMenu = 0;
  bottlesThrowedInMenu = 0;
  coinsCollectedInMenu = 0;
  killedChickenInMenu = 0;
}

/**
 * Increments the count of bottles collected in the menu.
 */
function checkCollectedBottles() {
  bottlesCollectedInMenu++;
}

/**
 * Increments the count of bottles thrown in the menu.
 */
function checkThrowedBottles() {
  bottlesThrowedInMenu++;
}

/**
 * Increments the count of coins collected in the menu.
 */
function checkCollectedCoins() {
  coinsCollectedInMenu++;
}

/**
 * Increments the count of chickens killed.
 */
function checkKilledChicken() {
  killedChickenInMenu++;
}

/**
 * Handles the game lost state: stops music and shows the lost screen.
 */
function gameLost() {
  stopBackgroundMusic();
  showGameLostContainer();
}

/**
 * Pauses background and endboss music.
 */
function stopBackgroundMusic() {
  backgroundSound.pause();
  gameEndbossMusic.pause();
}

/**
 * Shows the game lost container after a short delay and plays the lost sound.
 */
function showGameLostContainer() {
  setTimeout(() => {
    gameLostSound.play();
    document.getElementById("lost-screen").classList.remove("d-none");    
  }, 500);
}

/**
 * Handles the game won state: stops music and shows the won screen.
 */
function gameWon() {
  stopBackgroundMusic();
  showGameWonContainer();
}

/**
 * Shows the game won container after a short delay.
 */
function showGameWonContainer() {
  setTimeout(() => {
    gameWonSound.play();
    document.getElementById("won-screen").classList.remove("d-none");   
  }, 1200);
}

/**
 * Returns to the main menu by hiding two containers and showing another.
 * @param {string} id1 - The first container to hide.
 * @param {string} id2 - The second container to hide.
 * @param {string} id3 - The container to show.
 */
function goToMainMenu(id1, id2, id3) {
  document.getElementById(id1).classList.add("d-none");
  document.getElementById(id2).classList.add("d-none");
  document.getElementById(id3).classList.remove("d-none");
  document.getElementById("overlay").classList.add("d-none");
}

/**
 * Handles keyboard keydown events and updates the keyboard state.
 */
window.addEventListener("keydown", (event) => {
  if (event.keyCode == 37) {
    keyboard.left = true;
  }

  if (event.keyCode == 39) {
    keyboard.right = true;
  }

  if (event.keyCode == 38) {
    keyboard.up = true;
  }

  if (event.keyCode == 40) {
    keyboard.down = true;
  }

  if (event.keyCode == 32) {
    keyboard.space = true;
  }

  if (event.keyCode == 68) {
    keyboard.d = true;
  }
});

/**
 * Handles keyboard keyup events and updates the keyboard state.
 */
window.addEventListener("keyup", (event) => {
  if (event.keyCode == 37) {
    keyboard.left = false;
  }

  if (event.keyCode == 39) {
    keyboard.right = false;
  }

  if (event.keyCode == 38) {
    keyboard.up = false;
  }

  if (event.keyCode == 40) {
    keyboard.down = false;
  }

  if (event.keyCode == 32) {
    keyboard.space = false;
  }

  if (event.keyCode == 68) {
    keyboard.d = false;
  }
});

/**
 * Sets up mobile button event listeners for touch controls.
 */
function mobileButtons() {
  document
    .getElementById("mobile-btn-move-left")
    .addEventListener("touchstart", (event) => {
      if (event.cancelable) {
        event.preventDefault();
        keyboard.left = true;
      }
    });

  document
    .getElementById("mobile-btn-move-left")
    .addEventListener("touchend", (event) => {
      if (event.cancelable) {
        event.preventDefault();
        keyboard.left = false;
      }
    });

  document
    .getElementById("mobile-btn-move-right")
    .addEventListener("touchstart", (event) => {
      if (event.cancelable) {
        event.preventDefault();
        keyboard.right = true;
      }
    });

  document
    .getElementById("mobile-btn-move-right")
    .addEventListener("touchend", (event) => {
      if (event.cancelable) {
        event.preventDefault();
        keyboard.right = false;
      }
    });

  document
    .getElementById("mobile-btn-jump")
    .addEventListener("touchstart", (event) => {
      if (event.cancelable) {
        event.preventDefault();
        keyboard.space = true;
      }
    });

  document
    .getElementById("mobile-btn-jump")
    .addEventListener("touchend", (event) => {
      if (event.cancelable) {
        event.preventDefault();
        keyboard.space = false;
      }
    });

  document
    .getElementById("mobile-btn-throw")
    .addEventListener("touchstart", (event) => {
      if (event.cancelable) {
        event.preventDefault();
        keyboard.d = true;
      }
    });

  document
    .getElementById("mobile-btn-throw")
    .addEventListener("touchend", (event) => {
      if (event.cancelable) {
        event.preventDefault();
        keyboard.d = false;
      }
    });
}
