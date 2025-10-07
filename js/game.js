
let canvas;
let world;
let keyboard = new Keyboard();
let arrivedEndboss = false;
let intervalIds = [];

let bottlesCollectedInMenu = 0;
let bottlesThrowedInMenu = 0;
let coinsCollectedInMenu = 0;
let killedChickenInMenu = 0;

function startGame() {
	switchContainer('start-screen', 'canvas');
	setTimeout(() => {		
        initLevel();
		mobileButtons();
		document.getElementById('overlay').classList.remove('d-none');
		document.getElementById('won-screen').classList.add('d-none');
		document.getElementById('lost-screen').classList.add('d-none');
		canvas = document.getElementById('canvas');
    	world = new World(canvas, keyboard);
	}, 400);
}

function showKeysManual() {
	document.getElementById('manual-screen').classList.remove('d-none');
}

function showStartScreen() {
	document.getElementById('manual-screen').classList.add('d-none');
}

function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

function stopAllIntervals() {
	intervalIds.forEach(clearInterval);
}

function switchContainer(id1, id2) {
    document.getElementById(id1).classList.add('d-none');
    document.getElementById(id2).classList.remove('d-none');
}

function setEndgameStatisticToNull() {
    bottlesCollectedInMenu = 0;
    bottlesThrowedInMenu = 0;
    coinsCollectedInMenu = 0;
    killedChickenInMenu = 0;
}

function checkCollectedBottles() {
    bottlesCollectedInMenu++;
}

function checkThrowedBottles() {
    bottlesThrowedInMenu++;
}

function checkCollectedCoins() {
    coinsCollectedInMenu++;
}

function checkKilledChicken() {
    killedChickenInMenu++;
}

function gameLost() {
	stopBackgroundMusic();
	showGameLostContainer();
}

function stopBackgroundMusic() {
	backgroundSound.pause();
	gameEndbossMusic.pause();
}

function showGameLostContainer() {
    setTimeout(() => {
        gameLostSound.play();
        document.getElementById('lost-screen').classList.remove('d-none');
    }, 500);
}

function gameWon() {
    stopBackgroundMusic();
    showGameWonContainer();
}

function showGameWonContainer() {
    setTimeout(() => {
        document.getElementById('won-screen').classList.remove('d-none');
    }, 1200);
}

function goToMainMenu(id1, id2, id3) {
    document.getElementById(id1).classList.add('d-none');
	document.getElementById(id2).classList.add('d-none');
    document.getElementById(id3).classList.remove('d-none');
	document.getElementById('overlay').classList.add('d-none');
}

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

function mobileButtons() {
	document.getElementById('mobile-btn-move-left').addEventListener('touchstart', (event) => {
		if (event.cancelable) {
			event.preventDefault();
			keyboard.left = true;
		}
	});

	document.getElementById('mobile-btn-move-left').addEventListener('touchend', (event) => {
		if (event.cancelable) {
			event.preventDefault();
			keyboard.left = false;
		}
	});

	document.getElementById('mobile-btn-move-right').addEventListener('touchstart', (event) => {
		if (event.cancelable) {
			event.preventDefault();
			keyboard.right = true;
		}
	});

	document.getElementById('mobile-btn-move-right').addEventListener('touchend', (event) => {
		if (event.cancelable) {
			event.preventDefault();
			keyboard.right = false;
		}
	});

	document.getElementById('mobile-btn-jump').addEventListener('touchstart', (event) => {
		if (event.cancelable) {
			event.preventDefault();
			keyboard.space = true;
		}
	});

	document.getElementById('mobile-btn-jump').addEventListener('touchend', (event) => {
		if (event.cancelable) {
			event.preventDefault();
			keyboard.space = false;
		}
	});

	document.getElementById('mobile-btn-throw').addEventListener('touchstart', (event) => {
		if (event.cancelable) {
			event.preventDefault();
			keyboard.d = true;
		}
	});

	document.getElementById('mobile-btn-throw').addEventListener('touchend', (event) => {
		if (event.cancelable) {
			event.preventDefault();
		keyboard.d = false;
		}
	});
}