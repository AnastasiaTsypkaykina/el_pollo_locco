/**
 * Base class for all moveable objects in the game.
 * Inherits from DrawableObject and adds movement, gravity, collision, and animation logic.
 *
 * @class
 * @extends DrawableObject
 * @property {number} speed - The horizontal movement speed (default: 0.1).
 * @property {boolean} otherDirection - If true, object is facing left.
 * @property {number} speedPosY - The vertical speed for gravity (default: 20).
 * @property {number} acceleration - The gravity acceleration (default: 2.5).
 * @property {number} energy - The health/energy of the object (default: 100).
 * @property {number} lastHit - Timestamp of the last hit.
 * @property {Object} offset - The collision offset for the object.
 * @property {number} offset.top
 * @property {number} offset.left
 * @property {number} offset.bottom
 * @property {number} offset.right
 */
class MovableObject extends DrawableObject {
  speed = 0.1;
  otherDirection = false;
  speedPosY = 20;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;

  offset = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  };

  /**
   * Applies gravity to bottles, updating vertical position and speed.
   */
  applyGravityBottle() {
    setStoppableInterval(() => {
      if (this.isAboveGround() || this.speedPosY > 0) {
        this.posY -= this.speedPosY;
        this.speedPosY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Applies gravity to the character, updating vertical position and speed.
   */
  applyGravityCharacter() {
    setStoppableInterval(() => {
      if (this.isAboveGround() || this.speedPosY > 0) {
        this.posY -= this.speedPosY;
        this.speedPosY -= this.acceleration;
      } else {
        this.posY = 120;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is above ground.
   * @returns {boolean}
   */
  isAboveGround() {
    if (this instanceof ThrowableObject && this.posY < 300) {
      return true;
    } else {
      return this.posY < 120;
    }
  }

  /**
   * Plays an animation by cycling through the given images.
   * @param {string[]} images - Array of image paths.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Moves the object to the right.
   */
  moveRight() {
    this.posX += this.speed;
    this.otherDirection = false;
  }

  /**
   * Moves the object to the left.
   */
  moveLeft() {
    this.posX -= this.speed;
    this.otherDirection = true;
  }

  /**
   * Checks if this object is colliding with another moveable object.
   * @param {MovableObject} movableObject
   * @returns {boolean}
   */
  isColliding(movableObject) {
    return (
      this.posX + this.width - this.offset.right >
        movableObject.posX + movableObject.offset.left &&
      this.posY + this.height - this.offset.bottom >
        movableObject.posY + movableObject.offset.top &&
      this.posX + this.offset.left <
        movableObject.posX + movableObject.width - movableObject.offset.right &&
      this.posY + this.offset.top <
        movableObject.posY + movableObject.height - movableObject.offset.bottom
    );
  }

  /**
   * Reduces energy by 1 and updates lastHit timestamp.
   */
  hit() {
    this.energy -= 1;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Reduces energy by 10 when hit by endboss and updates lastHit timestamp.
   */
  hittedByEndboss() {
    this.energy -= 10;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Reduces energy by 19 when hit by bottle and updates lastHit timestamp.
   */
  hittedByBottle() {
    this.energy -= 19;
    if (this.energy < 10) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object is currently hurt (recently hit).
   * @returns {boolean}
   */
  isHurt() {
    // Difference in ms
    let timepassed = new Date().getTime() - this.lastHit;
    // In seconds
    timepassed = timepassed / 1000;
    return timepassed < 0.5;
  }

  /**
   * Checks if the endboss is currently hurt (recently hit).
   * @returns {boolean}
   */
  endbossIsHurt() {
    // Difference in ms
    let timepassed = new Date().getTime() - this.lastHit;
    // In seconds
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * Checks if the object is dead (energy is 0).
   * @returns {boolean}
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Starts the chicken's walking and death checking animations.
   */
  chickenAnimation() {
    this.movingLeft();
    this.checkingDeath();
  }

  /**
   * Starts moving the object left at a set interval.
   */
  movingLeft() {
    this.walkingLeft = setInterval(() => {
      this.moveLeft();
      this.otherDirection = false;
    }, 1000 / 60);
  }

  /**
   * Checks for death and plays the appropriate animation.
   */
  checkingDeath() {
    this.death = setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.images_dead);
        this.deadChicken();
      } else {
        this.playAnimation(this.images_walking);
      }
    }, 150);
  }

  /**
   * Stops the chicken's walking and death intervals after a short delay.
   */
  deadChicken() {
    setTimeout(() => {
      clearInterval(this.walkingLeft);
      clearInterval(this.death);
    }, 100);
  }
}
