/**
 * Represents a cloud object in the game world.
 * Inherits from MovableObject.
 *
 * @class
 * @extends MovableObject
 * @property {number} width - The width of the cloud (default: 480).
 * @property {number} height - The height of the cloud (default: 240).
 * @property {number} posX - The horizontal position of the cloud (randomized on creation).
 * @property {number} posY - The vertical position of the cloud (randomized on creation).
 * @property {number} speed - The movement speed of the cloud (default: 0.05).
 *
 * @constructor
 */
class Cloud extends MovableObject {
  width = 480;
  height = 240;

  /**
   * Creates a new Cloud instance, loads image, randomizes position, and starts animation.
   */
  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.posY = 10 + Math.random() * 50;
    this.posX = Math.random() * 2000;
    this.speed = 0.05;
    this.animate();
  }

  /**
   * Starts the cloud movement animation (moves left).
   */
  animate() {
    setStoppableInterval(() => {
      this.moveLeft();
      this.otherDirection = false;
    }, 1000 / 60);
  }
}
