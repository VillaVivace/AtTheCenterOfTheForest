var GroundLevelOutside = function(game) { //Intro Cutscene
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
GroundLevelOutside.prototype = {
	preload: function() {
		console.log('GroundLevelOutside: preload');
	
	},
	create: function() {
		console.log('GroundLevelOutside: create');
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
			game.state.start('GroundLevelInside');
		}
	}
}