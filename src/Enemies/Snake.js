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
    this.canCollide = false;
    this.prevX = null;
    this.prevY = null;
    this.onPathIndex = 0;
    
    

    if(this.isHead) {
      // randomly decide if this snake goes up/down or left/right
      this.isVertSnake = Math.random() >= 0.5; 
      this.randSpeed = Math.floor(Math.random() * 100) + 25;
    } else {

      // this is the delay between when each snake part starts
      // to follow the head path
      // determined by the pos in the snake and the speed and a built in delay (300ms)
      this.startMovingAfterTime = this.game.time.time + ((index * 300) - (this.snakeGroup[0].randSpeed * (index)));
    }

    // this.colors = [
    //   '0x7D6608',
    //   '0x9A7D0A',
    //   '0xB7950B',
    //   '0xD4AC0D',
    //   '0xF1C40F',
    //   '0xF4D03F',
    //   '0xF7DC6F',
    //   '0xF9E79F',
    //   '0xFCF3CF',
    //   '0xFEF9E7'
    // ]

    this.colors = [
      '0x4A235A',
      '0x5B2C6F',
      '0x6C3483',
      '0x7D3C98',
      '0x8E44AD',
      '0xA569BD',
      '0xBB8FCE',
      '0xD2B4DE',
      '0xE8DAEF',
    ]

    // this.xDir = 1;
    // this.yDir = 1;

    this.init();
  }

  init() {

    if(this.isHead) {

      console.log(this.isVertSnake)

      this.giveDirection();
    }

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
    this.enemy.alpha = 0;
    this.enemy.body.collideWorldBounds = true;
    this.enemy.body.bounce.set(1);

    // if this is the head of the snake
    // make snake group decisions in head
    if(this.isHead) {

      if(this.isVertSnake) {
        this.enemy.body.velocity.y = this.randSpeed * this.yDir;        
      } else {
        this.enemy.body.velocity.x = this.randSpeed * this.xDir;
      }

      this.enemy.scale.setTo(0.7, 0.7);
    } else {
      this.enemy.scale.setTo(0.5, 0.5);
    }
    
    this.enemy.tint = this.colors[this.index]

  }

  update() {

    if(this.snakePath.length > 500) {
      // console.log("SNAKE PATH IS GETTING LONG")
    }

    // move in a back and forth (sin) pattern
    if(this.isHead) {
      // this.enemy.x += -1 * this.xDir;

      if(this.isVertSnake) {
        this.enemy.x += Math.sin(this.enemy.y / 50);
      } else {
        this.enemy.y += Math.sin(this.enemy.x / 50);        
      }

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
    this.xDir = Math.round(Math.random()) * 2 - 1; // -1 or 1
    this.yDir = Math.round(Math.random()) * 2 - 1; // -1 or 1
  }

}

export default Snake;