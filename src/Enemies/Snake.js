import EnemyTypes from '../EnemyTypes';
import { timingSafeEqual } from 'crypto';

class Snake {

  constructor(game, x, y, isHead, snakeGroup, snakePath, index) {
    this.game = game.game;
    this.x = x;
    this.y = y;
    this.isHead = isHead;
    this.snakeGroup = snakeGroup;
    this.snakePath = snakePath;
    this.index = index;
    this.typeData = EnemyTypes[0];
    this.enemies = game.enemies;
    this.player = game.player;
    this.canCollide = false;
    this.prevX = null;
    this.prevY = null;
    this.startMovingAfterTime = this.game.time.time + (index * 500);
    this.onPathIndex = 0;

    this.xDir = 1;
    this.yDir = 1;

    this.init();
  }

  init() {
    this.spawn();
    this.enemies.enemyFadeIn(this);

    if(this.isHead) {
      this.giveDirection();
    }
  }

  spawn() {
    // let x = Math.floor(Math.random() * this.game.width);
    // let y = Math.floor(Math.random() * this.game.height);
    this.enemy = this.game.add.sprite(this.x, this.y, 'snake');
    this.enemy.instance = this;
    this.enemy.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enable(this.enemy);
    this.enemy.alpha = 0;
    this.enemy.body.collideWorldBounds = true;
    this.enemy.body.bounce.set(1);

    if(this.isHead) this.enemy.body.velocity.x = -100;

    // on snake head hitting bounds reverse xDir
    this.enemy.body.onWorldBounds = new Phaser.Signal();
    this.enemy.body.onWorldBounds.add((event) => {
      // this.xDir *= -1;
      // this.yDir *= -1;
    }, this);
  }

  update() {
    // move in a back and forth (sin) pattern
    if(this.isHead) {
      // this.enemy.x += -1 * this.xDir;
      this.enemy.y += Math.sin(this.enemy.x / 100) * this.yDir;
      this.snakePath.push({x: this.enemy.x, y: this.enemy.y});
    } else {
      if(this.startMovingAfterTime < this.game.time.time) {
        this.enemy.x = this.snakePath[this.onPathIndex].x;
        this.enemy.y = this.snakePath[this.onPathIndex].y;
        this.onPathIndex++;
      }
    }
  }

  giveDirection() {
    this.xModifier = Math.round(Math.random()) * 2 - 1; // -1 or 1
    this.yModifier = Math.round(Math.random()) * 2 - 1; // -1 or 1
  }

}

export default Snake;