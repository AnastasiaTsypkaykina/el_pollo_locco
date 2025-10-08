/**
 * Represents the coin status bar UI element.
 * Inherits from Statusbar and displays the number of collected coins.
 *
 * @class
 * @extends Statusbar
 * @property {string[]} statusbar_images - Array of image paths for different coin bar states.
 * @property {number} collected - Number of coins currently collected.
 *
 * @constructor
 */
class CoinBar extends Statusbar {
  statusbar_images = [
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
  ];
  collected = 0;

  /**
   * Creates a new CoinBar instance, loads images, and initializes the bar.
   */
  constructor() {
    super();
    this.loadImages(this.statusbar_images);
    this.setCollected(0);
    this.posX = 20;
    this.posY = 100;
    this.width = 180;
    this.height = 50;
  }

  /**
   * Sets the number of collected coins and updates the status bar image.
   * @param {number} collected
   */
  setCollected(collected) {
    this.collected = collected;
    let path =
      this.statusbar_images[this.resolveImageIndexCollectableObjects()];
    this.img = this.imageCache[path];
  }
}
