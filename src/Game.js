import Player from './Player';
import Missiles from './Missiles';
import Enemies from './Enemies/Enemies';

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
    this.player.update();
    this.missiles.update();
    this.enemies.update();

    this.checkCollisions();
  }
  
  checkCollisions() {
    this.game.physics.arcade.overlap(this.missiles.missileSprites, this.enemies.enemySprites, this.missileHitEnemy.bind(this));
    this.game.physics.arcade.overlap(this.player.sprite, this.enemies.enemySprites, this.playerHitEnemy.bind(this));
  }

  missileHitEnemy(missile, enemy) {
    missile.kill();
    enemy.kill();
    this.enemies.enemiesAlive--;
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