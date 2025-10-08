/**
 * Represents a bottle collectable or throwable object in the game world.
 * Inherits from MovableObject.
 *
 * @class
 * @extends MovableObject
 * @property {number} height - The height of the bottle (default: 80).
 * @property {number} width - The width of the bottle (default: 80).
 * @property {number} posX - The horizontal position of the bottle (randomized on creation).
 * @property {number} posY - The vertical position of the bottle (default: 360).
 * @property {Object} offset - The collision offset for the bottle.
 * @property {number} offset.top
 * @property {number} offset.bottom
 * @property {number} offset.left
 * @property {number} offset.right
 * @property {string[]} images_bottle - Array of image paths for bottle animation.
 *
 * @constructor
 */
class Bottle extends MovableObject {
  height = 80;
  width = 80;
  posX = 200;
  posY = 360;

  offset = {
    top: 0,
    bottom: 0,
    left: 20,
    right: 20,
  };

  images_bottle = [
    "./img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "./img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  /**
   * Creates a new Bottle instance, loads images, randomizes position, and starts animation.
   */
  constructor() {
    super().loadImage("./img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.loadImages(this.images_bottle);
    this.posX += Math.random() * 2000;
    this.collectablesAnimation();
  }

  /**
   * Starts the bottle animation by cycling through images.
   */
  collectablesAnimation() {
    setStoppableInterval(() => {
      this.playAnimation(this.images_bottle);
    }, 360);
  }
}
