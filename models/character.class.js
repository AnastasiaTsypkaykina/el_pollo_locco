/**
 * Represents the main character controlled by the player.
 * Inherits from MovableObject.
 *
 * @class
 * @extends MovableObject
 * @property {number} posY - The vertical position of the character (default: 60).
 * @property {number} height - The height of the character (default: 320).
 * @property {number} width - The width of the character (default: 100).
 * @property {number} speed - The movement speed of the character (default: 8).
 * @property {number} longIdleState - Counter for long idle animation state.
 * @property {Object} offset - The collision offset for the character.
 * @property {number} offset.top
 * @property {number} offset.bottom
 * @property {number} offset.left
 * @property {number} offset.right
 * @property {string[]} images_walking - Array of image paths for walking animation.
 * @property {string[]} images_jumping - Array of image paths for jumping animation.
 * @property {string[]} images_dead - Array of image paths for dead animation.
 * @property {string[]} images_hurt - Array of image paths for hurt animation.
 * @property {string[]} images_idle - Array of image paths for idle animation.
 * @property {string[]} images_long_idle - Array of image paths for long idle animation.
 * @property {World} world - Reference to the game world.
 * @property {HTMLAudioElement} walkingSound - Sound effect for walking.
 *
 * @constructor
 */
class Character extends MovableObject {
  posY = 60;
  height = 320;
  width = 100;
  speed = 8;
  longIdleState = 0;
  offset = {
    top: 50,
    bottom: 20,
    left: 30,
    right: 30,
  };

  images_walking = [
    "./img/2_character_pepe/2_walk/W-21.png",
    "./img/2_character_pepe/2_walk/W-22.png",
    "./img/2_character_pepe/2_walk/W-23.png",
    "./img/2_character_pepe/2_walk/W-24.png",
    "./img/2_character_pepe/2_walk/W-25.png",
    "./img/2_character_pepe/2_walk/W-26.png",
  ];

  images_jumping = [
    "./img/2_character_pepe/3_jump/J-31.png",
    "./img/2_character_pepe/3_jump/J-32.png",
    "./img/2_character_pepe/3_jump/J-33.png",
    "./img/2_character_pepe/3_jump/J-34.png",
    "./img/2_character_pepe/3_jump/J-35.png",
    "./img/2_character_pepe/3_jump/J-36.png",
    "./img/2_character_pepe/3_jump/J-37.png",
    "./img/2_character_pepe/3_jump/J-38.png",
    "./img/2_character_pepe/3_jump/J-39.png",
  ];

  images_dead = [
    "./img/2_character_pepe/5_dead/D-51.png",
    "./img/2_character_pepe/5_dead/D-52.png",
    "./img/2_character_pepe/5_dead/D-53.png",
    "./img/2_character_pepe/5_dead/D-54.png",
    "./img/2_character_pepe/5_dead/D-55.png",
    "./img/2_character_pepe/5_dead/D-56.png",
    "./img/2_character_pepe/5_dead/D-57.png",
  ];

  images_hurt = [
    "./img/2_character_pepe/4_hurt/H-41.png",
    "./img/2_character_pepe/4_hurt/H-42.png",
    "./img/2_character_pepe/4_hurt/H-43.png",
  ];

  images_idle = [
    "./img/2_character_pepe/1_idle/idle/I-1.png",
    "./img/2_character_pepe/1_idle/idle/I-2.png",
    "./img/2_character_pepe/1_idle/idle/I-3.png",
    "./img/2_character_pepe/1_idle/idle/I-4.png",
    "./img/2_character_pepe/1_idle/idle/I-5.png",
    "./img/2_character_pepe/1_idle/idle/I-6.png",
    "./img/2_character_pepe/1_idle/idle/I-7.png",
    "./img/2_character_pepe/1_idle/idle/I-8.png",
    "./img/2_character_pepe/1_idle/idle/I-9.png",
    "./img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  images_long_idle = [
    "./img/2_character_pepe/1_idle/long_idle/I-11.png",
    "./img/2_character_pepe/1_idle/long_idle/I-12.png",
    "./img/2_character_pepe/1_idle/long_idle/I-13.png",
    "./img/2_character_pepe/1_idle/long_idle/I-14.png",
    "./img/2_character_pepe/1_idle/long_idle/I-15.png",
    "./img/2_character_pepe/1_idle/long_idle/I-16.png",
    "./img/2_character_pepe/1_idle/long_idle/I-17.png",
    "./img/2_character_pepe/1_idle/long_idle/I-18.png",
    "./img/2_character_pepe/1_idle/long_idle/I-19.png",
    "./img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  world;
  walkingSound = new Audio("./audio/walking_on_sand.mp3");

  /**
   * Creates a new Character instance, loads images, applies gravity, and starts animation.
   */
  constructor() {
    super().loadImage("./img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.images_walking);
    this.loadImages(this.images_jumping);
    this.loadImages(this.images_dead);
    this.loadImages(this.images_hurt);
    this.loadImages(this.images_idle);
    this.loadImages(this.images_long_idle);
    this.applyGravityCharacter();
    this.animate();
  }

  /**
   * Starts the character's movement and animation intervals.
   */
  animate() {
    setStoppableInterval(() => {
      if (
        this.world &&
        this.world.keyboard.right &&
        this.posX < this.world.level.levelEndX
      ) {
        this.moveRight();
      }
      if (this.world && this.world.keyboard.left && this.posX > 0) {
        this.moveLeft();
      }
      if (this.world && this.world.keyboard.space && !this.isAboveGround()) {
        this.speedPosY = 30;
        this.currentImage = 0;
        characterJumpSound.play();
      }
      this.world.cameraPosX = -this.posX + 80;
    }, 1000 / 24);

    setStoppableInterval(() => {
      if (this.isDead()) {
        this.deathAnimation();
      } else if (this.isHurt()) {
        this.hurtAnimation();
      } else if (this.isAboveGround()) {
        this.jumpAnimation();
      } else if (this.isWalking()) {
        this.walkingAnimation();
      } else if (this.isStanding()) {
        this.idleAnimation();
      } else {
        this.longIdleAnimation();
      }
    }, 1000 / 12);
  }

  /**
   * Plays the death animation, sound, and triggers game over.
   */
  deathAnimation() {
    this.playAnimation(this.images_dead);
    characterDeadSound.play();
    setGameSoundsToNull();
    gameLost();
    this.stopGameGeneral();
  }

  /**
   * Stops the game and resets endboss state after a delay.
   */
  stopGameGeneral() {
    setTimeout(() => {
      stopAllIntervals();
      arrivedEndboss = false;
    }, 700);
  }

  /**
   * Plays the hurt animation and sound, resets long idle state.
   */
  hurtAnimation() {
    this.playAnimation(this.images_hurt);
    characterHurtSound.play();
    this.longIdleState = 0;
  }

  /**
   * Plays the jump animation if the character is jumping.
   */
  jumpAnimation() {
    if (this.speedPosY > 0) {
      if (this.currentImage > 5) {
        this.currentImage = 5;
      } else if (this.currentImage > this.images_jumping.length) {
        this.currentImage = this.images_jumping - 1;
      }
    }
    this.playAnimation(this.images_jumping);
    this.longIdleState = 0;
  }

  /**
   * Checks if the character is currently walking.
   * @returns {boolean}
   */
  isWalking() {
    return this.world.keyboard.right || this.world.keyboard.left;
  }

  /**
   * Plays the walking animation and resets long idle state.
   */
  walkingAnimation() {
    this.playAnimation(this.images_walking);
    this.longIdleState = 0;
  }

  /**
   * Checks if the character is standing (not idle for long).
   * @returns {boolean}
   */
  isStanding() {
    return this.longIdleState < 30;
  }

  /**
   * Plays the idle animation and increments the long idle state.
   */
  idleAnimation() {
    this.playAnimation(this.images_idle);
    this.longIdleState++;
  }

  /**
   * Plays the long idle animation.
   */
  longIdleAnimation() {
    this.playAnimation(this.images_long_idle);
  }
}
