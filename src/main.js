import Game from './Game';

// creat the game
let game = new Game();

// init phaser and pass it game as it's state
let phaser = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', game);

export default game;