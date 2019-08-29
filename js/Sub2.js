var Sub2 = function(game) {
	this.player;
	//this.mirror=false;
	this.border;
	this.filter;
	this.bounds;

	this.door;
	this.tables;

	this.shelf;
	this.crates;

};
Sub2.prototype = {
	preload: function() {
		// Anything to preload during the Play state
		console.log('Sub2: preload');
		this.game.load.image('crates', 'assets/img/obj_crates.png');
		this.game.load.image('shelf', 'assets/img/obj_shelf.png');
		this.game.load.image('mandrakeIcon', 'assets/img/mandrakeIcon.png');
		this.game.load.image('gui_mandrake', 'assets/img/gui_mandrake.png');
		this.game.load.image('heartIcon', 'assets/img/heartIcon.png');
		this.game.load.image('gui_heart', 'assets/img/gui_heart.png');
		this.game.load.image('jar', 'assets/img/jarIcon.png');
		this.game.load.image('gui_jar', 'assets/img/gui_jar.png');
	},
	create: function() {
		console.log('Sub2: create');
		this.stageBkg = game.add.sprite(0, 0, 'bkg_levelShort');
		game.world.setBounds(0, 0, 2400, 600);

		/* --Objects & Furniture-- */
		//bounds
		this.bounds = game.add.group();
		this.bounds.enableBody = true;
		this.bounds.alpha = 0;
		this.bound = this.bounds.create(100, 0, 'obj_bounds'); 
		this.bound.body.immovable = true;
		this.bound = this.bounds.create(2210, 0, 'obj_bounds');
		this.bound.body.immovable = true;
		
		//tables
		this.tables = game.add.group();
		this.tables.enableBody = true;
		this.tables.create(600, 355, 'obj_table');
		
		//shelf
		this.shelf = game.add.group();
		this.shelf.enableBody = true;
		this.shelf.create(1000, 150, 'shelf');
		this.shelf.create(1300, 150, 'shelf');
		
		//crates
		this.crates = game.add.group();
		this.crates.enableBody = true;
		this.crates.create(1800, 240, 'obj_crates');

		//door
		this.door = game.add.sprite(200, 0, 'obj_door');		
		game.physics.enable(this.door);	
		this.door.scale.x = -1;
		
		//Items

		
		//player
		this.player = new Player(game, 250, game.world.height - 200, 'spr_player', controls);
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
		var touchedDoor = game.physics.arcade.overlap(this.player, this.door);
		var touchMirror = game.physics.arcade.overlap(this.player, this.handMirror);
		game.physics.arcade.collide(this.player, this.bounds);


		/* --Interaction-- */
		if (touchedDoor) {
			game.sound.stopAll();
			game.add.audio('snd_door').play('', 0, 0.05, false, false);
			game.state.start('Level2');
		}

		if(isTouchingTable && controls.space.isDown){
			game.world.bringToTop(this.tables);
			this.player.changeState('hidden');
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
