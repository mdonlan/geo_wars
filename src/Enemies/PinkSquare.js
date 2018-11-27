import EnemyTypes from '../EnemyTypes';

class PinkSquare {

  constructor(game) {
    this.game = game.game;
    this.player = game.player;
    this.enemies = game.enemies;
    this.type = EnemyTypes[2];
    this.speed = 300;
    this.canCollide = false;

    this.init();
  }

  init() {
    this.spawn();
    this.enemies.enemyFadeIn(this);
  }

  spawn() {
    let x = Math.floor(Math.random() * this.game.width);
    let y = Math.floor(Math.random() * this.game.height);
    this.enemy = this.game.add.sprite(x, y, 'pink_square');
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

export default PinkSquare;