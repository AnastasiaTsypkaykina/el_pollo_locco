/**
 * Represents the endboss status bar UI element.
 * Inherits from Statusbar and displays the endboss's health.
 *
 * @class
 * @extends Statusbar
 * @property {string[]} statusbar_images - Array of image paths for different endboss bar states.
 * @property {number} percentage - The current health percentage of the endboss.
 *
 * @constructor
 */
class EndbossBar extends Statusbar {
  statusbar_images = [
    "./img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
    "./img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
    "./img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
    "./img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
    "./img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
    "./img/7_statusbars/2_statusbar_endboss/blue/blue100.png",
  ];
  percentage = 100;

  /**
   * Creates a new EndbossBar instance, loads images, and initializes the bar.
   */
  constructor() {
    super();
    this.loadImages(this.statusbar_images);
    this.setPercentage(100);
    this.posX = 480;
    this.posY = 27;
    this.width = 170;
    this.height = 34;
  }

  /**
   * Sets the health percentage and updates the status bar image.
   * @param {number} percentage
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.statusbar_images[this.resolveImageIndexHealth()];
    this.img = this.imageCache[path];
  }
}
