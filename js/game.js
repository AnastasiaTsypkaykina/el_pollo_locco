let canvas;
let world;
let keyboard = new Keyboard();

bottlesCollectedInMenu = 0;

function startGame() {
  switchContainer("start-screen", "canvas");
  setTimeout(() => {
    // switchContainer('start-screen', 'canvas');
    // setEndgameStatisticToNull();
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

function checkCollectedBottles() {
  bottlesCollectedInMenu++;
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
});
