/**
 * Coin class for collectable coins
 * @extends MovableObject
 */
class Coin extends MovableObject {
    height = 100;
    width = 100;
    posX = 50;
    posY = 50;

    offset = {
        top: 10,
        bottom: 40,
        left: 20,
        right: 20,
    };
    
    images_coin = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];


    /**
     * Initializes the coin object
     * -> Loads image + sets initial x-cooridnate randomly
     * -> Loads 'collectablesAnimation()'
     */
    constructor() {
        super().loadImage('./img/8_coin/coin_1.png');
        this.loadImages(this.images_coin);
        this.posX += Math.random() * 2000;
        this.posY += Math.random() * 180;
        this.collectablesAnimation();
    }


    /**
     * Sets up the animation
     * -> Uses 'setStoppableInterval()' to periodically update the coin's animation (every 0.24 seconds)
     */
    collectablesAnimation() {
        setStoppableInterval(() => {
            this.playAnimation(this.images_coin);
        }, 240);
    }
}