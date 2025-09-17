class MovableObject {
    x=80;
    y=200;
    img;
    height=230;
    width=100; 
    imageCache = {};
    speed=0.15;
    otherDirection = false;   
    
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