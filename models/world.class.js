class World {
  character = new Character();
  level = level1;
  enemies = level1.enemies;
  clouds = level1.clouds;
  bottles = level1.bottles;
  backgroundObjects = level1.backgroundObjects;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  statusBar = new Statusbar();
  collectedBottles = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
    this.keyboard = keyboard;
    this.setWorld();
    this.checkCollision();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollision();
      this.checkCollisionBottle();
    }, 200);
  }

  checkCollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  checkCollisionBottle() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        collectBottleSound.play();
        this.bottleCollected(bottle);
      }
    });
  }

  bottleCollected(bottle) {
    checkCollectedBottles();
    this.collectedBottles++;
    let i = this.level.bottles.indexOf(bottle);
    this.level.bottles.splice(i, 1);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //cleart the canvas

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.enemies);
    this.addObjectsToMap(this.clouds);
    this.addObjectsToMap(this.bottles);
    this.ctx.translate(-this.camera_x, 0);

    //draw() wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    this.ctx.restore();
    mo.x = mo.x * -1;
  }
}
