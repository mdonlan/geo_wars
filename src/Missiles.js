import Missile from './Missile';

class Missiles {

  constructor(game) {
    this.game = game;
    this.missiles = [];
  }

  preload() {
    this.game.load.image('missile', '../missile.png');    
  }

  create() {

  }

  update() {
    this.missiles.forEach((missile) => {
      missile.update();
    });
  }

  launch() {
    console.log('player is launching a missile');
    let missile = new Missile(this.game);
    this.missiles.push(missile);
  }

}

export default Missiles;