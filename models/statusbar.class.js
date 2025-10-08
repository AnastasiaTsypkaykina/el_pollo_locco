/**
 * Represents a status bar UI element for displaying health or other stats.
 * Inherits from DrawableObject.
 *
 * @class
 * @extends DrawableObject
 * @property {string[]} statusbar_images - Array of image paths for different status bar states.
 * @property {number} percentage - The current percentage value (e.g., health).
 *
 * @constructor
 */
class Statusbar extends DrawableObject {
  statusbar_images = [
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];
  percentage = 100;

  /**
   * Creates a new Statusbar instance, loads images, and initializes the bar.
   */
  constructor() {
    super();
    this.loadImages(this.statusbar_images);
    this.setPercentage(100);
    this.posX = 20;
    this.posY = 10;
    this.width = 180;
    this.height = 50;
  }

  /**
   * Sets the percentage value and updates the status bar image.
   * @param {number} percentage
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.statusbar_images[this.resolveImageIndexHealth()];
    this.img = this.imageCache[path];
  }
}
