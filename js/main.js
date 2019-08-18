/* --Names and GitHub Link-- */
// Group: Paper or Plastic
// Names: Crystal Yu, Noah Lu, Dominic Villa
// GitHup Repo: https://github.com/VillaVivace/AtTheCenterOfTheForest

// let's keep our code tidy with strict mode
"use strict";

// initialize game object
var game = new Phaser.Game(1000, 600, Phaser.AUTO);

var controls;

var Boot = function(game) {this.audio};
Boot.prototype = {
	preload: function() {
		console.log('Boot: preload');
		/* --Music-- */
		this.game.load.audio('snd_title', 'assets/audio/Title Screen.mp3');
		this.game.load.audio('snd_anxiety', 'assets/audio/Anxiety.mp3');
		/* --UI-- */
		this.game.load.atlas('gui_eyeLogo', 'assets/img/eyeLogo.png', 'assets/json/eyeLogo.json');
	},
	create: function() {
		console.log('Boot: create');
		this.game.scale.pageAlignHorizontally = true; // Allows the game to be centered on webpage!
		this.game.scale.pageAlignVertically = true;
		this.game.scale.refresh();
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		this.game.stage.backgroundColor = "#000000";

		this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.ENTER]);
	
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		
		controls = game.input.keyboard.addKeys({ // Custom Keys for our game
			'space': Phaser.Keyboard.SPACEBAR,
			'left': Phaser.Keyboard.LEFT,
			'right': Phaser.Keyboard.RIGHT
		});

		var goToLogo = function() {
			game.state.start('Logo');
		};
		this.audioDecode = game.add.audio('snd_title');
		this.audioDecode.onDecoded.add(goToLogo, this);
	},
	update: function() {
		
	}
}

var Logo = function(game) { 
	this.eyeLogo;
	this.eyeAnim;
	this.animFinished = false;
	this.transitionTimer;
	this.logoText;
};
Logo.prototype = {
	preload: function() {
		console.log('Logo: preload');
		/* --Backgrounds-- */
		this.game.load.atlas('bkg_titleScreen', 'assets/img/titleScreen2.png', 'assets/json/titleScreen2.json');
		this.game.load.image('bkg_intro', 'assets/img/background_intro.png');
		this.game.load.image('bkg_levelShort', 'assets/img/background_levelShort.png');
		this.game.load.image('bkg_levelLong', 'assets/img/background_levelLong.png');
		/* --GUI-- */
		this.game.load.image('gui_dialogBox', 'assets/img/gui_dialogBox.png');
		this.game.load.image('gui_journal', 'assets/img/gui_journal.png');
		this.game.load.image('gui_border', 'assets/img/gui_border.png');
		this.game.load.image('gui_filter', 'assets/img/gui_filter.png');
		this.game.load.atlas('gui_icons', 'assets/img/gui_icons.png', 'assets/json/gui_icons.json');
		/* --Player and NPCs-- */
		this.game.load.atlas('spr_player', 'assets/img/player.png', 'assets/json/player.json');
		/* --Objects-- */
		this.game.load.image('obj_table', 'assets/img/obj_table.png');
		this.game.load.image('obj_door', 'assets/img/obj_door.png');
		/* --SFX-- */
		this.game.load.audio('snd_footstep1', 'assets/audio/footstep_grass1.mp3');
		this.game.load.audio('snd_footstep2', 'assets/audio/footstep_grass2.mp3');
		this.game.load.audio('snd_door', 'assets/audio/door_open.mp3');
	},
	create: function() {
		console.log('Logo: create');

		this.eyeLogo = this.game.add.sprite(0, game.world.height/4, 'gui_eyeLogo');
		this.eyeLogo.x = (game.world.centerX - (this.eyeLogo.width/2));
		this.eyeLogo.animations.add('eye', Phaser.Animation.generateFrameNames('frame_', 0, 18), 5, false);
		this.eyeAnim = this.eyeLogo.animations.play('eye');

		var goToMainMenu = function() {
			game.state.start('MainMenu');
		};

		this.transitionTimer = game.time.create(false);
		this.transitionTimer.add(1000, goToMainMenu, this, true); 
		var style1 = { font: "32px Times New Roman", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle"};
		var style2 = { font: "16px Times New Roman", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle"};
		this.logoText = game.add.text(0, 0, "Paper or Plastic", style1);
		this.logoText.setTextBounds(0, game.world.height/2, game.world.width, 32);
		this.logoText = game.add.text(0, 0, "-PRESENTS-", style2);
		this.logoText.setTextBounds(0, game.world.height/2 + 40, game.world.width, 16);
	},
	update: function() {
		if (this.eyeAnim.isFinished && this.animFinished == false) {
			this.animFinished = true;
			this.game.camera.fade(0x000000, 1000);
			this.transitionTimer.start();
		} 
		if (controls.space.justDown && this.animFinished == false) {
			this.animFinished = true;
			this.game.camera.fade(0x000000, 1000);
			this.transitionTimer.start();
		}
	}
}

var MainMenu = function(game) {
	this.titleAudio;
	this.transitionTimer;
};
MainMenu.prototype = {
	preload: function() {
		console.log('MainMenu: preload');
		// preload our assets
		
		
	},
	create: function() {
		console.log('MainMenu: create');
		game.camera.flash(0x000000, 1000);
		this.game.scale.setGameSize(800, 600);
		this.titleAudio = game.add.audio('snd_title');
		this.titleAudio.volume = 0.25;
		this.titleAudio.fadeIn(2000);

		// Add in title image
		this.titleScreen = game.add.sprite(0, 0, 'bkg_titleScreen'); //The title screen is animated
		this.titleScreen.animations.add('title', Phaser.Animation.generateFrameNames('titleScreen', 0, 19), 10, true);
		this.titleScreen.animations.play('title');
		// Add in load/play buttons
		this.playButton = game.add.button(350, 450, 'gui_icons', goToStage1, this, 
							'playHover', 'play', 'playHover');
		this.loadButton = game.add.button(550, 450, 'gui_icons', goToStage1, this, 
							'loadHover', 'load', 'loadHover');					

		var goToStage1 = function() {
			game.state.start('Stage1');
		};

		this.transitionTimer = game.time.create(false);
    	this.transitionTimer.add(1000, goToStage1, this, true); 
	}, 
	update: function() {
		// Main Menu logic
		if (controls.space.isDown || game.input.activePointer.leftButton.isDown) { // Any of these inputs will start the game
			this.game.camera.fade(0x000000, 1000);
			this.titleAudio.fadeOut(1000);
			this.transitionTimer.start();
		}
	}
}

var Stage1 = function(game) { //Intro Cutscene
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
Stage1.prototype = {
	preload: function() {
		console.log('Stage0_1: preload');
	
	},
	create: function() {
		console.log('Stage0_1: create');
		game.camera.flash(0x000000, 1000);
		this.game.scale.setGameSize(1000, 600);
		this.stageBkg = game.add.sprite(0, 0, 'bkg_intro');
		game.world.setBounds(0, 0, 1600, 600);

		game.sound.stopAll();

		/* --Objects-- */
		this.game.add.sprite(1300, 0, 'obj_door');

		this.player = new PlayerAlt(game, 64, game.world.height - 200, 'spr_player', controls);
		this.game.add.existing(this.player);
		
		/* --GUI & Effects-- */
		this.filter = game.add.sprite(0, 0, 'gui_filter');
		this.filter.scale.setTo(1, 1);
		this.border = game.add.sprite(0, 0, 'gui_border');
		this.border.scale.setTo(1, 1);
		game.world.bringToTop(this.border);
		this.journal = game.add.sprite(0, 0, 'gui_journal');
		this.journal.scale.setTo(0.75, 0.75);
		this.journal.alpha = 0;
		this.dialogBox = game.add.sprite(0, 0, 'gui_dialogBox');
		this.dialogBox.alpha = 0;

		var textStyle = { font: "16px Times New Roman", fill: "#ffffff"}
		this.text = this.game.add.text(0, 0, narrative("stage1_1"), textStyle);
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
    	this.journalTimer.add(1000, this.showJournal, this, true); 

		/* --Camera-- */
		game.camera.follow(this.player, '', 0.25, 0.25);
		game.camera.deadzone = new Phaser.Rectangle(400, 0, 0, 600);
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
		this.journal.x = game.camera.x + 450;
		this.journal.y = game.camera.y + 100;
		this.dialogBox.x = game.camera.x + 200;
		this.dialogBox.y = game.camera.y + (game.world.height - 200);
		this.text.x = game.camera.x + 232;
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
			game.add.audio('snd_door').play('', 0, 0.0075, false, false);
			game.state.start('Stage2');
		}
	}
}

var Stage2 = function(game) {
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
	this.table1;
};
Stage2.prototype = {
	preload: function() {
		// Anything to preload during the Play state
		console.log('Stage0_2: preload');
	
	},
	create: function() {
		console.log('Stage0_2: create');
		this.stageBkg = game.add.sprite(0, 0, 'bkg_levelShort');
		game.world.setBounds(0, 0, 2400, 600);

		game.add.audio('snd_anxiety').play('', 0, 0.5, true);

		/* --Objects & Furniture-- */
		this.table1 = game.add.sprite(330, 355, 'obj_table');

		this.player = new PlayerAlt(game, 150, game.world.height - 200, 'spr_player', controls);
		this.game.add.existing(this.player);
		
		/* --GUI & Effects-- */
		this.filter = game.add.sprite(0, 0, 'gui_filter');
		this.filter.scale.setTo(1, 1);
		this.border = game.add.sprite(0, 0, 'gui_border');
		this.border.scale.setTo(1, 1);
		game.world.bringToTop(this.border);
		this.journal = game.add.sprite(0, 0, 'gui_journal');
		this.journal.scale.setTo(0.75, 0.75);
		this.journal.alpha = 0;
		this.dialogBox = game.add.sprite(0, 0, 'gui_dialogBox');
		this.dialogBox.alpha = 0;
		var textStyle = { font: "16px Times New Roman", fill: "#ffffff"}
		this.text = this.game.add.text(0, 0, narrative("stage2_1"), textStyle);
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
    	this.journalTimer.add(500, this.showJournal, this, true); 

		/* --Camera-- */
		game.camera.follow(this.player, '', 0.25, 0.25);
		game.camera.deadzone = new Phaser.Rectangle(400, 0, 0, 600);
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
    	this.stepTimer.loop(1000, footstep, this);
		this.stepTimer.start();
	},
	update: function() {
		// Run the 'Play' state's game loop
		
		/* --GUI & Effects Positioning-- */
		this.border.x = game.camera.x - 8; // We want the GUI and FX to align with the camera, not just a world position
		this.border.y = game.camera.y;
		this.filter.x = game.camera.x - 8;
		this.filter.y = game.camera.y;
		this.journal.x = game.camera.x + 450;
		this.journal.y = game.camera.y + 100;
		this.dialogBox.x = game.camera.x + 200;
		this.dialogBox.y = game.camera.y + (game.world.height - 200);
		this.text.x = game.camera.x + 232;
		this.text.y = game.camera.y + (game.world.height - 150);
		
		/* --Cutscenes-- */
		if (this.cutsceneTriggered == false && this.player.x > 600) {
			this.player.changeState('cutscene');
			this.journalTimer.start();
		}
		if (controls.space.justDown && this.cutsceneTriggered == true) {
			this.showJournal(false);
		}
		if (this.player.x > 330 && this.player.x < 490 && controls.space.isDown) {
			this.player.changeState('hidden');
		}
		if ((this.player.x > 330 && this.player.x < 490) && this.helpText == false) {
			this.helpText = true;
			game.add.text(this.player.x + 32, this.player.y + 64, '[Hold SPACE to hide]', { font: "16px Times New Roman", fill: "#000000"});
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
game.state.add('Boot', Boot);
game.state.add('Logo', Logo);
game.state.add('MainMenu', MainMenu);
game.state.add('Stage1', Stage1);
game.state.add('Stage2', Stage2);
game.state.add('GameOver', GameOver);
game.state.start('Boot');
/* --End State Management-- */