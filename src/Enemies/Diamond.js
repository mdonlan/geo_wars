// import game from '../main';
import EnemyTypes from '../EnemyTypes';

class Diamond {

  constructor(game, x, y) {
    this.game = game.game;
    this.player = game.player;
    this.enemies = game.enemies;
    this.type = EnemyTypes[1];
    this.x = x;
    this.y = y;
    this.speed = 100;
    this.canCollide = false;

    this.init();
  }

  init() {
    this.spawn();
    this.enemies.enemyFadeIn(this);
  }

  spawn() {
    this.enemy = this.game.add.sprite(this.x, this.y, 'diamond');
    this.enemy.instance = this;
    this.enemy.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enable(this.enemy);
    this.enemy.body.collideWorldBounds = true;
    this.enemy.body.bounce.set(1);
    this.enemy.alpha = 0;
  }

  update() {
    if(this.canCollide) {
      let rotation = this.game.math.angleBetween(this.enemy.x, this.enemy.y, this.player.sprite.x, this.player.sprite.y);
      this.enemy.body.velocity.x = Math.cos(rotation) * this.speed;
      this.enemy.body.velocity.y = Math.sin(rotation) * this.speed;
    }
  }
}

export default Diamond;