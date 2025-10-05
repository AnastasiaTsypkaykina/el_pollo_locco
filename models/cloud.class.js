class Cloud extends MovableObject {

    width = 480;
    height = 240;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.posY = 10 + Math.random() * 50;
        this.posX = Math.random() * 2000;
        this.speed = 0.05;
        this.animate();
    }

    animate() {
        setStoppableInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);
    }
}