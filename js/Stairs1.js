
var Stairs1 = function(game) {
	this.stairs;
	
	this.border;
	this.filter;
	this.journal;
	this.dialogBox;
	this.text;
	this.showJournal;
	this.cutsceneTriggered = false;
};
Stairs1.prototype = {
	preload: function() {
		console.log('Stairs1: preload');		
	},
	create: function() {
		console.log('Stairs1: create');
		game.camera.flash(0x000000, 1000);

		this.stairs = this.game.add.sprite(0, -800, 'bkg_stairs');

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
		this.text = this.game.add.text(0, 0, narrative("stairs1"), textStyle);
		this.text.alpha = 0;

		this.showJournal = function(show) {
			if (show == true) {
				this.cutsceneTriggered = true;
				this.dialogBox.alpha = 1;
				this.journal.alpha = 1;
				this.text.alpha = 1;
			}
			else {
				game.add.audio('snd_pageTurn').play('', 0, 0.25, false);
				this.transitionTimer.start();
				this.game.camera.fade(0x000000, 2000);
				this.dialogBox.alpha = 0;
				this.journal.alpha = 0;
				this.text.alpha = 0;
			}
		};
		var toNextLevel = function() {
			game.state.start('Level1');
		};
		var footstepSound = function() {
			var randStep = Math.random();
			var stepSound;
			if (randStep < 0.5) {
				stepSound = game.add.audio('snd_footstep1');
			} else {
				stepSound = game.add.audio('snd_footstep2');
			}
			stepSound.play('', 0, 0.5, false, false);
		};
		var footstep = function() {
			var tween = game.add.tween(this.stairs).to( {y: this.stairs.y + 77}, 500, "Linear", false);
			tween.start();
			tween.onComplete.add(footstepSound, this);
		};

		this.journalTimer = game.time.create(false);
		this.journalTimer.add(1000, this.showJournal, this, true); 
		this.transitionTimer = game.time.create(false);
		this.transitionTimer.add(2000, toNextLevel, this);

		this.stairsTimer = game.time.create(false);
		this.stairsTimer.loop(2000, footstep, this);

		this.journalTimer.start();
		this.stairsTimer.start();

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
		this.text.x = this.dialogBox.x + 32;
		this.text.y = this.dialogBox.y + 32;

		if (controls.space.justDown && this.cutsceneTriggered == true) {
			this.showJournal(false);
		}
		
		if (this.stairs.y >= -77) {
			this.stairs.y = -800;
		}
	}
}
