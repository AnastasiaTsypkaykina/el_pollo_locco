class MovableObject {
    x=80;
    y=200;
    img;
    height=230;
    width=100; 
    imageCache = {};
    speed=0.15;
    otherDirection = false;
    speedY=0;
    acceleration=2.5;
    
    applyGravity() {       
        setInterval(()=>{
            if (this.isAboveGround() || this.speedY >0){
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            }
        }, 50);
    }

    isAboveGround() {
        return this.y < 200;
    }
    
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path]=img;
        });
    }

    moveRight() {
        setInterval(() => {
            this.x += this.speed;            
        }, 1000 / 60);        
     }

     moveLeft() {        
         setInterval(() => {
            this.x -= this.speed;            
        }, 1000 / 60);
     }

     playAnimation(images) {        
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;        
        
     }
     
}