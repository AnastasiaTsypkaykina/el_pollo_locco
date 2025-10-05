class DrawableObject {
  posX = 0;
  posY = 80;
  height = 60;
  width = 50;
  img;
  imageCache = {};
  currentImage = 0;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken) {
      ctx.beginPath();
      ctx.lineWidth = "4";
      ctx.strokeStyle = "blue";
      ctx.rect(this.posX, this.posY, this.width, this.height);
      ctx.stroke();
    }
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  resolveImageIndexCollectableObjects() {
    if (this.collected == 0) {
      return 0;
    } else if (this.collected == 1) {
      return 1;
    } else if (this.collected == 2) {
      return 2;
    } else if (this.collected == 3) {
      return 3;
    } else if (this.collected == 4) {
      return 4;
    } else {
      return 5;
    }
  }

  resolveImageIndexHealth() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
