class MovableObject {
    x=80;
    y=200;
    img;
    height=230;
    width=100; 
    imageCache = {};   
    
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
        console.log('move right');
     }

     moveLeft() {

     }
}