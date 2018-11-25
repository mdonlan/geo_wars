import EnemyTypes from '../EnemyTypes';
import Pinwheel from './Pinwheel';
import Diamond from './Diamond';

class Enemies {

  constructor(game) {
    this.game = game;
    this.enemies = []; // all enemy instances (classes)
    this.enemySprites = this.game.add.group(); // all enemy sprites
    this.maxEnemies = 50;
    this.enemiesAlive = 0;
  }

  preload() {
    this.game.load.image('pinwheel', '../assets/images/pinwheel.png');    
    this.game.load.image('diamond', '../assets/images/diamond.png');    
  }

  create() {
    // spawn a new group of enemies ever 1s
    this.game.time.events.loop(1000, this.spawnEnemies, this);
  }

  update() {
    this.enemies.forEach((enemy) => {
      enemy.update()
    });
  }

  spawnEnemies() {
    let numEnemiesToSpawn = Math.floor(Math.random() * 5) + 1; // 1 - 5 
    for (let i = 0; i < numEnemiesToSpawn; i++) {
      if(this.enemiesAlive < this.maxEnemies) {
        this.spawn();
      }
    }
  }

  spawn() {
    let randomEnemyType = Math.floor(Math.random() * EnemyTypes.length);

    // check if we can revive a dead enemy of this type
    let enemy = this.enemies.find((enemy) => {return !enemy.enemy.alive && enemy.type == randomEnemyType});

    if(!enemy) {
      switch(randomEnemyType) {
        case 0:
          let enemy = new Pinwheel(this.game);
          this.enemies.push(enemy);
          this.enemySprites.add(enemy.enemy);
          this.enemiesAlive++;
          break;
        case 1:
          this.spawnDiamonds();
          this.enemiesAlive += 9;
          break;
      }
    }
  }

  spawnDiamonds() {
    let x = Math.floor(Math.random() * this.game.game.width);
    let y = Math.floor(Math.random() * this.game.game.height);
    let startX = x;
    let startY = y;
    let spacing = 50;

    // spawn a grid of 9 diamonds
    for(let i = 0; i < 9; i++) {
      let enemy = new Diamond(this.game, x, y);
      this.enemies.push(enemy);
      this.enemySprites.add(enemy.enemy);

      x += spacing;

      if(x >= startX + (spacing * 3)) {
        x = startX;
        y+= spacing;
      }
    }
  }
}

export default Enemies;