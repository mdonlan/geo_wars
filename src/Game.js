import Player from './Player';
import Missiles from './Missiles';
import Enemies from './Enemies/Enemies';
import {togglePauseScreen} from './UI/PauseScreen';

class Game {
  constructor() {
  
  }

  preload() {
    
    // create instances
    this.missiles = new Missiles(this);
    this.enemies = new Enemies(this);
    this.player = new Player(this);

    this.player.preload()
    this.missiles.preload();
    this.enemies.preload();
  }

  create() {
    this.player.create();
    this.enemies.create();
  }

  update() {
    if(!this.game.physics.arcade.isPaused) {
      this.player.update();
      this.missiles.update();
      this.enemies.update();
      this.checkCollisions();
    }
  }

  pause() {
    console.log("PAUSE");    
    if(this.game.physics.arcade.isPaused == true) {
      this.game.physics.arcade.isPaused = false;
      togglePauseScreen(false);
    }
    else {
      this.game.physics.arcade.isPaused = true;
      togglePauseScreen(true);
    }
  }
  
  checkCollisions() {
    this.game.physics.arcade.overlap(this.missiles.missileSprites, this.enemies.enemySprites, this.missileHitEnemy.bind(this));
    this.game.physics.arcade.overlap(this.player.sprite, this.enemies.enemySprites, this.playerHitEnemy.bind(this));
  }

  missileHitEnemy(missile, enemy) {
    // if a missile hit a snake enemy
    // only kill the snake if it hit the head
    if(enemy.key == 'snake') {
      if(enemy.instance.isHead) {
        // enemy.instance.snakeGroup.forEach((snakeEnemy) => {
        //   snakeEnemy.enemy.kill();
        // });
        let i = 0;
        this.killSnake(i, enemy);
      }
      return;
    }
    
    missile.kill();
    enemy.kill();
    this.enemies.enemiesAlive--;
  }

  killSnake(i, enemy) {    
    enemy.instance.snakeGroup[i].enemy.kill();
    setTimeout(() => {
      if(i < enemy.instance.snakeGroup.length - 1) {
        i++;
        this.killSnake(i, enemy)
      }
    }, 50)
  }

  playerHitEnemy(player, enemy) {
    if(enemy.instance.canCollide) {
      player.kill();
      enemy.kill();
      this.game.physics.arcade.isPaused = true;
    }
  }


}

export default Game;