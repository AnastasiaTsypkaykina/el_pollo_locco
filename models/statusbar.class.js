class Statusbar extends DrawableObject {
  IMAGES_HEALTH = [
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];
  percentage = 100;
  collected=0;

  constructor() {
    super();
    this.loadImages(this.IMAGES_HEALTH);
    this.setPercentage(100);
    this.x = 40;
    this.y = 0;
    this.width = 200;
    this.height = 60;
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let imagePath = this. IMAGES_HEALTH[this.resolveImageIndexHealth()];
    this.img = this. imageCache[imagePath];
  }

  
}
