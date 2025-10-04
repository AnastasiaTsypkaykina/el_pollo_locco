/**
 * EndbossBar class represents the status bar of the endboss object
 * @extends StatusBar
 */
class EndbossBar extends Statusbar {

    statusbar_images = [
        './img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        './img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        './img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        './img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        './img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        './img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ];

    percentage = 100;


    /**
     * Initializes the status bar of the bottle object
     * -> Loads images
     * -> Sets initial percentage to 100
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
     * Updates the precentage property of the status bar object
     * -> Changes displayed image according to health percentage
     * @param {number} percent -> Health percentage of the endboss
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.statusbar_images[this.resolveImageIndexHealth()];
        this.img = this.imageCache[path];
    }
}