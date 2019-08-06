// let's keep our code tidy with strict mode
"use strict";

// initialize game object
var game = new Phaser.Game(1280, 720, Phaser.AUTO);

var MainMenu = function(game) {};
MainMenu.prototype = {
	preload: function() {
		console.log('MainMenu: preload');
		// preload our assets
		this.game.load.image('player', 'assets/img/player.png');
	},
	create: function() {
		console.log('MainMenu: create');
		game.input.keyboard.addKeyCapture([ Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.R, Phaser.Keyboard.SPACEBAR ]);
		
	}, 
	update: function() {
		// Main Menu logic
			game.state.start('Play');
	}
}

var Play = function(game) {
	this.player;
	this.platforms;
};
Play.prototype = {
	preload: function() {
		// Anything to preload during the Play state
		console.log('Play: preload');
	
	},
	create: function() {
		console.log('Play: create');
		game.stage.backgroundColor = "#101543";
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		this.player = new Player(game, 'player', 0);
		this.game.add.existing(this.player);
		
		this.platforms = game.add.group();
		this.platforms.enableBody = true;
		for (var i = 1; i <= 10; i++) {
			this.platforms.create((128 * i), game.world.height-32, 'player');
		}
		this.platforms.setAllChildren('body.collideWorldBounds', true);
		this.platforms.setAllChildren('body.immovable', true);
	},
	update: function() {
		// Run the 'Play' state's game loop
		
		var hitPlatform = game.physics.arcade.collide(this.player, this.platforms);
		
	}
}

var GameOver = function(game) {};
GameOver.prototype = {
	preload: function() {
		console.log('GameOver: preload');		
	},
	create: function() {
		console.log('Gameover: create');
		
	}, 
	update: function() {
		// Game Over logic
		
	}
}

/* --State Management-- */
	game.state.add('MainMenu', MainMenu);
	game.state.add('Play', Play);
	game.state.add('GameOver', GameOver);
	game.state.start('MainMenu');
/* --End State Management-- */