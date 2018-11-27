class Player {
  constructor(game) {
    this.game = game;
    this.fireCooldown = 300;
    this.lastFiredTime = null;
  }

  preload() {
    this.game.load.image('player', '../assets/images/player.png');
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
    this.sprite = this.game.add.sprite(10, 10, 'player');
    this.sprite.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.body.setSize(20, 20, 10, 10);
    this.sprite.body.collideWorldBounds = true;
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
    let vel = this.sprite.body.velocity;
    let velChangeAmount = 3;
    let maxVel = 300;

    // check if player is moving
    if(this.aKey.isDown && vel.x > -maxVel) vel.x -= velChangeAmount;
    if(this.dKey.isDown && vel.x < maxVel) vel.x += velChangeAmount;
    if(this.wKey.isDown && vel.y > -maxVel) vel.y -= velChangeAmount;
    if(this.sKey.isDown && vel.y < maxVel) vel.y += velChangeAmount;

    // check if firing
    if(this.spaceKey.isDown && this.game.time.time > this.lastFiredTime + this.fireCooldown) {
      this.lastFiredTime = this.game.time.time;
      this.game.missiles.launch();
    } 

    // if not moving slow velocity
    if(!this.aKey.isDown && !this.dKey.isDown) {
      if(vel.x < 0) vel.x += velChangeAmount;
      else if(vel.x > 0) vel.x -= velChangeAmount;
    }

    if(!this.wKey.isDown && !this.sKey.isDown) {
      if(vel.y < 0) vel.y += velChangeAmount;
      else if(vel.y > 0) vel.y -= velChangeAmount;
    } 
  }

  rotatePlayer(e) {
    // when the mouse moves update the player angle
    this.sprite.rotation = Math.atan2(e.clientY - this.sprite.y, e.clientX - this.sprite.x);
  }

}

export default Player;