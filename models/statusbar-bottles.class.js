class BottleBar extends Statusbar {
  statusbar_images = [
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
  ];
  collected = 0;

  constructor() {
    super();
    this.loadImages(this.statusbar_images);
    this.setCollected(0);
    this.posX = 20;
    this.posY = 55;
    this.width = 180;
    this.height = 50;
  }

  setCollected(collected) {
    this.collected = collected;
    let path =
      this.statusbar_images[this.resolveImageIndexCollectableObjects()];
    this.img = this.imageCache[path];
  }
}
