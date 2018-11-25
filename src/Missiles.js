import Missile from './Missile';

class Missiles {

  constructor(game) {
    this.game = game;
    this.missiles = []; // all missile instances
    this.missileSprites = this.game.add.group(); // all missile sprites
  }

  preload() {
    this.game.load.image('missile', '../assets/images/missile.png');    
  }

  create() {

  }

  update() {
    
  }

  launch() {
    // player is launching a missile
    // either revive dead misisle or create new one

    // check if we can revive a missile sprite
    let missile = this.missiles.find((missile) => {return !missile.missile.alive});
    
    if(missile) { // if we found a missile we can revive
      missile.revive();
    } else { // if no revivable missile found, make new sprite
      let missile = new Missile(this.game);
      this.missiles.push(missile);
      this.missileSprites.add(missile.missile);
    }
  }
}

export default Missiles;