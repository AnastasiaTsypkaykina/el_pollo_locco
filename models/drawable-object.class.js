/**
 * Base class for all drawable objects in the game.
 * Handles image loading, drawing, and frame drawing.
 *
 * @class
 * @property {number} posX - The horizontal position of the object (default: 0).
 * @property {number} posY - The vertical position of the object (default: 80).
 * @property {number} height - The height of the object (default: 60).
 * @property {number} width - The width of the object (default: 50).
 * @property {HTMLImageElement} img - The current image of the object.
 * @property {Object.<string, HTMLImageElement>} imageCache - Cache of loaded images by path.
 * @property {number} currentImage - The current image index for animations.
 *
 * @method loadImage Loads a single image by path.
 * @method draw Draws the object on the canvas context.
 * @method drawFrame Draws a frame around the object (for Character or Chicken).
 * @method loadImages Loads multiple images into the cache.
 * @method resolveImageIndexCollectableObjects Resolves the image index for collectable objects based on collected count.
 * @method resolveImageIndexHealth Resolves the image index for health/status bars based on percentage.
 */
class DrawableObject {
  posX = 0;
  posY = 80;
  height = 60;
  width = 50;
  img;
  imageCache = {};
  currentImage = 0;

  /**
   * Loads a single image by path.
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the object on the canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas 2D context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
  }

  /**
   * Draws a frame around the object (for Character or Chicken).
   * @param {CanvasRenderingContext2D} ctx - The canvas 2D context.
   */
  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken) {
      ctx.beginPath();
      ctx.lineWidth = "4";
      ctx.strokeStyle = "blue";
      ctx.rect(this.posX, this.posY, this.width, this.height);
      ctx.stroke();
    }
  }

  /**
   * Loads multiple images into the cache.
   * @param {string[]} arr - Array of image paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Resolves the image index for collectable objects based on collected count.
   * @returns {number}
   */
  resolveImageIndexCollectableObjects() {
    if (this.collected == 0) {
      return 0;
    } else if (this.collected == 1) {
      return 1;
    } else if (this.collected == 2) {
      return 2;
    } else if (this.collected == 3) {
      return 3;
    } else if (this.collected == 4) {
      return 4;
    } else {
      return 5;
    }
  }

  /**
   * Resolves the image index for health/status bars based on percentage.
   * @returns {number}
   */
  resolveImageIndexHealth() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
