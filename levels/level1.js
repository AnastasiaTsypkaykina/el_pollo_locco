/**
 * 'level1.js' defines that are visibile in the game
 */
let level1;

/**
 * Function is connected to 'level.class.js' file
 * -> Creates 8 chicken, 1 end boss, background objects (clouds), 6 coins, 7 bottles and the "landscape"
 * -> Sets up game by initializing the world with a set of predefined objects
 */
function initLevel() {
  level1 = new Level(
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
    [new Endboss()],
    [new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud()],

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

    [
      // Next images (-1)
      new BackgroundObject("./img/5_background/layers/air.png", -719),
      new BackgroundObject(
        "./img/5_background/layers/3_third_layer/2.png",
        -719
      ),
      new BackgroundObject(
        "./img/5_background/layers/2_second_layer/2.png",
        -719
      ),
      new BackgroundObject(
        "./img/5_background/layers/1_first_layer/2.png",
        -719
      ),
      // Next images (0)
      new BackgroundObject("./img/5_background/layers/air.png", 0),
      new BackgroundObject("./img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("./img/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("./img/5_background/layers/1_first_layer/1.png", 0),
      // Next images (1)
      new BackgroundObject("./img/5_background/layers/air.png", 719),
      new BackgroundObject(
        "./img/5_background/layers/3_third_layer/2.png",
        719
      ),
      new BackgroundObject(
        "./img/5_background/layers/2_second_layer/2.png",
        719
      ),
      new BackgroundObject(
        "./img/5_background/layers/1_first_layer/2.png",
        719
      ),
      // Next images (2)
      new BackgroundObject("./img/5_background/layers/air.png", 719 * 2),
      new BackgroundObject(
        "./img/5_background/layers/3_third_layer/1.png",
        719 * 2
      ),
      new BackgroundObject(
        "./img/5_background/layers/2_second_layer/1.png",
        719 * 2
      ),
      new BackgroundObject(
        "./img/5_background/layers/1_first_layer/1.png",
        719 * 2
      ),
      // Next images (3)
      new BackgroundObject("./img/5_background/layers/air.png", 719 * 3),
      new BackgroundObject(
        "./img/5_background/layers/3_third_layer/2.png",
        719 * 3
      ),
      new BackgroundObject(
        "./img/5_background/layers/2_second_layer/2.png",
        719 * 3
      ),
      new BackgroundObject(
        "./img/5_background/layers/1_first_layer/2.png",
        719 * 3
      ),
      // Next images (4)
      new BackgroundObject("./img/5_background/layers/air.png", 719 * 4),
      new BackgroundObject(
        "./img/5_background/layers/3_third_layer/1.png",
        719 * 4
      ),
      new BackgroundObject(
        "./img/5_background/layers/2_second_layer/1.png",
        719 * 4
      ),
      new BackgroundObject(
        "./img/5_background/layers/1_first_layer/1.png",
        719 * 4
      ),
      // Next images (5)
      new BackgroundObject("./img/5_background/layers/air.png", 719 * 5),
      new BackgroundObject(
        "./img/5_background/layers/3_third_layer/2.png",
        719 * 5
      ),
      new BackgroundObject(
        "./img/5_background/layers/2_second_layer/2.png",
        719 * 5
      ),
      new BackgroundObject(
        "./img/5_background/layers/1_first_layer/2.png",
        719 * 5
      ),
    ]
  );
}
