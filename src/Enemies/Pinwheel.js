import game from '../main';
import enemyTypes from '../EnemyTypes';

class Pinwheel {

  constructor(game) {
    this.game = game.game;
    this.typeData = enemyTypes[0];
    this.init();
  }

  init() {
    this.spawn();
    this.giveVelocity();  
  }

  spawn() {
    let x = Math.floor(Math.random() * this.game.width);
    let y = Math.floor(Math.random() * this.game.height);
    this.enemy = this.game.add.sprite(x, y, 'pinwheel');
    this.enemy.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enable(this.enemy);
    this.enemy.body.collideWorldBounds = true;
    this.enemy.body.bounce.set(1);
  }

  giveVelocity() {
    let velocity = 100;
    let xModifier = Math.round(Math.random()) * 2 - 1; // -1 or 1
    let yModifier = Math.round(Math.random()) * 2 - 1; // -1 or 1
    this.enemy.body.velocity.x = xModifier * velocity;  
    this.enemy.body.velocity.y = yModifier * velocity;
  }

  update() {
    
  }
}

export default Pinwheel;