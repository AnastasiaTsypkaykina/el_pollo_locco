/**
 * Represents a throwable bottle object in the game world.
 * Inherits from MovableObject.
 * Handles bottle throwing, animation, splash effects, and collision with endboss.
 *
 * @class
 * @extends MovableObject
 * @property {string[]} images_throwing_bottle - Array of image paths for bottle rotation animation.
 * @property {string[]} images_splash_bottle - Array of image paths for bottle splash animation.
 * @property {number} posX - The horizontal position of the bottle.
 * @property {number} posY - The vertical position of the bottle.
 * @property {boolean} characterDirection - The direction the character is facing (true = left, false = right).
 * @property {number} speedY - The vertical speed for gravity.
 * @property {number} speed - The horizontal speed of the bottle.
 * @property {number} height - The height of the bottle.
 *
 * @constructor
 * @param {number} posX - The horizontal position where the bottle is thrown.
 * @param {number} posY - The vertical position where the bottle is thrown.
 * @param {boolean} characterDirection - The direction the character is facing.
 */
class ThrowableObject extends MovableObject {
  images_throwing_bottle = [
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];
  images_splash_bottle = [
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Creates a new ThrowableObject instance, loads images, sets position and direction, and starts animation.
   * @param {number} posX - The horizontal position where the bottle is thrown.
   * @param {number} posY - The vertical position where the bottle is thrown.
   * @param {boolean} characterDirection - The direction the character is facing.
   */
  constructor(posX, posY, characterDirection) {
    super().loadImage(
      "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.loadImages(this.images_throwing_bottle);
    this.loadImages(this.images_splash_bottle);
    this.posX = posX;
    this.posY = posY;
    this.characterDirection = characterDirection;
    this.throw();
    this.bottleAnimation();
  }

  /**
   * Initiates the bottle throw, applies gravity, and moves left or right.
   */
  throw() {
    this.speedY = 30;
    this.applyGravity();
    this.throwingLeftOrRight();
  }

  /**
   * Moves the bottle left or right depending on character direction.
   */
  throwingLeftOrRight() {
    throwBottleSound.play();
    this.throwingInterval = setInterval(() => {
      if (this.characterDirection) {
        this.posX -= 10;
      } else {
        this.posX += 10;
      }
    }, 25);
    setTimeout(() => clearInterval(this.throwingInterval), 1000);
  }

  /**
   * Starts the bottle animation and updates endboss strike state.
   */
  bottleAnimation() {
    this.splashOrThrowingAnimation();
    this.updateBottleStrikesEndboss();
  }

  /**
   * Switches between splash and throwing animation based on position or collision.
   */
  splashOrThrowingAnimation() {
    this.splashAnimation = setInterval(() => {
      if (this.posY > 240 || world.bottleStrikesEndboss) {
        this.playSplashAnimation();
      } else {
        this.playAnimation(this.images_throwing_bottle);
      }
    }, 1000 / 15);
  }

  /**
   * Resets the bottleStrikesEndboss flag after a short delay.
   */
  updateBottleStrikesEndboss() {
    setTimeout(() => {
      world.bottleStrikesEndboss = false;
    }, 50);
  }

  /**
   * Plays the splash animation, sound, and triggers splash effect.
   */
  playSplashAnimation() {
    this.playAnimation(this.images_splash_bottle);
    bottleSplashSound.play();
    this.speed = 0;
    this.height = 100;
    this.splashEffect();
    clearInterval(this.splashAnimation);
  }

  /**
   * Animates the bottle falling down after splash and deletes it.
   */
  splashEffect() {
    setInterval(() => {
      this.posY += 10;
      this.deleteBottle();
    }, 70);
  }

  /**
   * Deletes the bottle from the canvas after a short delay.
   */
  deleteBottle() {
    setTimeout(() => {
      this.posY = 500;
    }, 300);
  }
}
