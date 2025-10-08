/**
 * Represents a game level, containing all objects and entities for that level.
 *
 * @class
 * @property {Array<Chicken|SmallChicken>} enemies - Array of enemy objects (chickens and small chickens).
 * @property {Array<Endboss>} endboss - Array containing the endboss object(s).
 * @property {Array<Cloud>} clouds - Array of cloud objects.
 * @property {Array<Coin>} coins - Array of coin objects.
 * @property {Array<Bottle>} bottles - Array of bottle objects.
 * @property {Array<BackgroundObject>} backgroundObjects - Array of background objects.
 * @property {number} levelEndX - The horizontal position where the level ends (default: 3200).
 *
 * @constructor
 * @param {Array<Chicken|SmallChicken>} enemies - Array of enemy objects.
 * @param {Array<Endboss>} endboss - Array containing the endboss object(s).
 * @param {Array<Cloud>} clouds - Array of cloud objects.
 * @param {Array<Coin>} coins - Array of coin objects.
 * @param {Array<Bottle>} bottles - Array of bottle objects.
 * @param {Array<BackgroundObject>} backgroundObjects - Array of background objects.
 */
class Level {
  enemies;
  endboss;
  clouds;
  coins;
  bottles;
  backgroundObjects;
  levelEndX = 3200;

  constructor(enemies, endboss, clouds, coins, bottles, backgroundObjects) {
    this.enemies = enemies;
    this.endboss = endboss;
    this.clouds = clouds;
    this.coins = coins;
    this.bottles = bottles;
    this.backgroundObjects = backgroundObjects;
  }
}
