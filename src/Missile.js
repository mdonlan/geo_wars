class Missile {

  constructor(game) {
    this.game = game;

    this.init();
  }

  init() {
    this.missile = this.game.add.sprite(10, 10, 'missile');
    this.missile.anchor.setTo(0.5, 0.5);
    this.missile.scale.setTo(0.5, 0.5);
    this.game.physics.arcade.enable(this.missile);
    this.missile.angle = this.game.player.angle + 90;
    // game.physics.arcade.velocityFromRotation(player.rotation + angleOffset, 600, projectile.body.velocity);
    // projectile.scale.x *= -1; // flip sprite
    // projectile.checkWorldBounds = true;
    // projectile.events.onOutOfBounds.add(destroyProjectile);
    // projectiles.add(projectile);

    // add trail emitter
    // let trail = projectile.addChild(game.make.sprite(0,20, 'rocket_trail'));
    // trail.alpha = 0.8
    // trail.anchor.setTo(0.5, 0.5);
    // trail.scale.setTo(0.5, 0.5);
    // trail.rotation += Math.PI * 0.5; // rotate child to match parent rotation
  }

  update() {
    // console.log('update from missile');
  }
}

export default Missile;