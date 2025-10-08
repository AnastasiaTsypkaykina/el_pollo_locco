/**
 * Represents a small chicken enemy in the game world.
 * Inherits from MovableObject.
 *
 * @class
 * @extends MovableObject
 * @property {number} posY - The vertical position of the small chicken (default: 380).
 * @property {number} height - The height of the small chicken (default: 50).
 * @property {number} width - The width of the small chicken (default: 40).
 * @property {Object} offset - The collision offset for the small chicken.
 * @property {number} offset.top
 * @property {number} offset.bottom
 * @property {number} offset.left
 * @property {number} offset.right
 * @property {string[]} images_walking - Array of image paths for walking animation.
 * @property {string[]} images_dead - Array of image paths for dead animation.
 * @property {number} posX - The horizontal position of the small chicken (randomized on creation).
 * @property {number} speed - The movement speed of the small chicken (randomized on creation).
 *
 * @constructor
 */
class SmallChicken extends MovableObject {
  posY = 380;
  height = 50;
  width = 40;
  offset = {
    top: 0,
    bottom: 0,
    left: 10,
    right: 10,
  };
  images_walking = [
    "./img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  images_dead = ["./img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  /**
   * Creates a new SmallChicken instance, loads images, randomizes position and speed, and starts animation.
   */
  constructor() {
    super().loadImage("./img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.images_walking);
    this.loadImages(this.images_dead);
    this.posX = 360 + Math.random() * 2000;
    this.speed = 0.1 + Math.random() * 0.4;
    this.chickenAnimation();
  }
}
