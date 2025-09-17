class SmallChicken extends MovableObject {
    IMAGES_WALKING= [
        "./img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "./img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "./img/3_enemies_chicken/chicken_small/1_walk/3_w.png"       
    ];
    currentImage=0;

    constructor(){        
        super().loadImage("./img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
        this.x = 200 + Math.random() * 500; 
        this.height=30;
        this.width=30;
        this.y=390;
        this.speed=0.15+Math.random()*0.25;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }
    animate(){    
        this.moveLeft();    
        setInterval(() => {        
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = this.IMAGES_WALKING[i];
        this.img = this.imageCache[path];
        this.currentImage++;        
        }, 100);

    }

}