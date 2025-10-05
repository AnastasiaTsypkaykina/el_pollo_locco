/**
 * Endboss class represents the behavior of the endboss
 * @extends MovableObject
 */
class Endboss extends MovableObject {

    posY = 150;
    height = 300;
    width = 230;
    arrivingAnimationState = false;

    images_walking = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    images_attention = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    images_attack = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    images_hurt = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    images_dead = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor() {
        super().loadImage(this.images_attention[0]);
        this.loadImages(this.images_attention);
        this.loadImages(this.images_walking);
        this.loadImages(this.images_attack);
        this.loadImages(this.images_hurt);
        this.loadImages(this.images_dead);
        
        this.posX = 3200;
        this.speed = 10;
        this.endbossAnimation();
    }
   
    endbossAnimation() {
		setStoppableInterval(() => {
            if (this.arrivingEndboss()) {
                arrivedEndboss = true;
                this.endbossAttentionAnimation();
            } else if (this.characterIsNearEndboss()) {
                this.endbossAttackingAnimation();
            } else if (this.endbossIsHurt()) {
                this.endbossIsHurtAnimation();
            } else if (this.isDead()) {
                this.endbossIsDeadAnimation();
            } else if (this.endbossWalking() && this.arrivingAnimationState) {
                this.endbossIsWalking();
            }
		}, 120);
	}
    
    arrivingEndboss() {
        return this.posX - world.character.posX <= 600 && !arrivedEndboss;
    }

    endbossAttentionAnimation() {
        this.playAnimation(this.images_attention);
        endbossAttentionSound.play();
        setTimeout(() => {
            this.arrivingAnimationState = true;
        }, 1500);
        this.endbossStartsWalking();
    }
    
    endbossStartsWalking() {
        setTimeout(() => {
            arrivedEndboss = true;
        }, 1500);
    }
    
    characterIsNearEndboss() {
        return this.posX - world.character.posX < 30;
    }
    
    endbossAttackingAnimation() {
        this.playAnimation(this.images_attack);
        endbossAttackSound.play();
    }
   
    endbossIsHurtAnimation() {
        this.playAnimation(this.images_hurt);
        endbossHurtSound.play();
    }

    endbossIsDeadAnimation() {
        this.endbossDeadAndWinningSound();
        setGameSoundsToNull();
        this.endbossDownFromCanvas();
        gameWon();
        this.stopGame();
    }

    stopGame() {
        setTimeout(() => {
            stopAllIntervals();
            arrivedEndboss = false;
        }, 1500);
    }

    endbossDeadAndWinningSound() {
        this.playAnimation(this.images_dead);
        setTimeout(() => {
            gameWonSound.play();
        }, 200);
    }

    endbossDownFromCanvas() {
        setTimeout(() => {
            setStoppableInterval(() => {
                this.posY += 20;
            }, 50);
        }, 500);
    }

    endbossWalking() {
        return arrivedEndboss === true;
    }

    endbossIsWalking() {
        this.playAnimation(this.images_walking);
        this.playEndbossMusic();
        this.moveLeft();
        this.otherDirection = false;
    }

    playEndbossMusic() {
        gameEndbossMusic.loop = true;
        gameEndbossMusic.play();
        backgroundSound.pause();
    }
}