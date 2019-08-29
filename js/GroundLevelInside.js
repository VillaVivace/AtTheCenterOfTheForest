var GroundLevelInside = function(game) {
	this.player;
	this.slug;
	this.slugFlipped = false;

	this.border;
	this.filter;
	this.journal;
	this.dialogBox;
	this.text;
	this.showJournal;
	this.bounds;

	this.timer;
	this.stepTimer;

	this.door;
	this.hidingSpots;
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
		game.add.audio('snd_slimy').play('', 0, 0.05, true);

		/* --Objects & Furniture-- */
		this.bounds = game.add.group();
		this.bounds.enableBody = true;
		this.bounds.alpha = 0;
		this.bound = this.bounds.create(148, 0, 'obj_bounds'); 
		this.bound.body.immovable = true;
		this.bound = this.bounds.create(2250, 0, 'obj_bounds');
		this.bound.body.immovable = true;
		this.hidingSpots = game.add.group();
		this.hidingSpots.enableBody = true;
		this.hidingSpots.create(500, 355, 'obj_table');
		this.hidingSpots.create(800, 0, 'obj_curtains');
		this.diningTable = this.hidingSpots.create(1300, 265, 'obj_diningTableEmpty');
		this.diningTable.body.setSize(260, 250, 220);
		this.door = this.game.add.sprite(2200, 0, 'obj_door');
		game.physics.enable(this.door);

		this.player = new Player(game, 300, game.world.height - 200, 'spr_player', controls);
		this.game.add.existing(this.player);

		this.slug = game.add.sprite(1300, game.world.height-200, 'spr_slug');
		game.physics.enable(this.slug);
		this.slug.anchor.set(0.5, 0.5);
		this.slug.body.velocity.x = 260;
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
		var isTouchingHidingSpots = game.physics.arcade.overlap(this.player, this.hidingSpots);
		var slugTouchingHidingSpots = game.physics.arcade.overlap(this.slug, this.hidingSpots);
		var slugTouchingPlayer = game.physics.arcade.overlap(this.slug, this.player);
		var touchedDoor = game.physics.arcade.overlap(this.player, this.door);
		game.physics.arcade.collide(this.player, this.bounds);

		/* --Interaction-- */
		if (isTouchingHidingSpots && controls.space.isDown) {
			game.world.bringToTop(this.hidingSpots);
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
		if ((this.slug.x <= 450 || this.slug.x >= 1950) && this.slugFlipped == false) {
			this.slugFlipped = true;
			this.slug.body.velocity.x = -(this.slug.body.velocity.x);
		}
		if (this.slug.x >= 1200 && this.slug.x <= 1400) {
			this.slugFlipped = false;
		}
		if (slugTouchingHidingSpots) {
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