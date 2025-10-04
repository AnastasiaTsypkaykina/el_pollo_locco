/**
 * Character class that extends 'MovableObject'
 * -> Character moves around, jumps and interacts with the other game objects
 * @extends MovableObject
 */
class Character extends MovableObject {

    posY = 60;
    height = 320;
    width = 100;
    speed = 8;
    longIdleState = 0;

    offset = {
        top: 50,
        bottom: 20,
        left: 30,
        right: 30,
    };

    images_walking = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];

    images_jumping = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];

    images_dead = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];

    images_hurt = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png'
    ];

    images_idle = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    images_long_idle = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    world;
    walkingSound = new Audio('./audio/walking_on_sand.mp3');


    /**
     * Creates new 'Chracter' instance
     * -> Loads image(s) of character in various states (walking. jumping, etc.)
     * -> Applies gravity to the character + starts animation loop for movement
     */
    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.images_walking);
        this.loadImages(this.images_jumping);
        this.loadImages(this.images_dead);
        this.loadImages(this.images_hurt);
        this.loadImages(this.images_idle);
        this.loadImages(this.images_long_idle);
        this.applyGravityCharacter();
        this.animate();
    }


    /**
     * Controls character movement + animation based on current state
     * -> Updates character's position + applies vertical speed to jumoping
     * -> Adjusts camera position -> focus on character with a slight offset
     * -> Move right, move left, jumb
     */
    animate() {
        setStoppableInterval(() => {
            if (this.world && this.world.keyboard.right && this.posX < this.world.level.levelEndX) {
                this.moveRight();
            }
            if (this.world && this.world.keyboard.left && this.posX > 0) {
                this.moveLeft();
            }
            if (this.world && this.world.keyboard.space && !this.isAboveGround()) {
                this.speedPosY = 30;
                this.currentImage = 0;
                characterJumpSound.play();
            }
            this.world.cameraPosX = -this.posX + 80;
		}, 1000 / 24);


        /**
         * Is used to control the character's animation based on it's current state
         * -> Checks if character is in various states like dead, hurt, jumping, walking, standing or idle state -> triggers corresponding animation
         * -> Interval 100ms -> smooth animations
         */
		setStoppableInterval(() => {
            if (this.isDead()) {
                this.deathAnimation();
            } else if (this.isHurt()) {
                this.hurtAnimation();
            } else if (this.isAboveGround()) {
                this.jumpAnimation();
            } else if (this.isWalking()) {
                this.walkingAnimation();
            } else if (this.isStanding()) {
                this.idleAnimation();
            } else {
                this.longIdleAnimation();
            }
		}, 1000 / 12);
	}


    /**
     * Animation for character's death
     * -> Triggers 'characteDeadSound'
     * -> Stops game sound
     * -> Calls 'gameLost' function
     * -> Stops the game
     */
    deathAnimation() {
        this.playAnimation(this.images_dead);
        characterDeadSound.play();
        setGameSoundsToNull();
        gameLost();
        this.stopGameGeneral();
    }


    /**
     * Sets timeout to stop game + reset variable 'arrivedEndboss' = false (after short delay)
     */
    stopGameGeneral() {
        setTimeout(() => {
            stopAllIntervals();
            arrivedEndboss = false;
        },  700);
    }


    /**
     * Hurt animation of character
     * -> Plays hurt sound
     * -> Resets 'longIdleState'
     */
    hurtAnimation() {
        this.playAnimation(this.images_hurt);
        characterHurtSound.play();
        this.longIdleState = 0;
    }

    /**
     * Plays a jumping animation based on the object's state.
     * Adjusts image index and plays animation
     * * -> Resets 'longIdleState'
    */
    jumpAnimation() {
        if (this.speedPosY > 0) {
            if (this.currentImage > 5) {
                this.currentImage = 5;
            } else if (this.currentImage > this.images_jumping.length) {
                this.currentImage = this.images_jumping - 1;
            }
        }
        this.playAnimation(this.images_jumping);
        this.longIdleState = 0;
    }


    /**
     * Checks if character is moving to left or right based on the keyboard input
     * @returns {boolean} -> 'true' = character is moving, 'false' = not moving
     */
    isWalking() {
        return this.world.keyboard.right || this.world.keyboard.left;
    }


    /**
     * Plays walking animation
     * -> Resets 'longIdleState'
     */
    walkingAnimation() {
        this.playAnimation(this.images_walking);
        this.longIdleState = 0;
    }


    /**
     * Checks if character is standing -> comparing 'longIdleState' against threshold
     * @returns {boolean} -> 'true' = character is standing, 'false' = not standing
     */
    isStanding() {
        return this.longIdleState < 30;
    }


    /**
     * Plays idle animation of the character
     * -> Increase counter of 'longIdleState' to track the duration of the state
     */
    idleAnimation() {
        this.playAnimation(this.images_idle);
        this.longIdleState++;
    }


    /**
     * Plays long idle animation of the character
     * -> Used when character remains idle for an extende period of time
     */
    longIdleAnimation() {
        this.playAnimation(this.images_long_idle);
    }
}