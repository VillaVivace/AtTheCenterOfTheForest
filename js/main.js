// let's keep our code tidy with strict mode
"use strict";

// initialize game object
var game = new Phaser.Game(800, 600, Phaser.AUTO);

var controls;

var MainMenu = function(game) {};
MainMenu.prototype = {
	preload: function() {
		console.log('MainMenu: preload');
		// preload our assets
		this.game.load.atlas('bkg_titleScreen', 'assets/img/titleScreen.png', 'assets/json/titleScreen.json');
		this.game.load.image('bkg_intro', 'assets/img/background_intro.png');
		this.game.load.image('gui_dialogBox', 'assets/img/gui_dialogBox.png');
		this.game.load.image('gui_journal', 'assets/img/gui_journal.png');
		//this.game.load.image('spr_player', 'assets/img/player.png');
	},
	create: function() {
		console.log('MainMenu: create');
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		this.game.scale.refresh();

		game.stage.backgroundColor = "#000000";

		this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.ENTER]);
		
		controls = game.input.keyboard.createCursorKeys();
		controls = game.input.keyboard.addKeys({ 'space': Phaser.Keyboard.SPACEBAR, 'enter': Phaser.Keyboard.ENTER });

		this.titleScreen = game.add.sprite(0, 0, 'bkg_titleScreen');
		this.titleScreen.animations.add('title', Phaser.Animation.generateFrameNames('titleScreen', 1, 20), 10, true);
		this.titleScreen.animations.play('title');
	}, 
	update: function() {
		// Main Menu logic
		if (controls.space.isDown || controls.enter.isDown || game.input.activePointer.leftButton.isDown) { //game.input.activePointer.leftButton.isDown
			this.game.state.start('GameOver');
		}
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
		game.state.start('MainMenu');
	}
}

/* --State Management-- */
	game.state.add('MainMenu', MainMenu);
	game.state.add('Play', Play);
	game.state.add('GameOver', GameOver);
	game.state.start('MainMenu');
/* --End State Management-- */