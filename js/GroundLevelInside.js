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

	this.door;
	this.tables;
};
GroundLevelInside.prototype = {
	preload: function() {
		// Anything to preload during the Play state
		console.log('GroundLevelInside: preload');
	
	},
	create: function() {
		console.log('GroundLevelInside: create');
		localStorage.setItem('level', 'GroundLevelInside');

		this.stageBkg = game.add.sprite(0, 0, 'bkg_levelShort');
		game.world.setBounds(0, 0, 2400, 600);

		game.add.audio('snd_anxiety').play('', 0, 0.5, true);

		/* --Objects & Furniture-- */
		this.bounds = game.add.group();
		this.bounds.enableBody = true;
		this.bounds.alpha = 0;
		this.bound = this.bounds.create(148, 0, 'obj_bounds'); 
		this.bound.body.immovable = true;
		this.bound = this.bounds.create(2250, 0, 'obj_bounds');
		this.bound.body.immovable = true;
		this.tables = game.add.group();
		this.tables.enableBody = true;
		this.tables.create(1000, 355, 'obj_table');
		this.tables.create(1750, 355, 'obj_table');
		this.door = this.game.add.sprite(2200, 0, 'obj_door');
		game.physics.enable(this.door);

		this.player = new Player(game, 300, game.world.height - 200, 'spr_player', controls);
		this.game.add.existing(this.player);

		this.slug = game.add.sprite(1300, game.world.height-200, 'spr_slug');
		game.physics.enable(this.slug);
		this.slug.anchor.set(0.5, 0.5);
		this.slug.body.velocity.x = 205;
		this.slug.animations.add('walk', Phaser.Animation.generateFrameNames('slug', 1, 2), 4, true);
		this.slug.animations.play('walk');
		
		/* --GUI & Effects-- */
		this.filter = game.add.sprite(0, 0, 'gui_filter');
		this.filter.scale.setTo(1, 1);
		this.border = game.add.sprite(0, 0, 'gui_border');
		this.border.scale.setTo(1, 1);
		game.world.bringToTop(this.border);
	},
	update: function() {
		// Run the 'Play' state's game loop
		
		/* --Collisions-- */
		var isTouchingTable = game.physics.arcade.overlap(this.player, this.tables);
		var slugTouchingTable = game.physics.arcade.overlap(this.slug, this.tables);
		var slugTouchingPlayer = game.physics.arcade.overlap(this.slug, this.player);
		var touchedDoor = game.physics.arcade.overlap(this.player, this.door);
		game.physics.arcade.collide(this.player, this.bounds);

		/* --Interaction-- */
		if (isTouchingTable && controls.space.isDown) {
			game.world.bringToTop(this.tables);
			this.player.changeState('hidden');
		}
		if (this.player.getState() == 'normal' && slugTouchingPlayer) {
			game.state.start('GameOver');
		}
		if (touchedDoor && controls.space.isDown) {
			game.sound.stopAll();
			game.add.audio('snd_door').play('', 0, 0.05, false, false);
			game.state.start('Stairs1');
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

		/* --GUI & Effects Positioning-- */
		this.border.x = game.camera.x - 16; // We want the GUI and FX to align with the camera, not just a world position
		this.border.y = game.camera.y;
		this.filter.x = game.camera.x - 16;
		this.filter.y = game.camera.y;
		this.border.bringToTop();
		this.filter.bringToTop();
	}
		
}