import game from '../main';
import enemyTypes from '../EnemyTypes';

class Pinwheel {

  constructor(game) {
    this.game = game.game;
    this.typeData = enemyTypes[0];
    this.enemies = game.enemies;
    this.player = game.player;
    this.canCollide = false;
    this.init();
  }

  init() {
    this.spawn();
    this.enemies.enemyFadeIn(this);
    // this.giveVelocity();  
  }

  spawn() {
    let x = Math.floor(Math.random() * this.game.width);
    let y = Math.floor(Math.random() * this.game.height);
    this.enemy = this.game.add.sprite(x, y, 'pinwheel');
    this.enemy.instance = this;
    this.enemy.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enable(this.enemy);
    this.enemy.body.collideWorldBounds = true;
    this.enemy.body.bounce.set(1);
    this.enemy.alpha = 0;
  }

  giveVelocity() {
    let velocity = 100;
    let xModifier = Math.round(Math.random()) * 2 - 1; // -1 or 1
    let yModifier = Math.round(Math.random()) * 2 - 1; // -1 or 1
    this.enemy.body.velocity.x = xModifier * velocity;  
    this.enemy.body.velocity.y = yModifier * velocity;
  }

  update() {
    // if pinwheel has not be given a random vel yet
    if(this.canCollide &&
       this.enemy.body.velocity.x == 0 &&
       this.enemy.body.velocity.y == 0
    ) {  
      this.giveVelocity();
    }

    if(this.canCollide) this.enemy.angle += 5;
  }
}

export default Pinwheel;