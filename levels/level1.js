/**
 * The current level instance.
 * @type {Level}
 */
let level1;

/**
 * Initializes level1 with all enemies, objects, and background layers.
 * Sets up chickens, small chickens, endboss, clouds, coins, bottles, and background objects.
 *
 * @function
 * @returns {void}
 */
function initLevel() {
  level1 = new Level(
    /**
     * @type {Array<Chicken|SmallChicken>}
     */
    [
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
    ],

    /** @type {Array<Endboss>} */
    [new Endboss()],

    /** @type {Array<Cloud>} */
    [new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud()],

    /** @type {Array<Coin>} */
    [
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
    ],

    /** @type {Array<Bottle>} */
    [
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
    ],

    /** @type {Array<BackgroundObject>} */
    [
      new BackgroundObject("./img/5_background/layers/air.png", -719),
      new BackgroundObject("./img/5_background/layers/3_third_layer/2.png", -719),
      new BackgroundObject("./img/5_background/layers/2_second_layer/2.png",-719),
      new BackgroundObject("./img/5_background/layers/1_first_layer/2.png", -719),
      new BackgroundObject("./img/5_background/layers/air.png", 0),
      new BackgroundObject("./img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("./img/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("./img/5_background/layers/1_first_layer/1.png", 0),
      new BackgroundObject("./img/5_background/layers/air.png", 719),
      new BackgroundObject("./img/5_background/layers/3_third_layer/2.png", 719),
      new BackgroundObject("./img/5_background/layers/2_second_layer/2.png", 719),
      new BackgroundObject("./img/5_background/layers/1_first_layer/2.png", 719),
      new BackgroundObject("./img/5_background/layers/air.png", 719 * 2),
      new BackgroundObject("./img/5_background/layers/3_third_layer/1.png", 719 * 2),
      new BackgroundObject("./img/5_background/layers/2_second_layer/1.png", 719 * 2),
      new BackgroundObject("./img/5_background/layers/1_first_layer/1.png", 719 * 2),

      new BackgroundObject("./img/5_background/layers/air.png", 719 * 3),
      new BackgroundObject("./img/5_background/layers/3_third_layer/2.png", 719 * 3),
      new BackgroundObject("./img/5_background/layers/2_second_layer/2.png", 719 * 3),
      new BackgroundObject("./img/5_background/layers/1_first_layer/2.png", 719 * 3),

      new BackgroundObject("./img/5_background/layers/air.png", 719 * 4),
      new BackgroundObject("./img/5_background/layers/3_third_layer/1.png", 719 * 4),
      new BackgroundObject("./img/5_background/layers/2_second_layer/1.png", 719 * 4),
      new BackgroundObject("./img/5_background/layers/1_first_layer/1.png", 719 * 4),

      new BackgroundObject("./img/5_background/layers/air.png", 719 * 5),
      new BackgroundObject("./img/5_background/layers/3_third_layer/2.png", 719 * 5),
      new BackgroundObject("./img/5_background/layers/2_second_layer/2.png", 719 * 5),
      new BackgroundObject("./img/5_background/layers/1_first_layer/2.png", 719 * 5),
    ]
  );
}
