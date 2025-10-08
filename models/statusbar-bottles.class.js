/**
 * Represents the bottle status bar UI element.
 * Inherits from Statusbar and displays the number of collected bottles.
 *
 * @class
 * @extends Statusbar
 * @property {string[]} statusbar_images - Array of image paths for different bottle bar states.
 * @property {number} collected - Number of bottles currently collected.
 *
 * @constructor
 */
class BottleBar extends Statusbar {
  statusbar_images = [
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
  ];
  collected = 0;

  /**
   * Creates a new BottleBar instance, loads images, and initializes the bar.
   */
  constructor() {
    super();
    this.loadImages(this.statusbar_images);
    this.setCollected(0);
    this.posX = 20;
    this.posY = 55;
    this.width = 180;
    this.height = 50;
  }

  /**
   * Sets the number of collected bottles and updates the status bar image.
   * @param {number} collected
   */
  setCollected(collected) {
    this.collected = collected;
    let path =
      this.statusbar_images[this.resolveImageIndexCollectableObjects()];
    this.img = this.imageCache[path];
  }
}
