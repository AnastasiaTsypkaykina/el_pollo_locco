class World {
  character = new Character(); 
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds= new Cloud();
  ctx;
  canvas;

  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.draw();
  }



  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //cleart the canvas

    this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
    for (let i = 0; i < this.enemies.length; i++) {
      this.ctx.drawImage(this.enemies[i].img, this.enemies[i].x, this.enemies[i].y, this.enemies[i].width, this.enemies[i].height);
    }
    this.ctx.drawImage(this.clouds.img, this.clouds.x, this.clouds.y, this.clouds.width, this.clouds.height);

    //draw() wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
     });
  }
}
