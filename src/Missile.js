class Missile {

  constructor(Game) {
    this.game = Game.game;
    this.player = Game.player.sprite;
    this.missiles = Game.missiles.missiles;
    this.init();
  }

  init() {
    // console.log(this.player)
    // console.log(this.player)
    this.missile = this.game.add.sprite(this.player.x, this.player.y, 'missile');
    this.missile.anchor.setTo(0.5, 0.5);
    this.missile.scale.setTo(0.5, 0.5);
    this.game.physics.arcade.enable(this.missile);
    this.missile.angle = this.player.angle + 90;
    this.game.physics.arcade.velocityFromRotation(this.player.rotation, 600, this.missile.body.velocity);
    // if missile hits a wall
    this.missile.checkWorldBounds = true;
    this.missile.events.onOutOfBounds.add(this.destroy.bind(this));
  }

  destroy() {
    // console.log('destroying missile')
    this.missile.kill();
  }

  revive() {
    // console.log('reviving missile')
    this.missile.reset(this.player.x, this.player.y);
    this.missile.angle = this.player.angle + 90;
    this.game.physics.arcade.velocityFromRotation(this.player.rotation, 600, this.missile.body.velocity);
  }

  update() {
    // console.log('update from missile');
  }
}

export default Missile;