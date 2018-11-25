import enemyTypes from '../EnemyTypes';
import Pinwheel from './Pinwheel';

class Enemies {

  constructor(game) {
    this.game = game;
    this.enemies = []; // all enemy instances (classes)
    this.enemySprites = this.game.add.group(); // all enemy sprites
  }

  preload() {
    this.game.load.image('pinwheel', '../assets/images/pinwheel.png');    
  }

  create() {
    // spawn a new group of enemies ever 1s
    this.game.time.events.loop(1000, this.spawnEnemies, this);
  }

  update() {

  }

  spawnEnemies() {
    console.log("spawning new round of enemies");
    let numEnemiesToSpawn = Math.floor(Math.random() * 5) + 1; // 1 - 5 
    console.log('Num Enemies this round: ' + numEnemiesToSpawn);
    for (let i = 0; i < numEnemiesToSpawn; i++) {
      this.spawn();
    }
  }

  spawn() {
    let randomEnemyType = Math.floor(Math.random() * enemyTypes.length);
    let enemy;
    switch(randomEnemyType) {
      case 0:
        enemy = new Pinwheel(this.game);
        break;
      case 1:
        break;
    }

    // keep track of each enemy class and each enemy sprite
    // we need the phaser.group to only have sprites

    this.enemies.push(enemy);
    this.enemySprites.add(enemy.enemy);
  }
}

export default Enemies;