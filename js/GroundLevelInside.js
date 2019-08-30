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
	this.touchedTableOnce;
	this.spaceButton;

	this.timer;
	this.stepTimer;

	this.door;
	this.leftDoor;
	this.lockSoundTriggered = false;
	this.hidingSpots;
};
GroundLevelInside.prototype = {
	preload: function() {
		// Anything to preload during the Play state
		console.log('GroundLevelInside: preload');
	
	},
	create: function() {
		console.log('GroundLevelInside: create');
		this.touchedTableOnce = false;

		localStorage.setItem('level', 'GroundLevelInside');

		this.stageBkg = game.add.sprite(0, 0, 'atlas', 'background_levelShort');
		game.world.setBounds(0, 0, 2400, 600);

		game.add.audio('snd_anxiety').play('', 0, 0.5, true);
		game.add.audio('snd_slimy').play('', 0, 0.05, true);

		/* --Objects & Furniture-- */
		this.bounds = game.add.group();
		this.bounds.enableBody = true;
		this.bounds.alpha = 0;
		this.bound = this.bounds.create(148, 0, 'atlas', 'obj_bounds'); 
		this.bound.body.immovable = true;
		this.bound = this.bounds.create(2250, 0, 'atlas', 'obj_bounds');
		this.bound.body.immovable = true;
		this.hidingSpots = game.add.group();
		this.hidingSpots.enableBody = true;
		this.hidingSpots.create(500, 355, 'atlas', 'obj_table');
		this.hidingSpots.create(800, 0, 'atlas', 'obj_curtains');
		this.diningTable = this.hidingSpots.create(1300, 265, 'atlas', 'obj_diningTableEmpty');
		this.diningTable.body.setSize(260, 250, 220);
		this.leftDoor = game.add.sprite(200, 0, 'atlas', 'obj_door');		
		game.physics.enable(this.leftDoor);	
		this.leftDoor.scale.x = -1;
		this.door = this.game.add.sprite(2200, 0, 'atlas', 'obj_door');
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
		this.filter = game.add.sprite(0, 0, 'atlas', 'gui_filter');
		this.filter.scale.setTo(1, 1);
		this.border = game.add.sprite(0, 0, 'atlas', 'gui_border');
		this.border.scale.setTo(1, 1);
		//game.world.bringToTop(this.border);
		this.spaceButton = game.add.sprite(this.player.centerX, this.player.y - 128, 'gui_icons', 'space');
		this.spaceButton.anchor.set(0.5, 0.5);
		this.spaceButton.alpha = 0;

		this.showActionUI = function(show) {
			if (show == true) {
				game.add.tween(this.spaceButton).to( { alpha: 0.75 }, 1000, Phaser.Easing.Sinusoidal.In, true);
				this.actionUITimer.start();
			}
			else {
				game.add.tween(this.spaceButton).to( { alpha: 0 }, 1000, Phaser.Easing.Sinusoidal.In, true);
			}
		};

		this.actionUITimer = game.time.create(false);
		this.actionUITimer.add(2000, this.showActionUI, this, false);
		
		this.death = function() {
			game.state.start('GameOver');
		};
	
		this.deathTimer = game.time.create(false);
    	this.deathTimer.add(500, this.death, this);
	},
	update: function() {
		// Run the 'Play' state's game loop
		
		/* --Collisions-- */
		var isTouchingHidingSpots = game.physics.arcade.overlap(this.player, this.hidingSpots);
		var slugTouchingHidingSpots = game.physics.arcade.overlap(this.slug, this.hidingSpots);
		var slugTouchingPlayer = game.physics.arcade.overlap(this.slug, this.player);
		var touchedDoor = game.physics.arcade.overlap(this.player, this.door);
		var touchedLeftDoor = game.physics.arcade.overlap(this.player, this.leftDoor);
		game.physics.arcade.collide(this.player, this.bounds);

		/* --Interaction-- */
		if (!touchedLeftDoor) {
			this.lockSoundTriggered = false;
		}
		if (touchedLeftDoor && this.lockSoundTriggered == false) {
			this.lockSoundTriggered = true;
			game.add.audio('snd_doorLocked').play('', 0, 0.15, false, false);
		}

		if (isTouchingHidingSpots && controls.space.isDown) {
			game.world.bringToTop(this.hidingSpots);
			this.player.changeState('hidden');
		}
		if (this.player.getState() == 'normal' && slugTouchingPlayer) {
			this.player.changeState('hidden');
			this.game.camera.fade(0xD13030, 500);
			this.deathTimer.start();
		}
		if (controls.space.isDown && touchedDoor) {
			game.sound.stopAll();
			game.add.audio('snd_door').play('', 0, 0.05, false, false);
			game.state.start('Stairs1');
		}
		if (isTouchingHidingSpots && this.touchedTableOnce == false) {
			this.touchedTableOnce = true;
			this.showActionUI(true);
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
		this.spaceButton.x = this.player.centerX;
		this.spaceButton.bringToTop();
		this.border.bringToTop();
		this.filter.bringToTop();
	}		
}