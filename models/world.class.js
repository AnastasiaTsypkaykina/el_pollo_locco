class World {
  character = new Character();
  level = level1;
  ctx;
  canvas;
  keyboard;
  cameraPosX = 0;
  statusBar = new Statusbar();
  coinBar = new CoinBar();
  bottleBar = new BottleBar();
  endbossBar = new EndbossBar();
  throwableObjects = [];
  collectedBottles = 0;
  bottleStrikesEndboss = false;
  endbossNotVulnerable = false;
  characterNotVulnerable = false;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.runBottles();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setStoppableInterval(() => {
      this.checkCollision();
      this.checkCollisionWithEndboss();
      this.checkCollisionBottle();
      this.checkCollisionCoin();
      this.killChickenWithBottle();
      this.bottleCollidesWithEndboss();
    }, 1000 / 60);
  }

  runBottles() {
    setInterval(() => {
      this.checkThrowObject();
    }, 200);
  }

  checkCollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (this.character.isAboveGround() && !this.character.isHurt()) {
          this.killChicken(enemy);
          this.characterInvulnerable();
        } else if (enemy.energy > 0) {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
        }
      }
    });
  }

  killChicken(enemy) {
    this.character.speedY = 30;
    this.chickenIsDead(enemy);

    setTimeout(() => {
      this.deleteEnemy(enemy);
    }, 500);
  }

  chickenIsDead(enemy) {
    enemy.energy = 0;
    chickenDeadSound.play();
  }

  deleteEnemy(enemy) {
    let i = this.level.enemies.indexOf(enemy);
    if (i > -1) {
      this.level.enemies.splice(i, 1);
      checkKilledChicken();
    }
  }

  checkCollisionWithEndboss() {
    this.level.endboss.forEach((endboss) => {
      if (this.character.isColliding(endboss) && !this.characterNotVulnerable) {
        this.character.hittedByEndboss();
        this.statusBar.setPercentage(this.character.energy);
        this.characterInvulnerable();
      }
    });
  }

  characterInvulnerable() {
    this.characterNotVulnerable = true;
    setTimeout(() => {
      this.characterNotVulnerable = false;
    }, 1500);
  }

  bottleCollidesWithEndboss() {
    this.throwableObjects.forEach((bottle) => {
      this.level.endboss.forEach((endboss) => {
        if (bottle.isColliding(endboss) && !this.endbossNotVulnerable) {
          this.bottleStrikesEndboss = true;
          this.endbossWasHit(endboss);
        }
      });
    });
    this.endbossBar.setPercentage(world.level.endboss[0].energy);
  }

  endbossWasHit(endboss) {
    endboss.hittedByBottle();
    this.endbossNotHitable();
  }

  endbossNotHitable() {
    this.endbossNotVulnerable = true;
    setTimeout(() => {
      this.endbossNotVulnerable = false;
    }, 1000);
  }

  checkThrowObject() {
    if (this.keyboard.d && this.collectedBottles > 0) {
      this.throwBottle();
      this.reduceBottleBar();
      // let bottle = new ThrowableObject(this.character.posX + 100, this.character.posY + 100);
      // this.throwableObjects.push(bottle)
    }
  }

  reduceBottleBar() {
    this.bottleBar.collected--;
    this.bottleBar.setCollected(this.bottleBar.collected);
  }

  throwBottle() {
    this.collectedBottles--;
    checkThrowedBottles();
    if (this.character.otherDirection) {
      this.bottleThrowLeft();
    } else {
      this.bottleThrowRight();
    }
  }

  bottleThrowLeft() {
    let bottle = new ThrowableObject(
      this.character.posX - 20,
      this.character.posY + 100,
      this.character.otherDirection
    );
    this.throwableObjects.push(bottle);
  }

  bottleThrowRight() {
    let bottle = new ThrowableObject(
      this.character.posX + 20,
      this.character.posY + 100,
      this.character.otherDirection
    );
    this.throwableObjects.push(bottle);
  }

  checkCollisionBottle() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        collectBottleSound.play();
        this.bottleCollected(bottle);
        this.increaseBottleBar();
      }
    });
  }

  bottleCollected(bottle) {
    checkCollectedBottles();
    this.collectedBottles++;
    let i = this.level.bottles.indexOf(bottle);
    this.level.bottles.splice(i, 1);
  }

  increaseBottleBar() {
    this.bottleBar.collected++;
    this.bottleBar.setCollected(this.bottleBar.collected);
  }

  killChickenWithBottle() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          this.chickenKilledWithBottle(enemy);
        }
      });
    });
  }

  chickenKilledWithBottle(enemy) {
    enemy.energy = 0;
    chickenDeadSound.play();
    setTimeout(() => {
      this.deleteEnemy(enemy);
    }, 500);
  }

  checkCollisionCoin() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        collectCoinSound.play();
        this.increaseCoinBar();
        this.coinCollected(coin);
      }
    });
  }

  increaseCoinBar() {
    this.coinBar.collected++;
    this.coinBar.setCollected(this.coinBar.collected);
  }

  coinCollected(coin) {
    checkCollectedCoins();
    let i = this.level.coins.indexOf(coin);
    this.level.coins.splice(i, 1);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.addBackgroundObjects();
    this.addStatusBars();
    this.addMoveableObjects();
    this.drawFrames();
  }

  addBackgroundObjects() {
    this.ctx.translate(this.cameraPosX, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.ctx.translate(-this.cameraPosX, 0);
  }

  addStatusBars() {
    this.addToMap(this.statusBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
    if (arrivedEndboss === true) {
      this.addToMap(this.endbossBar);
    }
  }

  addMoveableObjects() {
    this.ctx.translate(this.cameraPosX, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.endboss);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.cameraPosX, 0);
  }

  drawFrames() {
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    if (objects) {
      objects.forEach((object) => {
        this.addToMap(object);
      });
    }
  }

  addToMap(movableObject) {
    if (movableObject.otherDirection) {
      this.flipImage(movableObject);
    }
    movableObject.draw(this.ctx);

    if (movableObject.otherDirection) {
      this.flipImageBack(movableObject);
    }
  }

  flipImage(movableObject) {
    this.ctx.save();
    this.ctx.translate(movableObject.width, 0);
    this.ctx.scale(-1, 1);
    movableObject.posX = movableObject.posX * -1;
  }

  flipImageBack(movableObject) {
    movableObject.posX = movableObject.posX * -1;
    this.ctx.restore();
  }
}
