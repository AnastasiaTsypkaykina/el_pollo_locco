/**
 * Represents a background object in the game world.
 * Inherits from MovableObject and is used for rendering background layers.
 *
 * @class
 * @extends MovableObject
 * @property {number} width - The width of the background object (default: 720).
 * @property {number} height - The height of the background object (default: 480).
 * @property {number} posX - The horizontal position of the background object.
 * @property {number} posY - The vertical position of the background object (bottom-aligned).
 *
 * @constructor
 * @param {string} imagePath - The path to the background image.
 * @param {number} posX - The horizontal position of the background object.
 */
class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;

  constructor(imagePath, posX) {
    super().loadImage(imagePath);
    this.posX = posX;
    this.posY = 480 - this.height;
  }
}
