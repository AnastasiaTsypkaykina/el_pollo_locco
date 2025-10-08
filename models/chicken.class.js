/**
 * Represents a normal chicken enemy in the game world.
 * Inherits from MovableObject.
 *
 * @class
 * @extends MovableObject
 * @property {number} posY - The vertical position of the chicken (default: 350).
 * @property {number} height - The height of the chicken (default: 80).
 * @property {number} width - The width of the chicken (default: 60).
 * @property {Object} offset - The collision offset for the chicken.
 * @property {number} offset.top
 * @property {number} offset.bottom
 * @property {number} offset.left
 * @property {number} offset.right
 * @property {string[]} images_walking - Array of image paths for walking animation.
 * @property {string[]} images_dead - Array of image paths for dead animation.
 * @property {number} posX - The horizontal position of the chicken (randomized on creation).
 * @property {number} speed - The movement speed of the chicken (randomized on creation).
 *
 * @constructor
 */
class Chicken extends MovableObject {
  posY = 350;
  height = 80;
  width = 60;
  offset = {
    top: 0,
    bottom: 0,
    left: 10,
    right: 10,
  };
  images_walking = [
    "./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  images_dead = ["./img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  /**
   * Creates a new Chicken instance, loads images, randomizes position and speed, and starts animation.
   */
  constructor() {
    super().loadImage("./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.images_walking);
    this.loadImages(this.images_dead);
    this.posX = 360 + Math.random() * 2000;
    this.speed = 0.1 + Math.random() * 0.4;
    this.chickenAnimation();
  }
}
