var GroundLevelInside = function(game) {
	this.player;
	this.slug;
	this.slugFlipped = false;

	this.border;
	this.filter;
	this.journal;
	this.dialogBox;
	this.cutsceneTriggered = false;
	this.text;
	this.showJournal;
	this.bounds;

	this.timer;
	this.stepTimer;
	this.helpText = false;

	this.tables;
};
GroundLevelInside.prototype = {
	preload: function() {
		// Anything to preload during the Play state
		console.log('GroundLevelInside: preload');
	
	},
	create: function() {
		console.log('GroundLevelInside: create');
		this.stageBkg = game.add.sprite(0, 0, 'bkg_levelShort');
		game.world.setBounds(0, 0, 2400, 600);

		game.add.audio('snd_anxiety').play('', 0, 0.5, true);

		/* --Objects & Furniture-- */
		this.bounds = game.add.group();
		this.bounds.enableBody = true;
		this.bounds.alpha = 0;
		this.bound = this.bounds.create(148, 0, 'obj_bounds');
		this.bound.body.immovable = true;
		this.bound = this.bounds.create(2210, 0, 'obj_bounds');
		this.bound.body.immovable = true;
		this.tables = game.add.group();
		this.tables.enableBody = true;
		this.tables.create(1000, 355, 'obj_table');
		this.tables.create(1750, 355, 'obj_table');

		this.player = new Player(game, 200, game.world.height - 200, 'spr_player', controls);
		this.game.add.existing(this.player);

		this.slug = game.add.sprite(1300, game.world.height-200, 'spr_slug');
		game.physics.enable(this.slug);
		this.slug.anchor.set(0.5, 0.5);
		this.slug.body.velocity.x = 225;
		this.slug.animations.add('walk', Phaser.Animation.generateFrameNames('slug', 1, 2), 4, true);
		this.slug.animations.play('walk');
		
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

		
		
	},
	update: function() {
		// Run the 'Play' state's game loop
		
		/* --GUI & Effects Positioning-- */
		this.border.x = game.camera.x - 16; // We want the GUI and FX to align with the camera, not just a world position
		this.border.y = game.camera.y;
		this.filter.x = game.camera.x - 16;
		this.filter.y = game.camera.y;
		this.dialogBox.x = game.camera.x + (game.camera.width/2 - this.dialogBox.width/2);
		this.dialogBox.y = game.camera.y + (game.world.height - this.dialogBox.height);
		this.journal.x = game.camera.x + (game.camera.width/2 - this.journal.width/2);
		this.journal.y = this.dialogBox.y - this.journal.height;
		this.text.x = this.dialogBox.x + 32;
		this.text.y = this.dialogBox.y + 32;
		this.border.bringToTop();
		this.filter.bringToTop();
		this.dialogBox.bringToTop();
		this.journal.bringToTop();
		this.text.bringToTop();
		/* --Collisions-- */
		var isTouchingTable = game.physics.arcade.overlap(this.player, this.tables);
		var slugTouchingTable = game.physics.arcade.overlap(this.slug, this.tables);
		game.physics.arcade.collide(this.player, this.bounds);
		
		/* --Cutscenes-- */
		if (this.cutsceneTriggered == false && this.player.x > 600) {
			this.player.changeState('cutscene');
			this.journalTimer.start();
		}
		if (controls.space.justDown && this.cutsceneTriggered == true) {
			this.showJournal(false);
		}
		if (isTouchingTable && controls.space.isDown) {
			game.world.bringToTop(this.tables);
			this.player.changeState('hidden');
		}
		
		/* --Slug Movement-- */
		if (this.slug.body.velocity.x > 0) {
			this.slug.scale.x = -1;
		} else {
			this.slug.scale.x = 1;
		}
		if ((this.slug.x <= 800 || this.slug.x >= 1950) && this.slugFlipped == false) {
			this.slugFlipped = true;
			this.slug.body.velocity.x = -(this.slug.body.velocity.x);
		}
		if (this.slug.x >= 1200 && this.slug.x <= 1400) {
			this.slugFlipped = false;
		}
		if (slugTouchingTable) {
			this.slug.bringToTop();
		}
	}
		
}