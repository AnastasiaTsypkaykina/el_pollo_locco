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


    /**
     * Initializes object and sets up it's behavior
     */
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


    /**
     * Uses 'endbossAnimation' to contol animation based on current state
     * -> Checks if endboss is in various states like walking, attention, attack, hurt and dead
     * -> Triggers the corresponding animation
     * -> Interval is set to 120ms for smooth animation
     */
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


    /**
     * Checks if endboss is arrived
     * @returns {boolean} -> 'true' = is arrived, 'false' = not arrived
     */
    arrivingEndboss() {
        return this.posX - world.character.posX <= 600 && !arrivedEndboss;
    }


    /**
     * Plays the attention animation + soundtrack
     */
    endbossAttentionAnimation() {
        this.playAnimation(this.images_attention);
        endbossAttentionSound.play();
        setTimeout(() => {
            this.arrivingAnimationState = true;
        }, 1500);
        this.endbossStartsWalking();
    }


    /**
     * Starts walking animation after timeout
     */
    endbossStartsWalking() {
        setTimeout(() => {
            arrivedEndboss = true;
        }, 1500);
    }


    /**
     * Checks if character is near to the endboss
     * @returns {boolean} -> 'true' = near endboss, 'false' = not near endboss
     */
    characterIsNearEndboss() {
        return this.posX - world.character.posX < 30;
    }


    /**
     * Plays the attacking animation
     */
    endbossAttackingAnimation() {
        this.playAnimation(this.images_attack);
        endbossAttackSound.play();
    }


    /**
     * Plays the hurt animation
     */
    endbossIsHurtAnimation() {
        this.playAnimation(this.images_hurt);
        endbossHurtSound.play();
    }


    /**
     * Handles the death animation and related events for the endboss
     */
    endbossIsDeadAnimation() {
        this.endbossDeadAndWinningSound();
        setGameSoundsToNull();
        this.endbossDownFromCanvas();
        gameWon();
        this.stopGame();
    }


    /**
     * Stops game after delay
     */
    stopGame() {
        setTimeout(() => {
            stopAllIntervals();
            arrivedEndboss = false;
        }, 1500);
    }


    /**
     * Plays death animation + sound of endboss
     */
    endbossDeadAndWinningSound() {
        this.playAnimation(this.images_dead);
        setTimeout(() => {
            gameWonSound.play();
        }, 200);
    }


    /**
     * Moves endboss form canvas after death animation
     */
    endbossDownFromCanvas() {
        setTimeout(() => {
            setStoppableInterval(() => {
                this.posY += 20;
            }, 50);
        }, 500);
    }


    /**
     * Checks if endboss can walk
     * @returns {boolean} -> 'true' = can walk, 'false' = can't walk
     */
    endbossWalking() {
        return arrivedEndboss === true;
    }


    /**
     * Plays walking animation for the endboss
     */
    endbossIsWalking() {
        this.playAnimation(this.images_walking);
        this.playEndbossMusic();
        this.moveLeft();
        this.otherDirection = false;
    }


    /**
     * Plays 'playsEndbossSound()' continuously in a loop 9 pauses gameBackgroundMusic
     */
    playEndbossMusic() {
        gameEndbossMusic.loop = true;
        gameEndbossMusic.play();
        backgroundSound.pause();
    }
}