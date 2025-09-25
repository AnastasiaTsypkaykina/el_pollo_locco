
 class BottleBar extends Statusbar {

    STATUSBAR_BOTTLES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'  
    ];

    collected = 0;
       
    constructor() {
        super();
        this.loadImages(this.STATUSBAR_BOTTLES);
        this.setCollected(0);
        this.x = 40;
        this.y = 60;
        this.width = 200;
        this.height = 60;
    }
    
    setCollected(collected) {
        this.collected = collected;
        let path = this.STATUSBAR_BOTTLES[this.resolveImageIndexCollectableObjects()];
        this.img = this.imageCache[path];
    }
}