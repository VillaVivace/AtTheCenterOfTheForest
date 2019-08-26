var GroundLevelOutside = function(game) { //Intro Cutscene
	this.player;

	this.border;
	this.filter;
	this.journal;
	this.dialogBox;
	this.text;
	this.showJournal;
	this.cutsceneTriggered = false;

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
		game.camera.flash(0x000000, 1000);
		this.game.scale.setGameSize(1000, 600);
		this.stageBkg = game.add.sprite(0, 0, 'bkg_intro');
		game.world.setBounds(0, 0, 1600, 600);

		game.sound.stopAll();

		/* --Objects-- */
		this.door = this.game.add.sprite(1300, 0, 'obj_door');
		game.physics.enable(this.door);
		this.door.body.setSize(50, 600, 50);

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
		var touchedDoor = game.physics.arcade.collide(this.player, this.door);
		
		/* --Cutscenes-- */
		if (this.cutsceneTriggered == false && this.player.x > 1000) {
			this.player.changeState('cutscene');
			this.journalTimer.start();
		}
		if (controls.space.justDown && this.cutsceneTriggered == true) {
			this.showJournal(false);
		}

		if (touchedDoor) { // Area of door
			game.add.audio('snd_door').play('', 0, 0.1, false, false);
			game.state.start('GroundLevelInside');
		}
	}
}