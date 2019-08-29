var GroundLevelOutside = function(game) { //Intro Cutscene
	this.player;

	this.border;
	this.filter;
	this.journal;
	this.dialogBox;
	this.text;
	this.showJournal;
	this.bounds;
	this.cutsceneTriggered;
	this.gameStart;
	this.touchedDoorOnce;

	this.timer;
	this.stepTimer;

	this.door;
};
GroundLevelOutside.prototype = {
	preload: function() {
		console.log('GroundLevelOutside: preload');
	
	},
	create: function() {
		console.log('GroundLevelOutside: create');

		this.cutsceneTriggered = false;
		this.gameStart = true;
		this.touchedDoorOnce = false;

		game.camera.flash(0x000000, 1000);
		this.game.scale.setGameSize(1000, 600);
		this.stageBkg = game.add.sprite(0, 0, 'bkg_intro');
		game.world.setBounds(0, 0, 1600, 600);

		game.sound.stopAll();

		/* --Objects-- */
		this.door = this.game.add.sprite(1300, 0, 'obj_door');
		game.physics.enable(this.door);
		//this.door.body.setSize(50, 600, 50);
		this.door.body.immovable = true;

		this.bounds = game.add.group();
		this.bounds.enableBody = true;
		this.bounds.alpha = 0;
		this.bound = this.bounds.create(1350, 0, 'obj_bounds'); 
		this.bound.body.immovable = true;

		this.player = new Player(game, 64, game.world.height - 200, 'spr_player', controls);
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
		this.leftArrow = game.add.sprite(game.camera.centerX - 64, game.camera.height - 64, 'gui_icons', 'arrowkey');
		this.leftArrow.anchor.set(0.5, 0.5);
		this.leftArrow.alpha = 0;
		this.rightArrow = game.add.sprite(game.camera.centerX + 64, game.camera.height - 64, 'gui_icons', 'arrowkey');
		this.rightArrow.anchor.set(0.5, 0.5);
		this.rightArrow.scale.x = -1;
		this.rightArrow.alpha = 0;
		this.spaceButton = game.add.sprite(this.door.centerX, this.door.centerY - 64, 'gui_icons', 'space');
		this.spaceButton.anchor.set(0.5, 0.5);
		this.spaceButton.alpha = 0;
		
		var textStyle = {font: 'Handlee', fontSize: '18px', fill: '#ffffff' }
		this.text = this.game.add.text(0, 0, narrative("intro"), textStyle);
		this.text.alpha = 0;


		this.showHelpUI = function(show) {
			if (show == true) {
				game.add.audio('snd_whisper').play('', 0, 0.50, false);
				game.add.tween(this.leftArrow).to( { alpha: 1 }, 1000, Phaser.Easing.Sinusoidal.In, true);
				game.add.tween(this.rightArrow).to( { alpha: 1 }, 1000, Phaser.Easing.Sinusoidal.In, true);
				this.helpUITimer.start();
			}
			else {
				game.add.tween(this.leftArrow).to( { alpha: 0 }, 1000, Phaser.Easing.Sinusoidal.In, true);
				game.add.tween(this.rightArrow).to( { alpha: 0 }, 1000, Phaser.Easing.Sinusoidal.In, true);
			}
		};
		this.showActionUI = function(show) {
			if (show == true) {
				game.add.tween(this.spaceButton).to( { alpha: 0.75 }, 1000, Phaser.Easing.Sinusoidal.In, true);
			}
		};

		this.showJournal = function(show) {
			if (show == true) {
				game.add.audio('snd_pageTurn').play('', 0, 0.25, false);
				this.cutsceneTriggered = true;
				this.dialogBox.alpha = 1;
				this.journal.alpha = 1;
				this.text.alpha = 1;
			}
			else {
				this.dialogBox.alpha = 0;
				this.journal.alpha = 0;
				this.text.alpha = 0;
				this.player.changeState('normal');
				this.showHelpUI(true);
			}
		};

		this.journalTimer = game.time.create(false);
    	this.journalTimer.add(1000, this.showJournal, this, true); 

		this.helpUITimer = game.time.create(false);
    	this.helpUITimer.add(3000, this.showHelpUI, this, false); 
		
	},
	update: function() {
		/* --GUI & Effects Positioning-- */
		this.border.x = game.camera.x - 8; // We want the GUI and FX to align with the camera, not just a world position
		this.border.y = game.camera.y;
		this.filter.x = game.camera.x - 8;
		this.filter.y = game.camera.y;
		this.dialogBox.x = game.camera.x + (game.camera.width/2 - this.dialogBox.width/2);
		this.dialogBox.y = game.camera.y + (game.world.height - this.dialogBox.height);
		this.journal.x = game.camera.x + (game.camera.width/2 - this.journal.width/2);
		this.journal.y = this.dialogBox.y - this.journal.height;
		this.text.x = this.dialogBox.x + 32
		this.text.y = this.dialogBox.y + 32

		/* --Collisions-- */
		var touchedDoor = game.physics.arcade.overlap(this.player, this.door);
		game.physics.arcade.collide(this.player, this.bounds);
		
		/* --Cutscenes-- */
		if (this.cutsceneTriggered == false && this.gameStart == true) {
			this.gameStart = false;
			this.player.changeState('cutscene');
			this.journalTimer.start();
		}
		if (controls.space.justDown && this.cutsceneTriggered == true) {
			this.cutsceneTriggered = false;
			this.showJournal(false);
		}
		if (touchedDoor && this.touchedDoorOnce == false) {
			this.touchedDoorOnce = true;
			this.showActionUI(true);
		}
		if (controls.space.isDown && touchedDoor) {
			game.sound.stopAll();
			game.add.audio('snd_door').play('', 0, 0.05, false, false);
			game.state.start('GroundLevelInside');
		}
	}
}