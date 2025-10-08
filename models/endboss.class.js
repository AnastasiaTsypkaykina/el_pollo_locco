/**
 * Endboss class represents the behavior of the endboss enemy.
 * Handles animations, state transitions, and sound effects.
 * Inherits from MovableObject.
 *
 * @class
 * @extends MovableObject
 * @property {number} posY - The vertical position of the endboss (default: 150).
 * @property {number} height - The height of the endboss (default: 300).
 * @property {number} width - The width of the endboss (default: 230).
 * @property {boolean} arrivingAnimationState - Whether the endboss has finished the attention animation.
 * @property {string[]} images_walking - Array of image paths for walking animation.
 * @property {string[]} images_attention - Array of image paths for attention/alert animation.
 * @property {string[]} images_attack - Array of image paths for attack animation.
 * @property {string[]} images_hurt - Array of image paths for hurt animation.
 * @property {string[]} images_dead - Array of image paths for dead animation.
 * @property {number} posX - The horizontal position of the endboss (default: 3200).
 * @property {number} speed - The movement speed of the endboss (default: 10).
 *
 * @constructor
 */
class Endboss extends MovableObject {
  posY = 150;
  height = 300;
  width = 230;
  arrivingAnimationState = false;

  images_walking = [
    "./img/4_enemie_boss_chicken/1_walk/G1.png",
    "./img/4_enemie_boss_chicken/1_walk/G2.png",
    "./img/4_enemie_boss_chicken/1_walk/G3.png",
    "./img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  images_attention = [
    "./img/4_enemie_boss_chicken/2_alert/G5.png",
    "./img/4_enemie_boss_chicken/2_alert/G6.png",
    "./img/4_enemie_boss_chicken/2_alert/G7.png",
    "./img/4_enemie_boss_chicken/2_alert/G8.png",
    "./img/4_enemie_boss_chicken/2_alert/G9.png",
    "./img/4_enemie_boss_chicken/2_alert/G10.png",
    "./img/4_enemie_boss_chicken/2_alert/G11.png",
    "./img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  images_attack = [
    "./img/4_enemie_boss_chicken/3_attack/G13.png",
    "./img/4_enemie_boss_chicken/3_attack/G14.png",
    "./img/4_enemie_boss_chicken/3_attack/G15.png",
    "./img/4_enemie_boss_chicken/3_attack/G16.png",
    "./img/4_enemie_boss_chicken/3_attack/G17.png",
    "./img/4_enemie_boss_chicken/3_attack/G18.png",
    "./img/4_enemie_boss_chicken/3_attack/G19.png",
    "./img/4_enemie_boss_chicken/3_attack/G20.png",
  ];
  images_hurt = [
    "./img/4_enemie_boss_chicken/4_hurt/G21.png",
    "./img/4_enemie_boss_chicken/4_hurt/G22.png",
    "./img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  images_dead = [
    "./img/4_enemie_boss_chicken/5_dead/G24.png",
    "./img/4_enemie_boss_chicken/5_dead/G25.png",
    "./img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * Creates a new Endboss instance, loads images, sets position and speed, and starts animation.
   */
  constructor() {
    super().loadImage(this.images_attention[0]);
    this.loadImages(this.images_attention);
    this.loadImages(this.images_walking);
    this.loadImages(this.images_attack);
    this.loadImages(this.images_hurt);
    this.loadImages(this.images_dead);
    this.posX = 3200;
    this.speed = 10;
    this.endbossAnimation();
  }

  /**
   * Starts the main animation loop for the endboss, switching states based on proximity and health.
   */
  endbossAnimation() {
    setStoppableInterval(() => {
      if (this.arrivingEndboss()) {
        arrivedEndboss = true;
        this.endbossAttentionAnimation();
      } else if (this.characterIsNearEndboss()) {
        this.endbossAttackingAnimation();
      } else if (this.endbossIsHurt()) {
        this.endbossIsHurtAnimation();
      } else if (this.isDead()) {
        this.endbossIsDeadAnimation();
      } else if (this.endbossWalking() && this.arrivingAnimationState) {
        this.endbossIsWalking();
      }
    }, 120);
  }

  /**
   * Checks if the endboss is arriving (player is close enough).
   * @returns {boolean}
   */
  arrivingEndboss() {
    return this.posX - world.character.posX <= 600 && !arrivedEndboss;
  }

  /**
   * Plays the attention animation and sound, then sets the endboss to walk after a delay.
   */
  endbossAttentionAnimation() {
    this.playAnimation(this.images_attention);
    endbossAttentionSound.play();
    setTimeout(() => {
      this.arrivingAnimationState = true;
    }, 1500);
    this.endbossStartsWalking();
  }

  /**
   * Sets the endboss to start walking after a delay.
   */
  endbossStartsWalking() {
    setTimeout(() => {
      arrivedEndboss = true;
    }, 1500);
  }

  /**
   * Checks if the character is near the endboss.
   * @returns {boolean}
   */
  characterIsNearEndboss() {
    return this.posX - world.character.posX < 30;
  }

  /**
   * Plays the attacking animation and sound.
   */
  endbossAttackingAnimation() {
    this.playAnimation(this.images_attack);
    endbossAttackSound.play();
  }

  /**
   * Plays the hurt animation and sound.
   */
  endbossIsHurtAnimation() {
    this.playAnimation(this.images_hurt);
    endbossHurtSound.play();
  }

  /**
   * Handles the endboss death: plays animation, sound, triggers win, and stops the game.
   */
  endbossIsDeadAnimation() {
    this.endbossDeadAndWinningSound();
    setGameSoundsToNull();
    this.endbossDownFromCanvas();
    gameWon();
    this.stopGame();
  }

  /**
   * Stops the game and resets endboss state after a delay.
   */
  stopGame() {
    setTimeout(() => {
      stopAllIntervals();
      arrivedEndboss = false;
    }, 1500);
  }

  /**
   * Plays the dead animation and winning sound after a short delay.
   */
  endbossDeadAndWinningSound() {
    this.playAnimation(this.images_dead);
    setTimeout(() => {
      gameWonSound.play();
    }, 200);
  }

  /**
   * Animates the endboss falling down from the canvas after death.
   */
  endbossDownFromCanvas() {
    setTimeout(() => {
      setStoppableInterval(() => {
        this.posY += 20;
      }, 50);
    }, 500);
  }

  /**
   * Checks if the endboss should be walking.
   * @returns {boolean}
   */
  endbossWalking() {
    return arrivedEndboss === true;
  }

  /**
   * Plays the walking animation, music, and moves the endboss left.
   */
  endbossIsWalking() {
    this.playAnimation(this.images_walking);
    this.playEndbossMusic();
    this.moveLeft();
    this.otherDirection = false;
  }

  /**
   * Plays the endboss music and pauses the background music.
   */
  playEndbossMusic() {
    gameEndbossMusic.loop = true;
    gameEndbossMusic.play();
    backgroundSound.pause();
  }
}
