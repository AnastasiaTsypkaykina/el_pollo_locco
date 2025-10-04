/**
 * MovableObject class represents the movable objects
 * @extends DrawableObject
 */
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
        right: 0
    }
    

    /**
     * Applies gravity to the bottle object
     */
    applyGravityBottle() {
        setStoppableInterval(() => {
            if (this.isAboveGround() || this.speedPosY > 0) {
                this.posY -= this.speedPosY;
                this.speedPosY -= this.acceleration;
            }
        }, 1000 / 25);
    }
    

    /**
     * Applies gravity to the character
     * -> Updating the vertical position based on current speed and acceleration
     */
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


    /**
     * Checks if object is above ground
     * @returns {boolean} -> 'true' above ground, 'false' under ground
     */
    isAboveGround() {
        if (this instanceof ThrowableObject && this.posY < 300) {
            return true;
        } else {
            return this.posY < 120;
        }
    }


    /**
     * Plays animation by upodating the image of the object
     * @param {Array} images -> Array of image paths
     */
    playAnimation(images) {
        let i = this.currentImage % images.length; 
		let path = images[i];
		this.img = this.imageCache[path];
		this.currentImage++;
    }


    /**
     * Moves the object to the right 
     * -> updating x coordinate based on speed property
     */
    moveRight() {
        this.posX += this.speed;
        this.otherDirection = false;
    }


    /**
     * Moves the object to the left
     * -> updating x coordinate based on speed property
     */
    moveLeft() {
        this.posX -= this.speed;
        this.otherDirection = true;
    }


    /**
     * Checks if object collides with another movable object
     * @param {MovableObject} movableObject -> movable object
     * @returns {boolean} -> 'true'
     */
    isColliding(movableObject) {
        return (
            this.posX + this.width - this.offset.right > movableObject.posX + movableObject.offset.left &&
            this.posY + this.height - this.offset.bottom > movableObject.posY + movableObject.offset.top &&
            this.posX + this.offset.left < movableObject.posX + movableObject.width - movableObject.offset.right &&
            this.posY + this.offset.top < movableObject.posY + movableObject.height - movableObject.offset.bottom
        );
    }


    /**
     * Decreases the characters energy by 0.5 
     */
    hit() {
		this.energy -= 1;
		if (this.energy < 0) {
			this.energy = 0;
		} else {
            this.lastHit = new Date().getTime();
        }
	}


    /**
     * Decreases the characters energy by 10 when being hit by endboss
     */
    hittedByEndboss() {
        this.energy -= 10;
		if (this.energy < 0) {
			this.energy = 0;
		} else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Decreases the endbosses energy by 19 when hitted by bottle
     */
    hittedByBottle() {
        this.energy -= 19;
		if (this.energy < 10) {
			this.energy = 0;
		} else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Checks if the character is hurt (state)
     * @returns {boolean} -> 'true' = hurt, 'false' = not hurt
     */
    isHurt() {
        // Difference in ms
        let timepassed = new Date().getTime() - this.lastHit;
        // In seconds
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }


    /**
     * Checks if the endboss is hurt (state)
     * @returns {boolean} -> 'true' = hurt, 'false' = not hurt
     */
    endbossIsHurt() {
        // Difference in ms
        let timepassed = new Date().getTime() - this.lastHit;
        // In seconds
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }


    /**
     * Checks if objects (character, etc.) are dead
     * @returns {boolean} -> 'true' = dead, 'false' = not dead
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * Handles the animations for the chicken object.
     */
    chickenAnimation() {
        this.movingLeft();
        this.checkingDeath();
    }


    /**
     * Sets up an interval that triggers the chicken to move to the left repeatedly.
     */
    movingLeft() {
        this.walkingLeft = setInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);
    }


    /**
     * Sets up an interval that checks if the chicken is dead.
     */
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


    /**
     * Called when the chicken is dead. It clears the intervals for walking left and checking death after a delay of 100 milliseconds.
     */
    deadChicken() {
        setTimeout(() => {
            clearInterval(this.walkingLeft);
            clearInterval(this.death);
        }, 100);
    }
}