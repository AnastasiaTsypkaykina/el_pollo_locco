
characterJumpSound = new Audio('./audio/character_jump.mp3');
characterDeadSound = new Audio('./audio/character_dead.mp3');
characterHurtSound = new Audio('./audio/character_hurt.mp3');

collectBottleSound = new Audio('./audio/bottle_collect.mp3');

backgroundSound = new Audio("./audio/background_sound.mp3");

characterDeadSound.load();
characterHurtSound.load();
characterJumpSound.load();
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
    allSoundsVolumeOff();
}




/**
 * Sets the volume of all game sounds to 0
 */
function allSoundsVolumeOff() {
    characterJumpSound.volume = 0;
    characterDeadSound.volume = 0;
    characterHurtSound.volume = 0;

    collectBottleSound.volume = 0;
    backgroundSound.volume = 0;    
}


/**
 * Sets globale variable 'gameMusicOff' to false
 * -> Display sound on button (Volume of all sounds = 1)
 */
function soundOn() {
    gameMusicOff = false;    
    allSoundsVolumeOn();
}

/**
 * Sets the volume of all game sounds to 1
 */
function allSoundsVolumeOn() {
    characterJumpSound.volume = 1;
    characterDeadSound.volume = 1;
    characterHurtSound.volume = 1;
    
    collectBottleSound.volume = 1;
    backgroundSound.volume = 1;
    
}


/**
 * Function mutes all game sound except for 'gameWonSound' and 'gameLostSound'
 * -> After 300 ms
 */
function setGameSoundsToNull() {
    setTimeout(() => {
        characterJumpSound.value = 1;
        characterDeadSound.value = 1;
        characterHurtSound.value = 1;       
        
        collectBottleSound.value = 1;
        backgroundSound.value = 1;
        
    }, 300);
}


