/**
 * Represents the main game world, handling rendering, collisions, and game logic.
 * 
 * @class
 * @property {Character} character - The main character instance.
 * @property {Level} level - The current level instance.
 * @property {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
 * @property {HTMLCanvasElement} canvas - The canvas element.
 * @property {Keyboard} keyboard - The keyboard input handler.
 * @property {number} cameraPosX - The horizontal camera position.
 * @property {Statusbar} statusBar - The status bar for character health.
 * @property {CoinBar} coinBar - The status bar for coins.
 * @property {BottleBar} bottleBar - The status bar for bottles.
 * @property {EndbossBar} endbossBar - The status bar for the endboss.
 * @property {ThrowableObject[]} throwableObjects - Array of thrown bottles.
 * @property {number} collectedBottles - Number of bottles collected.
 * @property {boolean} bottleStrikesEndboss - Whether a bottle hit the endboss.
 * @property {boolean} endbossNotVulnerable - If the endboss is currently invulnerable.
 * @property {boolean} characterNotVulnerable - If the character is currently invulnerable.
 * 
 * @constructor
 * @param {HTMLCanvasElement} canvas - The canvas element to render on.
 * @param {Keyboard} keyboard - The keyboard input handler.
 */
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

  /**
   * Creates a new World instance and initializes the game loop.
   * @param {HTMLCanvasElement} canvas 
   * @param {Keyboard} keyboard 
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;    
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.runBottles();
  }

  /**
   * Sets the world reference on the character.
   */
  setWorld() {
    this.character.world = this;
  }
  
  /**
   * Starts the main game loop for collision checks and logic.
   */
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

   /**
   * Starts the interval for checking bottle throws.
   */
  runBottles() {
    setInterval(() => {
      this.checkThrowObject();
    }, 200);
  }

  /**
   * Checks collision between the character and enemies.
   */
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

  /**
   * Handles killing a chicken enemy.
   * @param {Chicken|SmallChicken} enemy 
   */
  killChicken(enemy) {
    this.character.speedY = 30;
    this.chickenIsDead(enemy);

    setTimeout(() => {
      this.deleteEnemy(enemy);
    }, 500);
  }

  /**
   * Sets the enemy's energy to 0 and plays the dead sound.
   * @param {Chicken|SmallChicken} enemy 
   */
  chickenIsDead(enemy) {
    enemy.energy = 0;
    chickenDeadSound.play();
  }

   /**
   * Removes an enemy from the level.
   * @param {Chicken|SmallChicken} enemy 
   */
  deleteEnemy(enemy) {
    let i = this.level.enemies.indexOf(enemy);
    if (i > -1) {
      this.level.enemies.splice(i, 1);
      checkKilledChicken();
    }
  }

  /**
   * Checks collision between the character and the endboss.
   */
  checkCollisionWithEndboss() {
    this.level.endboss.forEach((endboss) => {
      if (this.character.isColliding(endboss) && !this.characterNotVulnerable) {
        this.character.hittedByEndboss();
        this.statusBar.setPercentage(this.character.energy);
        this.characterInvulnerable();
      }
    });
  }

  /**
   * Makes the character temporarily invulnerable.
   */
  characterInvulnerable() {
    this.characterNotVulnerable = true;
    setTimeout(() => {
      this.characterNotVulnerable = false;
    }, 1500);
  }

  /**
   * Checks if a thrown bottle collides with the endboss.
   */
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

  /**
   * Handles the endboss being hit by a bottle.
   * @param {Endboss} endboss 
   */
  endbossWasHit(endboss) {
    endboss.hittedByBottle();
    this.endbossNotHitable();
  }

  /**
   * Makes the endboss temporarily invulnerable.
   */
  endbossNotHitable() {
    this.endbossNotVulnerable = true;
    setTimeout(() => {
      this.endbossNotVulnerable = false;
    }, 1000);
  }

   /**
   * Checks if the player can throw a bottle and does so if possible.
   */
  checkThrowObject() {
    if (this.keyboard.d && this.collectedBottles > 0) {
      this.throwBottle();
      this.reduceBottleBar();      
    }
  }

  /**
   * Reduces the bottle bar after throwing a bottle.
   */
  reduceBottleBar() {
    this.bottleBar.collected--;
    this.bottleBar.setCollected(this.bottleBar.collected);
  }

   /**
 * Throws a bottle in the direction the character is facing.
 * If the character is facing left, the bottle is thrown to the left.
 * If the character is facing right, the bottle is thrown to the right.
 * Decreases the collected bottles count and adds the new bottle to the throwableObjects array.
 */
throwBottle() {
  this.collectedBottles--;
  checkThrowedBottles();
  // Set offset for bottle spawn: left (-20) or right (+20)
  let offsetX;
  if (this.character.otherDirection) {
    // Character is facing left
    offsetX = -20;
  } else {
    // Character is facing right
    offsetX = 20;
  }

  // Create and add the bottle
  const bottle = new ThrowableObject(
    this.character.posX + offsetX,
    this.character.posY + 100,
    this.character.otherDirection
  );
  this.throwableObjects.push(bottle);
}
  /**
   * Checks collision between the character and bottles in the level.
   */
  checkCollisionBottle() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        collectBottleSound.play();
        this.bottleCollected(bottle);
        this.increaseBottleBar();
      }
    });
  }

  /**
   * Handles collecting a bottle.
   * @param {Bottle} bottle 
   */
  bottleCollected(bottle) {
    checkCollectedBottles();
    this.collectedBottles++;
    let i = this.level.bottles.indexOf(bottle);
    this.level.bottles.splice(i, 1);
  }

  /**
   * Increases the bottle bar after collecting a bottle.
   */
  increaseBottleBar() {
    this.bottleBar.collected++;
    this.bottleBar.setCollected(this.bottleBar.collected);
  }

   /**
   * Checks if a thrown bottle kills a chicken enemy.
   */
  killChickenWithBottle() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          this.chickenKilledWithBottle(enemy);
        }
      });
    });
  }

  /**
   * Handles killing a chicken with a bottle.
   * @param {Chicken|SmallChicken} enemy 
   */
  chickenKilledWithBottle(enemy) {
    enemy.energy = 0;
    chickenDeadSound.play();
    setTimeout(() => {
      this.deleteEnemy(enemy);
    }, 500);
  }

  /**
   * Checks collision between the character and coins in the level.
   */
  checkCollisionCoin() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        collectCoinSound.play();
        this.increaseCoinBar();
        this.coinCollected(coin);
      }
    });
  }

  /**
   * Increases the coin bar after collecting a coin.
   */
  increaseCoinBar() {
    this.coinBar.collected++;
    this.coinBar.setCollected(this.coinBar.collected);
  }

  /**
   * Handles collecting a coin.
   * @param {Coin} coin 
   */
  coinCollected(coin) {
    checkCollectedCoins();
    let i = this.level.coins.indexOf(coin);
    this.level.coins.splice(i, 1);
  }

  /**
   * Draws the game world, including background, status bars, and moveable objects.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.addBackgroundObjects();
    this.addStatusBars();
    this.addMoveableObjects();
    this.drawFrames();
  }

  /**
   * Draws background objects and clouds.
   */
  addBackgroundObjects() {
    this.ctx.translate(this.cameraPosX, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.ctx.translate(-this.cameraPosX, 0);
  }

  /**
   * Draws status bars (health, coins, bottles, endboss).
   */
  addStatusBars() {
    this.addToMap(this.statusBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
    if (arrivedEndboss === true) {
      this.addToMap(this.endbossBar);
    }
  }

  /**
   * Draws moveable objects (character, enemies, endboss, bottles, coins, thrown bottles).
   */
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

  /**
   * Requests the next animation frame to redraw the world.
   */
  drawFrames() {
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Adds an array of objects to the map.
   * @param {Array<MoveableObject>} objects 
   */
  addObjectsToMap(objects) {
    if (objects) {
      objects.forEach((object) => {
        this.addToMap(object);
      });
    }
  }

   /**
   * Adds a single moveable object to the map, handling image flipping if needed.
   * @param {MoveableObject} movableObject 
   */
  addToMap(movableObject) {
    if (movableObject.otherDirection) {
      this.flipImage(movableObject);
    }
    movableObject.draw(this.ctx);

    if (movableObject.otherDirection) {
      this.flipImageBack(movableObject);
    }
  }

  /**
   * Flips the image horizontally for left-facing objects.
   * @param {MoveableObject} movableObject 
   */
  flipImage(movableObject) {
    this.ctx.save();
    this.ctx.translate(movableObject.width, 0);
    this.ctx.scale(-1, 1);
    movableObject.posX = movableObject.posX * -1;
  }

  /**
   * Restores the image orientation after flipping.
   * @param {MoveableObject} movableObject 
   */
  flipImageBack(movableObject) {
    movableObject.posX = movableObject.posX * -1;
    this.ctx.restore();
  }
}
