/**
 * DrawableObject class represents the objects that are drawn on the canvas
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
     * Loads images from given path
     * @param {string} path -> Path to image files
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * Draws object on canvas using the provided 2D rendering context
     * @param {CanvasRenderingContext2D} ctx -> 2D rendering context which to draw
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
    }


    /**
     * Draws a frame around object -> to visualized collision of objects
     * @param {*} ctx 
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '4';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.posX, this.posY, this.width, this.height);
            ctx.stroke();
        }
    }


    /**
     * Loads multiple images from path specified in array
     * -> The images are stored in the 'imageCache' of the object for future use
     * @param {string[]} arr -> Array of paths to images files (['img/image1.png', 'img/image2.png', ...])
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * Determines the images index for collectable objects based on their collected status
     * @returns {number} -> The index of the image that is used
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
     * Determines the images index for health objects based on their health percentage
     * @returns {number} -> The index of the image that is used
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