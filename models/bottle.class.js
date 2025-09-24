class Bottle extends MovableObject {
  IMAGES_BOTTLE = [
    "./img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "./img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  constructor() {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.loadImages(this.IMAGES_BOTTLE);
    this.posX += Math.random() * 2000;
    this.animate();
    this.x = 200 + Math.random() * 2000;
    this.height = 80;
    this.width = 80;
    this.y = 370;
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE);
    }, 360);
  }
}
