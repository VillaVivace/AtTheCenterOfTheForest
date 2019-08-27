var Sub1 = function(game) {
	this.player;
	this.mirror=false;
	
	this.border;
	this.filter;
	this.bounds;

	this.door;
	this.tables;

	this.handMirror;
	this.heart;
	this.jar;
	this.mandrake;

};
Sub1.prototype = {
	preload: function() {
		// Anything to preload during the Play state
		console.log('Sub1: preload');
		this.game.load.image('handMirror', 'assets/img/handMirrorIcon.png');
		this.game.load.image('heart', 'assets/img/heartIcon.png');
		this.game.load.image('jar', 'assets/img/jarIcon.png');
		this.game.load.image('mandrake', 'assets/img/mandrakeIcon.png');
	
	},
	create: function() {
		console.log('Sub1: create');
		this.stageBkg = game.add.sprite(0, 0, 'bkg_levelShort');
		game.world.setBounds(0, 0, 2400, 600);
		game.add.audio('snd_anxiety').play('', 0, 0.5, true);

		/* --Objects & Furniture-- */
		//bounds
		this.bounds = game.add.group();
		this.bounds.enableBody = true;
		this.bounds.alpha = 0;
		this.bound = this.bounds.create(148, 0, 'obj_bounds'); 
		this.bound.body.immovable = true;
		this.bound = this.bounds.create(2210, 0, 'obj_bounds');
		this.bound.body.immovable = true;
		
		//tables
		this.tables = game.add.group();
		this.tables.enableBody = true;
		this.tables.create(600, 355, 'obj_table');
		this.tables.create(800, 355, 'obj_table');
		this.tables.create(1000, 355, 'obj_table');
		this.tables.create(1200, 355, 'obj_table');
		//door
		this.door = game.add.sprite(1600, 0, 'obj_door2');		
		game.physics.enable(this.door);	
		
		//Items
		this.handMirror = game.add.sprite(600, 340, 'handMirror');		
		game.physics.enable(this.handMirror);
		this.heart = game.add.sprite(800, 340, 'heart');		
		game.physics.enable(this.heart);
		this.jar = game.add.sprite(1000, 340, 'jar');		
		game.physics.enable(this.jar);
		this.mandrake = game.add.sprite(1200, 340, 'mandrake');		
		game.physics.enable(this.mandrake);		
		
		//player
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
		console.log(this.mirror);
		/* --Collisions-- */
		var isTouchingTable = game.physics.arcade.overlap(this.player, this.tables);
		var touchedDoor = game.physics.arcade.overlap(this.player, this.door);
		var touchMirror = game.physics.arcade.overlap(this.player, this.handMirror);
		game.physics.arcade.collide(this.player, this.bounds);


		/* --Interaction-- */
		if (touchedDoor&&controls.space.isDown) {
			game.add.audio('snd_door').play('', 0, 0.05, false, false);
			game.state.start('Level2');
		}

		if(touchMirror&&controls.space.isDown){
			this.handMirror.alpha=0;
			this.mirror=true;
		}


		/* --GUI & Effects Positioning-- */
		this.border.x = game.camera.x - 16; // We want the GUI and FX to align with the camera, not just a world position
		this.border.y = game.camera.y;
		this.filter.x = game.camera.x - 16;
		this.filter.y = game.camera.y;
		this.border.bringToTop();
		this.filter.bringToTop();

	},
	render: function() {
   	 	game.debug.body(this.handMirror);
   	 	game.debug.body(this.player);
	}
		
}
