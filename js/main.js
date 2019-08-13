/* --Names and GitHub Link-- */
// Group: Paper or Plastic
// Names: Crystal Yu, Noah Lu, Dominic Villa
// GitHup Repo: https://github.com/VillaVivace/AtTheCenterOfTheForest

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
		/* --Backgrounds-- */
		this.game.load.atlas('bkg_titleScreen', 'assets/img/titleScreen.png', 'assets/json/titleScreen.json');
		this.game.load.image('bkg_intro', 'assets/img/background_intro.png');
		this.game.load.image('bkg_level1', 'assets/img/background_level1.png');
		/* --GUI-- */
		this.game.load.image('gui_dialogBox', 'assets/img/gui_dialogBox.png');
		this.game.load.image('gui_journal', 'assets/img/gui_journal.png');
		this.game.load.image('gui_border', 'assets/img/gui_border.png');
		this.game.load.image('gui_filter', 'assets/img/gui_filter.png');
		/* --Player and NPCs-- */
		this.game.load.atlas('spr_player', 'assets/img/player.png', 'assets/json/player.json');
		/* --Music-- */
		this.game.load.audio('snd_title', 'assets/audio/Title Screen.mp3');
		this.game.load.audio('snd_anxiety', 'assets/audio/Anxiety.mp3');
		/* --SFX-- */
		this.game.load.audio('snd_footstep1', 'assets/audio/footstep_grass1.mp3');
		this.game.load.audio('snd_footstep2', 'assets/audio/footstep_grass2.mp3');
		this.game.load.audio('snd_door', 'assets/audio/door_open.mp3');
		
	},
	create: function() {
		console.log('MainMenu: create');
		this.game.scale.pageAlignHorizontally = true; // Allows the game to be centered on webpage!
		this.game.scale.pageAlignVertically = true;
		this.game.scale.refresh();

		this.game.stage.backgroundColor = "#000000";

		game.add.audio('snd_title').play('', 0, 0.75, true);

		this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.ENTER]);
		
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		controls = game.input.keyboard.addKeys({ // Custom Keys for our game
			'space': Phaser.Keyboard.SPACEBAR, 
			'enter': Phaser.Keyboard.ENTER,
			'left': Phaser.Keyboard.LEFT,
			'right': Phaser.Keyboard.RIGHT
		});

		this.titleScreen = game.add.sprite(0, 0, 'bkg_titleScreen'); //The title screen is animated
		this.titleScreen.animations.add('title', Phaser.Animation.generateFrameNames('titleScreen', 1, 20), 10, true);
		this.titleScreen.animations.play('title');
	}, 
	update: function() {
		// Main Menu logic
		if (controls.space.isDown || controls.enter.isDown || game.input.activePointer.leftButton.isDown) { // Any of these inputs will start the game
			this.game.state.start('Stage0_1');
		}
	}
}

var Stage0_1 = function(game) { //Intro Cutscene
	this.player;
	this.border;
	this.filter;
	this.journal;
	this.dialogBox;
	this.cutsceneTriggered = false;
	this.text;
	this.showJournal;
	this.timer;
	this.stepTimer;
};
Stage0_1.prototype = {
	preload: function() {
		console.log('Stage0_1: preload');
	
	},
	create: function() {
		console.log('Stage0_1: create');
		this.stageBkg = game.add.sprite(0, 0, 'bkg_intro');
		game.world.setBounds(0, 0, 1600, 600);

		game.sound.stopAll();

		this.player = new PlayerAlt(game, 64, game.world.height - 150, 'spr_player', controls);
		this.game.add.existing(this.player);
		
		/* --GUI & Effects-- */
		this.filter = game.add.sprite(0, 0, 'gui_filter');
		this.filter.scale.setTo(1.125, 1.125);
		this.border = game.add.sprite(0, 0, 'gui_border');
		this.border.scale.setTo(1.125, 1.125);
		game.world.bringToTop(this.border);
		this.journal = game.add.sprite(0, 0, 'gui_journal');
		this.journal.scale.setTo(0.75, 0.75);
		this.journal.alpha = 0;
		this.dialogBox = game.add.sprite(0, 0, 'gui_dialogBox');
		this.dialogBox.alpha = 0;
		var textStyle = { font: "16px Times New Roman", fill: "#ffffff"}
		this.text = this.game.add.text(0, 0, '*NEW JOUNRAL ENTRY* \"I\'ve been looking everywhere for this tower and I\'ve finally arrived. \nI can\'t believe I made it. Only time will tell what awaits me. \nI better keep my visit documented in this book.\" [Press SPACE to continue]', textStyle);
		this.text.alpha = 0;

		this.showJournal = function(show) {
			if (show == true) {
				this.cutsceneTriggered = true;
				this.dialogBox.alpha = 1;
				this.journal.alpha = 1;
				this.text.alpha = 1;
			}
			else {
				this.player.changeState('normal');
				this.dialogBox.alpha = 0;
				this.journal.alpha = 0;
				this.text.alpha = 0;
			}
		};

		this.journalTimer = game.time.create(false);
    	this.journalTimer.add(2000, this.showJournal, this, true); 

		/* --Camera-- */
		game.camera.follow(this.player, '', 0.25, 0.25);
		game.camera.deadzone = new Phaser.Rectangle(200, 0, 50, 600);
		/* --Footsteps-- */
		var footstep = function() {
			var randStep = Math.random();
			var stepSound;
			if ((controls.left.isDown || controls.right.isDown) && this.player.getState() == 'normal') {
				if (randStep < 0.5) {
					stepSound = game.add.audio('snd_footstep1');
				} else {
					stepSound = game.add.audio('snd_footstep2');
				}
				stepSound.play('', 0, 0.5, false, false);
			}
		}
		this.stepTimer = game.time.create(false);
    	this.stepTimer.loop(500, footstep, this);
    	this.stepTimer.start();
	},
	update: function() {
		/* --GUI & Effects Positioning-- */
		this.border.x = game.camera.x - 8; // We want the GUI and FX to align with the camera, not just a world position
		this.border.y = game.camera.y;
		this.filter.x = game.camera.x - 8;
		this.filter.y = game.camera.y;
		this.journal.x = game.camera.x + 250;
		this.journal.y = game.camera.y + 100;
		this.dialogBox.x = game.camera.x;
		this.dialogBox.y = game.camera.y + (game.world.height - 200);
		this.text.x = game.camera.x + 32;
		this.text.y = game.camera.y + (game.world.height - 150);
		
		/* --Cutscenes-- */
		if (this.cutsceneTriggered == false && this.player.x > 1000) {
			this.player.changeState('cutscene');
			this.journalTimer.start();
		}
		if (controls.space.justDown && this.cutsceneTriggered == true) {
			this.showJournal(false);
		}

		if (this.player.x >= 1330) { // Area of door
			game.add.audio('snd_door').play('', 0, 0.15, false, false);
			game.state.start('Stage0_2');
		}
	}
}

var Stage0_2 = function(game) {
	this.player;
	this.border;
	this.filter;
	this.journal;
	this.dialogBox;
	this.cutsceneTriggered = false;
	this.text;
	this.showJournal;
	this.timer;
	this.stepTimer;
	this.helpText = false;
};
Stage0_2.prototype = {
	preload: function() {
		// Anything to preload during the Play state
		console.log('Stage0_2: preload');
	
	},
	create: function() {
		console.log('Stage0_2: create');
		this.stageBkg = game.add.sprite(0, 0, 'bkg_level1');
		game.world.setBounds(0, 0, 1600, 600);

		game.add.audio('snd_anxiety').play('', 0, 0.75, true);

		this.player = new PlayerAlt(game, 150, game.world.height - 150, 'spr_player', controls);
		this.game.add.existing(this.player);
		
		/* --GUI & Effects-- */
		this.filter = game.add.sprite(0, 0, 'gui_filter');
		this.filter.scale.setTo(1.125, 1.125);
		this.border = game.add.sprite(0, 0, 'gui_border');
		this.border.scale.setTo(1.125, 1.125);
		game.world.bringToTop(this.border);
		this.journal = game.add.sprite(0, 0, 'gui_journal');
		this.journal.scale.setTo(0.75, 0.75);
		this.journal.alpha = 0;
		this.dialogBox = game.add.sprite(0, 0, 'gui_dialogBox');
		this.dialogBox.alpha = 0;
		var textStyle = { font: "16px Times New Roman", fill: "#ffffff"}
		this.text = this.game.add.text(0, 0, '*NEW JOUNRAL ENTRY* \"I am already regretting my decision to come here.\nJust have to push on...\" [Press SPACE to continue]', textStyle);
		this.text.alpha = 0;

		this.showJournal = function(show) {
			if (show == true) {
				this.cutsceneTriggered = true;
				this.dialogBox.alpha = 1;
				this.journal.alpha = 1;
				this.text.alpha = 1;
			}
			else {
				this.player.changeState('normal');
				this.dialogBox.alpha = 0;
				this.journal.alpha = 0;
				this.text.alpha = 0;
			}
		};

		this.journalTimer = game.time.create(false);
    	this.journalTimer.add(2000, this.showJournal, this, true); 

		/* --Camera-- */
		game.camera.follow(this.player, '', 0.25, 0.25);
		game.camera.deadzone = new Phaser.Rectangle(200, 0, 50, 600);
		/* --Footsteps-- */
		var footstep = function() {
			var randStep = Math.random();
			var stepSound;
			if ((controls.left.isDown || controls.right.isDown) && this.player.getState() == 'normal') {
				if (randStep < 0.5) {
					stepSound = game.add.audio('snd_footstep1');
				} else {
					stepSound = game.add.audio('snd_footstep2');
				}
				stepSound.play('', 0, 0.5, false, false);
			}
		}
		this.stepTimer = game.time.create(false);
    	this.stepTimer.loop(500, footstep, this);
    	this.stepTimer.start();
	},
	update: function() {
		// Run the 'Play' state's game loop
		
		/* --GUI & Effects Positioning-- */
		this.border.x = game.camera.x - 8; // We want the GUI and FX to align with the camera, not just a world position
		this.border.y = game.camera.y;
		this.filter.x = game.camera.x - 8;
		this.filter.y = game.camera.y;
		this.journal.x = game.camera.x + 250;
		this.journal.y = game.camera.y + 100;
		this.dialogBox.x = game.camera.x;
		this.dialogBox.y = game.camera.y + (game.world.height - 200);
		this.text.x = game.camera.x + 32;
		this.text.y = game.camera.y + (game.world.height - 150);
		
		/* --Cutscenes-- */
		if (this.cutsceneTriggered == false && this.player.x > 600) {
			this.player.changeState('cutscene');
			this.journalTimer.start();
		}
		if (controls.space.justDown && this.cutsceneTriggered == true) {
			this.showJournal(false);
		}
		if (this.player.x > 330 && this.player.x < 410 && controls.enter.isDown) {
			this.player.changeState('hidden');
		} 
		if (this.player.x > 1320 && this.player.x < 1600 && controls.enter.isDown) {
			this.player.changeState('hidden');
		}
		if ((this.player.x > 330 && this.player.x < 410) && this.helpText == false) {
			this.helpText = true;
			game.add.text(this.player.x - 32, this.player.y + 128, '[Hold ENTER to hide]', { font: "16px Times New Roman", fill: "#000000"});
		}
		
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
	game.state.add('Stage0_1', Stage0_1);
	game.state.add('Stage0_2', Stage0_2);
	game.state.add('GameOver', GameOver);
	game.state.start('MainMenu');
/* --End State Management-- */