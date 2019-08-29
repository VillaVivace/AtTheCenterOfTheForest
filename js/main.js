/* --Names and GitHub Link-- */
// Group: Paper or Plastic
// Names: Crystal Yu, Noah Lu, Dominic Villa
// GitHup Repo: https://github.com/VillaVivace/AtTheCenterOfTheForest

// let's keep our code tidy with strict mode
"use strict";

// initialize game object
var game = new Phaser.Game(1000, 600, Phaser.AUTO);

var controls;
var titleAudio;

/* --State Management-- */
game.state.add('Boot', Boot);
game.state.add('Logo', Logo);
game.state.add('MainMenu', MainMenu);
game.state.add('GroundLevelOutside', GroundLevelOutside);
game.state.add('GroundLevelInside', GroundLevelInside);
game.state.add('Level1', Level1);
game.state.add('Stairs1', Stairs1);
game.state.add('Level2', Level2);
game.state.add('Stairs2', Stairs2);
game.state.add('Sub1', Sub1);
game.state.add('Sub2', Sub2);
game.state.add('Stairs3', Stairs3);
game.state.add('Level3', Level3);
game.state.add('GameOver', GameOver);
game.state.start('Boot');
/* --End State Management-- */
