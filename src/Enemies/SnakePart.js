import EnemyTypes from '../EnemyTypes';

class SnakePart {

  constructor(game, x, y, isHead) {
    this.game = game.game;
    this.x = x;
    this.y = y;
    this.isHead = isHead;
    this.typeData = EnemyTypes[0];
    this.enemies = game.enemies;
    this.player = game.player;
    this.canCollide = false;
    this.init(); 
    this.prev
  }

  init() {
    this.spawn();
    this.enemies.enemyFadeIn(this);
  }

  spawn() {
    // let x = Math.floor(Math.random() * this.game.width);
    // let y = Math.floor(Math.random() * this.game.height);
    this.enemy = this.game.add.sprite(this.x, this.y, 'snake');
    this.enemy.instance = this;
    this.enemy.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enable(this.enemy);
    this.enemy.body.collideWorldBounds = true;
    this.enemy.body.bounce.set(1);
    this.enemy.alpha = 0;
  }

  update() {
    // move in a back and forth (sin) pattern
    if(this.isHead) {
      this.enemy.x += 1;
      this.enemy.y += Math.sin(this.enemy.x / 100) / 2;
    } else {

    }
  }

}

export default SnakePart;