var Sub1 = function(game) {
	this.player;

	this.border;
	this.filter;
	this.bounds;

	this.door;
	this.tables;
};
Sub1.prototype = {
	preload: function() {
		// Anything to preload during the Play state
		console.log('Sub1: preload');
	
	},
	create: function() {
		console.log('Sub1: create');
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
		this.door = this.game.add.sprite(1200, 0, 'obj_door2');
		game.physics.enable(this.door);

		this.player = new Player(game, 200, game.world.height - 200, 'spr_player', controls);
		this.game.add.existing(this.player);

		
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
		var touchedDoor = game.physics.arcade.collide(this.player, this.door);
		game.physics.arcade.collide(this.player, this.bounds);


		/* --Interaction-- */
		if (isTouchingTable && controls.space.isDown) {
			game.world.bringToTop(this.tables);
			this.player.changeState('hidden');
		}
		if (touchedDoor&&controls.space.isDown) {
			game.add.audio('snd_door').play('', 0, 0.05, false, false);
			game.state.start('Level2');
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
