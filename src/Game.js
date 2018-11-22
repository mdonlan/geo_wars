import Player from './Player';
import Missiles from './Missiles';

class Game {
  constructor() {
    this.init();
  }

  init() {
    // create instances
    this.missiles = new Missiles(this);
    this.player = new Player(this);
  }

  preload() {
    console.log('preload');
    this.player.preload()
    this.missiles.preload();
  }

  create() {
    console.log('create');
    this.player.create();
  }

  update() {
    // console.log('update');
    this.player.update();
    this.missiles.update();
  }

}

export default Game;