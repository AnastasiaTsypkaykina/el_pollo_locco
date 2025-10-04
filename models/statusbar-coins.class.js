/**
 * CoinBar class represents the status bar of the coin object
 * @extends StatusBar
 */
class CoinBar extends Statusbar {

    statusbar_images = [
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    collected = 0;


    /**
     * Initializes the status bar of the bottle object
     * -> Loads images
     * -> Sets initial collected count to 0
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
     * Updates the collected property of the status bar object
     * -> Changes displayed image according to collected amount
     * @param {number} collected -> Amount of coins
     */
    setCollected(collected) {
        this.collected = collected;
        let path = this.statusbar_images[this.resolveImageIndexCollectableObjects()];
        this.img = this.imageCache[path];
    }
}