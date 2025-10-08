/**
 * Represents the keyboard input state for the game.
 * Tracks which keys are currently pressed.
 *
 * @class
 * @property {boolean} left - True if the left arrow key is pressed.
 * @property {boolean} right - True if the right arrow key is pressed.
 * @property {boolean} up - True if the up arrow key is pressed.
 * @property {boolean} down - True if the down arrow key is pressed.
 * @property {boolean} space - True if the spacebar is pressed.
 * @property {boolean} d - True if the 'D' key is pressed (for throwing bottles).
 */
class Keyboard {
  left = false;
  right = false;
  up = false;
  down = false;
  space = false;
  d = false;
}
