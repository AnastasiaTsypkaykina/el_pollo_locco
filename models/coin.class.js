/**
 * Represents a coin collectable object in the game world.
 * Inherits from MovableObject.
 *
 * @class
 * @extends MovableObject
 * @property {number} height - The height of the coin (default: 100).
 * @property {number} width - The width of the coin (default: 100).
 * @property {number} posX - The horizontal position of the coin (randomized on creation).
 * @property {number} posY - The vertical position of the coin (randomized on creation).
 * @property {Object} offset - The collision offset for the coin.
 * @property {number} offset.top
 * @property {number} offset.bottom
 * @property {number} offset.left
 * @property {number} offset.right
 * @property {string[]} images_coin - Array of image paths for coin animation.
 *
 * @constructor
 */
class Coin extends MovableObject {
  height = 100;
  width = 100;
  posX = 50;
  posY = 50;
  offset = {
    top: 10,
    bottom: 40,
    left: 20,
    right: 20,
  };
  images_coin = ["./img/8_coin/coin_1.png", "./img/8_coin/coin_2.png"];

  /**
   * Creates a new Coin instance, loads images, randomizes position, and starts animation.
   */
  constructor() {
    super().loadImage("./img/8_coin/coin_1.png");
    this.loadImages(this.images_coin);
    this.posX += Math.random() * 2000;
    this.posY += Math.random() * 180;
    this.collectablesAnimation();
  }

  /**
   * Starts the coin animation by cycling through images.
   */
  collectablesAnimation() {
    setStoppableInterval(() => {
      this.playAnimation(this.images_coin);
    }, 240);
  }
}
