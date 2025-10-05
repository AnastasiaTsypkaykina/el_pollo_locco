characterJumpSound = new Audio("./audio/character_jump.mp3");
characterDeadSound = new Audio("./audio/character_dead.mp3");
characterHurtSound = new Audio("./audio/character_hurt.mp3");

chickenDeadSound = new Audio("./audio/chicken_dead_sound.mp3");

collectBottleSound = new Audio("./audio/bottle_collect.mp3");
throwBottleSound = new Audio("./audio/throw_bottle_sound.mp3");
bottleSplashSound = new Audio("./audio/bottle_splash_sound.mp3");

collectCoinSound = new Audio("./audio/collect_coin_sound.mp3");

endbossHurtSound = new Audio("./audio/chicken_dead_sound.mp3");
endbossAttentionSound = new Audio("./audio/chicken_dead_sound.mp3");
endbossAttackSound = new Audio("./audio/chicken_dead_sound.mp3");

backgroundSound = new Audio("./audio/background_sound.mp3");
gameEndbossMusic = new Audio("./audio/endboss_attention_sound.mp3");

gameWonSound = new Audio("./audio/game_won_sound.mp3");
gameLostSound = new Audio("./audio/game_won_sound.mp3");

characterDeadSound.load();
characterHurtSound.load();
characterJumpSound.load();
chickenDeadSound.load();
throwBottleSound.load();
bottleSplashSound.load();
collectCoinSound.load();
endbossHurtSound.load();
endbossAttentionSound.load();
endbossAttackSound.load();
gameEndbossMusic.load();
gameWonSound.load();
gameLostSound.load();
collectBottleSound.load();
backgroundSound.load();

let gameMusicOff = false;

/**
 * Resets 'game' + 'endboss' music at tht start of the game
 * -> Checks whether music is on of off -> on: music on loop
 */
function gameSounds() {
  resetSoundsToBegin();
  checkGameMusic();
  backgroundSound.loop = true;
  backgroundSound.play();
}

/**
 * Reset the time of 'game' + 'endboss' sounds
 */
function resetSoundsToBegin() {
  backgroundSound.currentTime = 0;
  gameEndbossMusic.currentTime = 0;
}

/**
 * Checks wherther music is on (true) or off (false) based on global variable 'gameMusicOff'
 * -> If on volume of sounds is 1, if off valome is 0
 */
function checkGameMusic() {
  if (!gameMusicOff) {
    allSoundsVolumeOn();
  } else {
    allSoundsVolumeOff();
  }
}

/**
 * Sets globale variable 'gameMusicOff' to true
 * -> Display sound off button (Volume of all sounds = 0)
 */
function soundOff() {
  gameMusicOff = true;
  showSoundOffButton();
  allSoundsVolumeOff();
}

function showSoundOffButton() {
  document.getElementById("sound-off").classList.add("d-none");
  document.getElementById("sound-on").classList.remove("d-none");
}

/**
 * Sets the volume of all game sounds to 0
 */
function allSoundsVolumeOff() {
  characterDeadSound.volume = 0;
  characterHurtSound.volume = 0;
  characterJumpSound.volume = 0;
  chickenDeadSound.volume = 0;
  throwBottleSound.volume = 0;
  bottleSplashSound.volume = 0;
  collectCoinSound.volume = 0;
  endbossHurtSound.volume = 0;
  endbossAttentionSound.volume = 0;
  endbossAttackSound.volume = 0;
  gameEndbossMusic.volume = 0;
  gameWonSound.volume = 0;
  gameLostSound.volume = 0;
  collectBottleSound.volume = 0;
  backgroundSound.volume = 0;
}

/**
 * Sets globale variable 'gameMusicOff' to false
 * -> Display sound on button (Volume of all sounds = 1)
 */
function soundOn() {
  gameMusicOff = false;
  showSoundOnButton();
  allSoundsVolumeOn();
}

function showSoundOnButton() {
    document.getElementById('sound-off').classList.remove('d-none');
    document.getElementById('sound-on').classList.add('d-none');
}

/**
 * Sets the volume of all game sounds to 1
 */
function allSoundsVolumeOn() {
  characterDeadSound.volume = 1;
  characterHurtSound.volume = 1;
  characterJumpSound.volume = 1;
  chickenDeadSound.volume = 1;
  throwBottleSound.volume = 1;
  bottleSplashSound.volume = 1;
  collectCoinSound.volume = 1;
  endbossHurtSound.volume = 1;
  endbossAttentionSound.volume = 1;
  endbossAttackSound.volume = 1;
  gameEndbossMusic.volume = 1;
  gameWonSound.volume = 1;
  gameLostSound.volume = 1;
  collectBottleSound.volume = 1;
  backgroundSound.volume = 1;
}

/**
 * Function mutes all game sound except for 'gameWonSound' and 'gameLostSound'
 * -> After 300 ms
 */
function setGameSoundsToNull() {
  setTimeout(() => {
    characterDeadSound.value = 1;
  characterHurtSound.value = 1;
  characterJumpSound.value = 1;
  chickenDeadSound.value = 1;
  throwBottleSound.value = 1;
  bottleSplashSound.value = 1;
  collectCoinSound.value = 1;
  endbossHurtSound.value = 1;
  endbossAttentionSound.value = 1;
  endbossAttackSound.value = 1;
  gameEndbossMusic.value = 1;
  gameWonSound.value = 1;
  gameLostSound.value = 1;
  collectBottleSound.value = 1;
  backgroundSound.value = 1;
  }, 300);
}
