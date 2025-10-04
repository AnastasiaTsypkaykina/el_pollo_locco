/**
 * Chicken class that extends 'MovableObjects'
 * @extends MovableObject
 */
class Chicken extends MovableObject {
    
    posY = 350;
    height = 80;
    width = 60;

    offset = {
        top: 0,
        bottom: 0,
        left: 10,
        right: 10,
    };

    images_walking = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    images_dead = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];

    /**
     * Initializes the chicken object by loading the walking + dead images
     * -> Sets initial x position randomly between 360 and 2360
     * -> Sets speed randomly between 0.1 and 0.5
     * -> Sets up 'chickenAnimation()'
     */

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.images_walking);
        this.loadImages(this.images_dead);
        
        this.posX = 360 + Math.random() * 2000;
        this.speed = 0.1 + Math.random() * 0.4;
        this.chickenAnimation();
    }
}