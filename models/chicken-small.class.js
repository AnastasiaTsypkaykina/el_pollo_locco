class SmallChicken extends MovableObject {

    posY = 380;
    height = 50;
    width = 40;

    offset = {
        top: 0,
        bottom: 0,
        left: 10,
        right: 10,
    };

    images_walking = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png', 
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png' 
    ];

    images_dead = [
        './img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.images_walking);
        this.loadImages(this.images_dead);
        this.posX = 360 + Math.random() * 2000;
        this.speed = 0.1 + Math.random() * 0.4;
        this.chickenAnimation();
    }
}