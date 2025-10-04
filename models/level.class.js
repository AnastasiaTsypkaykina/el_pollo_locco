/**
 * The level class contains all elements/objects that make up a level
 * -> Each instance of the level class contains all the game objects that are relevant in this level
 */
class Level {
    enemies;
    endboss;
    clouds;
    coins;
    bottles;
    backgroundObjects;
    levelEndX = 3200;


    /**
     * Initializes all level object
     * @param {Array} enemies -> Array of enemy object in this level
     * @param {Array} endboss -> Array of endboss object in this level
     * @param {Array} clouds -> Array of cloud object in this level
     * @param {Array} coins -> Array of coin object in this level
     * @param {Array} bottles -> Array of bottle object in this level
     * @param {Array} backgroundObjects -> Array of background object in this level
     */
    constructor (enemies, endboss, clouds, coins, bottles, backgroundObjects) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.coins = coins;
        this.bottles = bottles;
        this.backgroundObjects = backgroundObjects;
    }
}