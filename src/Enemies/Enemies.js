import EnemyTypes from '../EnemyTypes';
import Pinwheel from './Pinwheel';
import Diamond from './Diamond';
import PinkSquare from './PinkSquare';
import Snake from './Snake';

class Enemies {

  constructor(game) {
    this.game = game;
    this.enemies = []; // all enemy instances (classes)
    this.enemySprites = this.game.add.group(); // all enemy sprites
    this.maxEnemies = 50;
    this.enemiesAlive = 0;
    this.spawnCooldown = 5000;
  }

  preload() {
    this.game.load.image('pinwheel', '../assets/images/pinwheel.png');    
    this.game.load.image('diamond', '../assets/images/diamond.png');    
    this.game.load.image('pink_square', '../assets/images/pink_square.png');    
    this.game.load.image('snake', '../assets/images/snake_part.png');    
  }

  create() {
    this.game.time.events.loop(this.spawnCooldown, this.spawnEnemies, this);
    this.spawnEnemies();
  }

  update() {
    this.enemies.forEach((enemy) => {
      enemy.update()
    });
    // this.checkCollisions();
  }


  enemyFadeIn(enemy) {
    let sprite = enemy.enemy;
    let fadeIn = this.game.add.tween(sprite).to({alpha: 1}, 2000, null, true, 0);
    fadeIn.onComplete.add(() => {enemy.canCollide = true;});
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
    // let randomEnemyType = Math.floor(Math.random() * EnemyTypes.length);

    //
    // spawn snakes only
    //
    let randomEnemyType = 3;

    // check if we can revive a dead enemy of this type
    let enemy = this.enemies.find((enemy) => {return !enemy.enemy.alive && enemy.type == randomEnemyType});

    if(!enemy) {
      switch(randomEnemyType) {
        case 0:
          let pinwheel = new Pinwheel(this.game);
          this.enemies.push(pinwheel);
          this.enemySprites.add(pinwheel.enemy);
          this.enemiesAlive++;
          break;
        case 1:
          this.spawnDiamonds();
          this.enemiesAlive += 9;
          break;
        case 2:
          let pinksquare = new PinkSquare(this.game);
          this.enemies.push(pinksquare);
          this.enemySprites.add(pinksquare.enemy);
          this.enemiesAlive++;
          break;
        case 3:          
          this.spawnSnake();
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

  spawnSnake() {
    let x = Math.floor(Math.random() * this.game.game.width);
    let y = Math.floor(Math.random() * this.game.game.height);
    let spacing = 50;

    let snakeGroup = [];
    let snakePath = [];

    for(let i = 0; i < 9; i++) {
      let isHead = false;
      if(i == 0) isHead = true;
      let enemy = new Snake(this.game, x, y, isHead, snakeGroup, snakePath, i);
      snakeGroup.push(enemy);
      this.enemies.push(enemy);
      this.enemySprites.add(enemy.enemy);
    }
  }
}

export default Enemies;