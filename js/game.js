let canvas;
let world;
let keyboard = new Keyboard();


bottlesCollectedInMenu = 0;

function startGame() {
  switchContainer("start-screen", "canvas");
  setTimeout(() => {    
    gameSounds();
    initLevel();    
    document.getElementById("overlay").classList.remove("d-none");
    document.getElementById("won-screen").classList.add("d-none");
    document.getElementById("lost-screen").classList.add("d-none");
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
  }, 400);  
}


function switchContainer(id1, id2) {
    document.getElementById(id1).classList.add('d-none');
    document.getElementById(id2).classList.remove('d-none');
}

function gameLost() {
	stopBackgroundMusic();
	showGameLostContainer();
}

function stopBackgroundMusic() {
	backgroundSound.pause();
    
	
}

function showGameLostContainer() {
    setTimeout(() => {
        characterDeadSound.play();
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


function checkCollectedBottles() {
  bottlesCollectedInMenu++;
}

function checkThrowedBottles() {
    bottlesThrowedInMenu++;
}

//falls ich eine Taste drucke, bekomme ich ein Array zurück
window.addEventListener("keydown", (e) => {
  console.log(e);
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }

  if (e.keyCode == 38) {
    keyboard.UP = true;
  }

  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }

  if (e.keyCode == 13) {
    keyboard.ENTER = true;
  }

  if (e.keyCode == 27) {
    keyboard.ESC = true;
  }

  if (e.keyCode == 68) {
		keyboard.d = true;
	}
});

window.addEventListener("keyup", (e) => {
  console.log(e);
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }

  if (e.keyCode == 38) {
    keyboard.UP = false;
  }

  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }

  if (e.keyCode == 13) {
    keyboard.ENTER = false;
  }

  if (e.keyCode == 27) {
    keyboard.ESC = false;
  }

  if (e.keyCode == 68) {
		keyboard.d = false;
	}
});
