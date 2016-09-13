//Main sript used to declare all the other phaser game states

var game = new Phaser.Game(720, 1280, Phaser.AUTO, 'GameDiv'); //Game object. Resoultion can be made literally anything and the game will scale correctly

game.state.add('play', PlayState); //Gameplay happens here
game.state.add('load', LoadState); //Loading screen
game.state.add('menu', MenuState); //First screen where you can select to play
game.state.add('over', OverState); //Game Over screen
game.state.start('menu'); //Navigates to menu screen first
