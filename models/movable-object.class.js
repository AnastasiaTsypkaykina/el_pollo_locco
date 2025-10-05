class MovableObject extends DrawableObject {
  speed = 0.1;
  otherDirection = false;
  speedPosY = 20;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;

  offset = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  };

  applyGravityBottle() {
    setStoppableInterval(() => {
      if (this.isAboveGround() || this.speedPosY > 0) {
        this.posY -= this.speedPosY;
        this.speedPosY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  applyGravityCharacter() {
    setStoppableInterval(() => {
      if (this.isAboveGround() || this.speedPosY > 0) {
        this.posY -= this.speedPosY;
        this.speedPosY -= this.acceleration;
      } else {
        this.posY = 120;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject && this.posY < 300) {
      return true;
    } else {
      return this.posY < 120;
    }
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.posX += this.speed;
    this.otherDirection = false;
  }

  moveLeft() {
    this.posX -= this.speed;
    this.otherDirection = true;
  }

  isColliding(movableObject) {
    return (
      this.posX + this.width - this.offset.right >
        movableObject.posX + movableObject.offset.left &&
      this.posY + this.height - this.offset.bottom >
        movableObject.posY + movableObject.offset.top &&
      this.posX + this.offset.left <
        movableObject.posX + movableObject.width - movableObject.offset.right &&
      this.posY + this.offset.top <
        movableObject.posY + movableObject.height - movableObject.offset.bottom
    );
  }

  hit() {
    this.energy -= 1;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  hittedByEndboss() {
    this.energy -= 10;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  hittedByBottle() {
    this.energy -= 19;
    if (this.energy < 10) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    // Difference in ms
    let timepassed = new Date().getTime() - this.lastHit;
    // In seconds
    timepassed = timepassed / 1000;
    return timepassed < 0.5;
  }

  endbossIsHurt() {
    // Difference in ms
    let timepassed = new Date().getTime() - this.lastHit;
    // In seconds
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  chickenAnimation() {
    this.movingLeft();
    this.checkingDeath();
  }

  movingLeft() {
    this.walkingLeft = setInterval(() => {
      this.moveLeft();
      this.otherDirection = false;
    }, 1000 / 60);
  }

  checkingDeath() {
    this.death = setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.images_dead);
        this.deadChicken();
      } else {
        this.playAnimation(this.images_walking);
      }
    }, 150);
  }

  deadChicken() {
    setTimeout(() => {
      clearInterval(this.walkingLeft);
      clearInterval(this.death);
    }, 100);
  }
}
