class World {

    character = new Character();
    // endboss = new Endboss();
    level = level1;
    ctx;
    canvas;
    keyboard;
    cameraPosX = 0;
    statusBar = new Statusbar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    endbossBar = new EndbossBar();
    throwableObjects = [];
    collectedBottles = 0;
    bottleStrikesEndboss = false;
    endbossNotVulnerable = false;
    characterNotVulnerable = false;


    /**
     * Constructs a new world
     * @param {*} canvas -> Canvas on which the game is drawn
     * @param {*} keyboard -> Keyboard object capturing users inputs
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.runBottles();
    }


    /**
     * Links the Character and World class
     */
    setWorld() {
        this.character.world = this;
    }


    /**
     * Checks for collisions and game updates at a set interval
     */
    run() {
        setStoppableInterval(() => {
            this.checkCollision();
            this.checkCollisionWithEndboss();
            this.checkCollisionBottle();
            this.checkCollisionCoin();
            this.killChickenWithBottle();
            this.bottleCollidesWithEndboss();
        }, 1000 / 60);
    }


    /**
     * Checks for thrown bottles at a set interval
     */
    runBottles() {
        setInterval(() => {
            this.checkThrowObject();
        }, 200);
    }


    /**
     * Checks for collisions between the character and chickens
     */
    checkCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround() && !this.character.isHurt()) {
                    this.killChicken(enemy);
                    this.characterInvulnerable();
                } else if (enemy.energy > 0) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
        });
    }


    /**
     * Kills a chicken enemy.
     * @param {object} enemy - The enemy to be killed
     */
    killChicken(enemy) {
        this.character.speedY = 30;
        this.chickenIsDead(enemy);

        setTimeout(() => {
            this.deleteEnemy(enemy);
        }, 500);
    }


    /**
     * Sets the enemy's energy to 0 and plays a death sound
     * @param {object} enemy - The enemy that is dying
     */
    chickenIsDead(enemy) {
        enemy.energy = 0;
        chickenDeadSound.play();
    }


    /**
     * Removes the killed enemy from the enemy array
     * @param {object} enemy - The enemy to be removed
     */
    deleteEnemy(enemy) {
        let i = this.level.enemies.indexOf(enemy);
        if (i > -1) {
            this.level.enemies.splice(i, 1);
            checkKilledChicken();
        }
    }


    /**
     * Checks collision between character and end boss
     */
    checkCollisionWithEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss) && !this.characterNotVulnerable) {
                this.character.hittedByEndboss();
                this.statusBar.setPercentage(this.character.energy);
                this.characterInvulnerable();
            }
        });
    }


    /**
     * Character is temporarily invulnerable
     */
    characterInvulnerable() {
        this.characterNotVulnerable = true;
        setTimeout(() => {
            this.characterNotVulnerable = false;
        }, 1500);
    }


    /**
     * Checks if bottle collides with end boss
     */
    bottleCollidesWithEndboss() {
        this.throwableObjects.forEach((bottle) => {
            this.level.endboss.forEach((endboss) => {
                if (bottle.isColliding(endboss) && !this.endbossNotVulnerable) {
                    this.bottleStrikesEndboss = true;
                    this.endbossWasHit(endboss);
                }
            });
        });
        this.endbossBar.setPercentage(world.level.endboss[0].energy);
    }


    /**
     * Indicates that the end boss has been or was hit + makes it temporarily invulnerable
     * @param {object} endboss -> end boss has been hit
     */
    endbossWasHit(endboss) {
        endboss.hittedByBottle();
        this.endbossNotHitable();
    }


    /**
     * Makes the end boss temporarily not vulnerable
     */
    endbossNotHitable() {
        this.endbossNotVulnerable = true;
        setTimeout(() => {
            this.endbossNotVulnerable = false;
        }, 1000);
    }
    

    /**
     * Checks if bottle can be thrown
     * -> Based on keybaord input + bottle count
     */
    checkThrowObject() {
       if (this.keyboard.d && this.collectedBottles > 0) {
            this.throwBottle();
            this.reduceBottleBar();
            // let bottle = new ThrowableObject(this.character.posX + 100, this.character.posY + 100);
            // this.throwableObjects.push(bottle)
       }
    }


    /**
     * Updates statur bar of bottle object
     * -> Returns negative value.
     */
    reduceBottleBar() {
        this.bottleBar.collected--;
        this.bottleBar.setCollected(this.bottleBar.collected);
    }


    /**
     * Checks thrown bottles + direction of the throw
     */
    throwBottle() {
        this.collectedBottles--;
        checkThrowedBottles();
        if (this.character.otherDirection) {
            this.bottleThrowLeft();
        } else {
            this.bottleThrowRight();
        }
    }


    /**
     * Bottle throw left
     */
    bottleThrowLeft() {
        let bottle = new ThrowableObject(this.character.posX - 20, this.character.posY + 100, this.character.otherDirection);
        this.throwableObjects.push(bottle);
    }


    /**
     * Bottle throw right
     */
    bottleThrowRight() {
        let bottle = new ThrowableObject(this.character.posX + 20, this.character.posY + 100, this.character.otherDirection);
        this.throwableObjects.push(bottle);
    }


    /**
     * Checks collisions between character and bottle
     */
    checkCollisionBottle() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                collectBottleSound.play();
                this.bottleCollected(bottle);
                this.increaseBottleBar();
            }
        });
    }


    /**
     * Updates game statistics and removes the collected bottle from world
     * @param {object} bottle -> Bottle to be collected
     */
    bottleCollected(bottle) {
        checkCollectedBottles();
        this.collectedBottles++;
        let i = this.level.bottles.indexOf(bottle);
        this.level.bottles.splice(i, 1);
    }


    /**
     * Updates the bottle status bar
     * -> Reflect a positive value
     */
    increaseBottleBar() {
        this.bottleBar.collected++;
        this.bottleBar.setCollected(this.bottleBar.collected);
    }


    /**
     * Checks collision between bottle and chicken
     */
    killChickenWithBottle() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    this.chickenKilledWithBottle(enemy);
                }
            });
        });
    }


    /**
     * Kills chicken with bottle
     * @param {object} enemy - Enemy that was killed
     */
    chickenKilledWithBottle(enemy) {
        enemy.energy = 0;
        chickenDeadSound.play();
        setTimeout(() => {
            this.deleteEnemy(enemy);
        }, 500);
    }


    /**
     * Checks collision between coin and character
     */
    checkCollisionCoin() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                collectCoinSound.play();
                this.increaseCoinBar();
                this.coinCollected(coin);
            }
        });
    }


    /**
     * Updates coin status bar
     * -> Remove positive value
     */
    increaseCoinBar() {
        this.coinBar.collected++;
        this.coinBar.setCollected(this.coinBar.collected);
    }


    /**
     * Checks collected coins for endgame statistics and removes the collected coin form array (-> disappear from canvas)
     * @param {object} coin -> Coin that was collected
     */
    coinCollected(coin) {
        checkCollectedCoins();
        let i = this.level.coins.indexOf(coin);
        this.level.coins.splice(i, 1);
    }


    /**
     * Draws the game world
     * -> 1. canvas is cleared, background objects, status bars and movable objects added
     * -> 'drawingFrames()' function determines the fps (frames per secon) of the game, depending on the graphic card
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addBackgroundObjects();
        this.addStatusBars();
        this.addMoveableObjects();
        this.drawFrames();
    }


    /**
     * Adds background objects
     * -> Translates the context's x-coordinate according to the 'cameraPosX' value, adds the objects to the map, and then translates the context's x-coordinate back to its original position 
     */
    addBackgroundObjects() {
        this.ctx.translate(this.cameraPosX, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.cameraPosX, 0);
    }


    /**
     * Adds the status bars (health, bottle, coin)
     * -> When the end boss is reached, the function also adds the end boss's status bar to the game
     */
    addStatusBars() {
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        if (arrivedEndboss === true) {
            this.addToMap(this.endbossBar);
        }
    }


    /**
     * Adds the character, enemies, end boss, coins, and bottles
     * -> Translates the context's x-coordinate according to the 'cameraposY' value. Then it calls the 'addToMap()' function to add each of the game objects to the map
     * -> After addition, it translates the context's x-coordinate back to its original position
     */
    addMoveableObjects() {
        this.ctx.translate(this.cameraPosX, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.cameraPosX, 0);
    }


    /**
     * Determines the fps (frames per second) of the game
     * -> Calls 'requestAnimationFrame()' method to redraw the game screen at a rate suitable for the device's graphics capabilities
     */
    drawFrames() {
        let self = this;
	    requestAnimationFrame(function() {
		    self.draw();
	    });
    }


    /**
     * Draws and adds the specified objects to the game
     * @param {Array} objects -> Array of objects that are added to the map
     */
    addObjectsToMap(objects) {
        if (objects) {
            objects.forEach((object) => {
                this.addToMap(object);
            });
        }
    }

    
    /**
     * Adds a movable object to the game world
     * -> If the object has a different direction, it flips the image before drawing
     * @param {object} movableObject -> Movable objects that are added to the map
     */
    addToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.flipImage(movableObject);
        }
        movableObject.draw(this.ctx);
        
        if (movableObject.otherDirection) {
            this.flipImageBack(movableObject);
        }
    }


    /**
     * Flips the image horizontally for a movable object
     * -> Saves the current canvas state + translates to the width of the object
     * -> Applies a scale transformation to flip the image, and adjusts the object's x-coordinate
     * @param {object} movableObject -> The movable object that is flipped
     */
    flipImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.posX = movableObject.posX * -1;
    }


    /**
     * Restores the image to its original orientation after flipping
     * -> Adjusts the object's x-coordinate to it's original value (before the flip)
     * -> Restores the previously saved canvas state to return the transformation
     * @param {object} movableObject -> Movable object which is restored
     */
    flipImageBack(movableObject) {
        movableObject.posX = movableObject.posX * -1;
        this.ctx.restore();
    }
}