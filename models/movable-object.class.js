class MovableObject {
    x=80;
    y=200;
    img;
    height=250;
    width=100;    
    
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('move right');
     }

     moveLeft() {

     }
}