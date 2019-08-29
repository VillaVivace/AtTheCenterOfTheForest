var Sub1 = function(game) {
	this.player;
	this.border;
	this.filter;
	this.bounds;
	this.dialogBox;
	this.text;
	this.mirrorUI;

	this.door;
	this.tables;

	this.handMirror;
	this.bookcase1;
	this.bookcase2;
	this.bookcase3;
	this.crates;

	this.touchedBookcase1;
	this.touchedBookcase2;
	this.touchedBookcase3;

	this.conversationState;
	this.line;
};

Sub1.prototype = {
	create: function() {
		console.log('Sub1: create');

		game.camera.flash(0x000000, 1000);

		this.stageBkg = game.add.sprite(0, 0, 'atlas', 'background_levelShort');
		game.world.setBounds(0, 0, 2400, 600);

		/* --Objects & Furniture-- */
		//bounds
		this.bounds = game.add.group();
		this.bounds.enableBody = true;
		this.bounds.alpha = 0;
		this.bound = this.bounds.create(118, 0, 'atlas', 'obj_bounds'); 
		this.bound.body.immovable = true;
		this.bound = this.bounds.create(2210, 0, 'atlas', 'obj_bounds');
		this.bound.body.immovable = true;
		
		//tables
		this.tables = game.add.group();
		this.tables.enableBody = true;
		this.tables.create(500, 355, 'atlas', 'obj_table');
		
		//bookcase
		this.bookcase = game.add.group();
		this.bookcase.enableBody = true;
		this.bookcase1 = this.bookcase.create(900, 150, 'atlas', 'obj_bookcase');
		this.bookcase2 = this.bookcase.create(1200, 150, 'atlas', 'obj_bookcase');
		this.bookcase3 = this.bookcase.create(1500, 150, 'atlas', 'obj_bookcase');
		
		//crates
		this.crates = game.add.group();
		this.crates.enableBody = true;
		this.crates.create(1800, 240, 'atlas', 'obj_crates');

		//door
		this.door = game.add.sprite(200, 0, 'atlas', 'obj_door');		
		game.physics.enable(this.door);	
		this.door.scale.x = -1;

		//player
		this.player = new Player(game, 250, game.world.height - 200, 'spr_player', controls);
		this.game.add.existing(this.player);

		
		/* --GUI & Effects-- */
		this.filter = game.add.sprite(0, 0, 'atlas', 'gui_filter');
		this.filter.scale.setTo(1, 1);
		this.border = game.add.sprite(0, 0, 'atlas', 'gui_border');
		this.border.scale.setTo(1, 1);
		this.dialogBox = game.add.sprite(0, 0, 'atlas', 'gui_dialogBox');
		this.dialogBox.alpha = 0;
		var textStyle = {font: 'Handlee', fontSize: '18px', fill: '#ffffff' }
		this.text = this.game.add.text(0, 0, '', textStyle);
		this.text.alpha = 0;
		this.mirrorUI = game.add.sprite(0, 0, 'atlas', 'gui_handMirror');
		this.mirrorUI.scale.setTo(0.75, 0.75);
		this.mirrorUI.alpha = 0;

		
		this.conversationState = 'END';
		this.line = 1;
		this.conversationManager = function() {
			/* --Bookcase 1-- */
			if (this.touchedBookcase1 && this.conversationState == 'END') {
				this.player.changeState('cutscene');
				this.dialogBox.alpha = 1;
				this.text.alpha = 1;
				this.conversationState = narrative('bookcase1_' + this.line);
				this.text.text = this.conversationState;
			}
			if (this.touchedBookcase1 && this.conversationState != 'END') {
				this.line = this.line + 1;
				this.conversationState = narrative('bookcase1_' + this.line);
				this.text.text = this.conversationState;
			}
			
			/* --Bookcase 2-- */
			if (this.player.getMirrorAlpha() == 0) {
				if (this.touchedBookcase2 && this.conversationState == 'END') {
					this.player.changeState('cutscene');
					this.dialogBox.alpha = 1;
					this.text.alpha = 1;
					this.conversationState = narrative('bookcase2_' + this.line);
					this.text.text = this.conversationState;
				}
				if (this.conversationState == narrative('bookcase2_4Choice1')) {
					this.player.changeMirrorAlpha(1);
					playerHasMirror = true;
					this.mirrorUI.alpha = 0;
					this.conversationState = 'END';
				}
				else if (this.touchedBookcase2 && this.conversationState != 'END') {
					this.line = this.line + 1;
					this.conversationState = narrative('bookcase2_' + this.line);
					this.text.text = this.conversationState;
				}
			}
			/* --Bookcase 3-- */
			if (this.touchedBookcase3 && this.conversationState == 'END') {
				this.player.changeState('cutscene');
				this.dialogBox.alpha = 1;
				this.text.alpha = 1;
				this.conversationState = narrative('bookcase3_' + this.line);
				this.text.text = this.conversationState;
			}
			if (this.touchedBookcase3 && this.conversationState != 'END') {
				this.line = this.line + 1;
				this.conversationState = narrative('bookcase3_' + this.line);
				this.text.text = this.conversationState;
			}
		};

		controls.space.onDown.add(this.conversationManager, this);
	},
	update: function() {
		// Run the 'Play' state's game loop
		/* --Collisions-- */
		this.touchedBookcase1 = game.physics.arcade.overlap(this.player, this.bookcase1);
		this.touchedBookcase2 = game.physics.arcade.overlap(this.player, this.bookcase2);
		this.touchedBookcase3 = game.physics.arcade.overlap(this.player, this.bookcase3);
		var isTouchingTable = game.physics.arcade.overlap(this.player, this.tables);
		var touchedDoor = game.physics.arcade.overlap(this.player, this.door);
		game.physics.arcade.collide(this.player, this.bounds);

		/* --Dialog Interactions-- */
		if (this.conversationState == 'END') {
			this.line = 1;
			this.dialogBox.alpha = 0;
			this.text.alpha = 0;
			this.player.changeState('normal');
		}
		/* --Bookcase 2 CHOICES-- */
		if (this.conversationState == narrative('bookcase2_4')) {
			if (controls.num1.justDown) {
				this.mirrorUI.alpha = 1;				
				this.conversationState = narrative('bookcase2_4Choice1');
				this.text.text = this.conversationState;
			}
			if (controls.num2.justDown) {
				this.conversationState = narrative('bookcase2_5');
				this.text.text = this.conversationState;
			}
		}


		/* --Interaction-- */
		if (controls.space.justDown && touchedDoor) {
			game.add.audio('snd_door').play('', 0, 0.05, false, false);
			game.state.start('Level2', true, false, 2300, game.world.height - 200, true);
		}
		
		if(isTouchingTable && controls.space.isDown){
			game.world.bringToTop(this.tables);
			this.player.changeState('hidden');
		}

		/* --GUI & Effects Positioning-- */
		this.player.bringToTop();
		this.border.x = game.camera.x - 16; // We want the GUI and FX to align with the camera, not just a world position
		this.border.y = game.camera.y;
		this.filter.x = game.camera.x - 16;
		this.filter.y = game.camera.y;
		this.dialogBox.x = game.camera.x + (game.camera.width/2 - this.dialogBox.width/2);
		this.dialogBox.y = game.camera.y + (game.world.height - this.dialogBox.height);
		this.text.x = this.dialogBox.x + 32;
		this.text.y = this.dialogBox.y + 32;
		this.mirrorUI.x = game.camera.x + (game.camera.width/2 - this.mirrorUI.width/2);
		this.mirrorUI.y = this.dialogBox.y - this.mirrorUI.height;
		this.border.bringToTop();
		this.filter.bringToTop();
		this.dialogBox.bringToTop();
		this.text.bringToTop();	
		this.mirrorUI.bringToTop();

	}
		
}
