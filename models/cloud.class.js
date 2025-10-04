/**
 * Cloud class that extends 'MovableObjects'
 * -> The class is in the background
 * @extends MovableObject
 */
class Cloud extends MovableObject {

    width = 480;
    height = 240;


    /**
     * Initializes the background cloud object
     * -> Loads the images + sets it's initial position + speed
     * -> Sets up 'animate()'
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.posY = 10 + Math.random() * 50;
        this.posX = Math.random() * 2000;
        this.speed = 0.05;
        this.animate();
    }


    /**
     * Responsible for the animation of the cloud
     * -> Uses 'setStoppableInterval()' to move cloud to the left at 60 frames per second
     */
    animate() {
        setStoppableInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);
    }
}