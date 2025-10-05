class ThrowableObject extends MovableObject {
  images_throwing_bottle = [
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];
  images_splash_bottle = [
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(posX, posY, characterDirection) {
    super().loadImage(
      "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.loadImages(this.images_throwing_bottle);
    this.loadImages(this.images_splash_bottle);
    this.posX = posX;
    this.posY = posY;
    this.characterDirection = characterDirection;
    this.throw();
    this.bottleAnimation();
  }

  throw() {
    this.speedY = 30;
    this.applyGravityBottle();
    this.throwingLeftOrRight();
  }

  throwingLeftOrRight() {
    throwBottleSound.play();
    this.throwingInterval = setInterval(() => {
      if (this.characterDirection) {
        this.posX -= 10;
      } else {
        this.posX += 10;
      }
    }, 25);

    setTimeout(() => clearInterval(this.throwingInterval), 1000);
  }

  bottleAnimation() {
    this.splashOrThrowingAnimation();
    this.updateBottleStrikesEndboss();
  }

  splashOrThrowingAnimation() {
    this.splashAnimation = setInterval(() => {
      if (this.posY > 240 || world.bottleStrikesEndboss) {
        this.playSplashAnimation();
      } else {
        this.playAnimation(this.images_throwing_bottle);
      }
    }, 1000 / 15);
  }

  updateBottleStrikesEndboss() {
    setTimeout(() => {
      world.bottleStrikesEndboss = false;
    }, 50);
  }

  playSplashAnimation() {
    this.playAnimation(this.images_splash_bottle);
    bottleSplashSound.play();
    this.speed = 0;
    this.height = 100;
    this.splashEffect();
    clearInterval(this.splashAnimation);
  }

  splashEffect() {
    setInterval(() => {
      this.posY += 10;
      this.deleteBottle();
    }, 70);
  }

  deleteBottle() {
    setTimeout(() => {
      this.posY = 500;
    }, 300);
  }
}
