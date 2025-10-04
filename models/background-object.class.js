/**
 * Class representing a background object that extends 'MovableObject'
 * Each object has 'width' and 'height' -> placed on a specific location on the canvas
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {

    width = 720;
    height = 480;


    /**
     * Creates new 'BackgroundImg' instance
     * -> Loads images for object + set initial x and y-coordinates
     * -> Y-coordinate is calculated to align the bottom of the object with bottom of the canvas
     * @param {string} imagePath -> path background image
     * @param {number} posX -> Initial x-coordinate background object
     */
    constructor(imagePath, posX) {
        super().loadImage(imagePath);

        this.posX = posX;
        this.posY = 480 - this.height;
    }
}