class Player {
  constructor(game) {
    this.game = game;
  }

  preload() {
    this.game.load.image('player', '../player.png');
  }

  create() {
    this.createPlayer();
    this.setupInput();
    document.addEventListener("mousemove", (e) => { this.rotatePlayer(e) });
  }

  update() {
    this.checkInput();
  }

  createPlayer() {
    this.player = this.game.add.sprite(10, 10, 'player');
    this.player.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enable(this.player);
    this.player.body.setSize(20, 20, 10, 10);
    this.player.body.collideWorldBounds = true;
  }

  setupInput() {
    // setup keyboard input
    this.spaceKey = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR); // fire -- also mouse1
    this.wKey = this.game.input.keyboard.addKey(Phaser.KeyCode.W); // up
    this.aKey = this.game.input.keyboard.addKey(Phaser.KeyCode.A); // left
    this.sKey = this.game.input.keyboard.addKey(Phaser.KeyCode.S); // down
    this.dKey = this.game.input.keyboard.addKey(Phaser.KeyCode.D); // right
  }

  checkInput() {
    // check player movement input
    let vel = this.player.body.velocity;
    let velChangeAmount = 10;
    let maxVel = 300;

    if(this.aKey.isDown && vel.x > -maxVel) vel.x -= velChangeAmount;
    if(this.dKey.isDown && vel.x < maxVel) vel.x += velChangeAmount;
    if(this.wKey.isDown && vel.y > -maxVel) vel.y -= velChangeAmount;
    if(this.sKey.isDown && vel.y < maxVel) vel.y += velChangeAmount;

    if(this.spaceKey.isDown) this.game.missiles.launch();
  }

  rotatePlayer(e) {
    // when the mouse moves update the player angle
    this.player.rotation = Math.atan2(e.clientY - this.player.y, e.clientX - this.player.x);
  }

}

export default Player;