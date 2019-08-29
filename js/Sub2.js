var Sub2 = function(game) {
	this.player;
	//this.mirror=false;
	this.border;
	this.filter;
	this.bounds;
	this.dialogBox;
	this.text;
	this.conversationState;
	this.line;

	this.heartUI;
	this.mandrakeUI;
	this.eyeballsUI;

	this.door;
	this.tables;
	this.shelf1;
	this.shelf2;
	this.crates;

	this.touchedShelf1;
	this.touchedShelf2;
	this.touchedCrates;

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

		game.camera.flash(0x000000, 1000);

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
		this.shelf1 = this.shelf.create(1000, 150, 'shelf');
		this.shelf2 = this.shelf.create(1300, 150, 'shelf');
		
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
		this.dialogBox = game.add.sprite(0, 0, 'gui_dialogBox');
		this.dialogBox.alpha = 0;
		var textStyle = {font: 'Handlee', fontSize: '18px', fill: '#ffffff' }
		this.text = this.game.add.text(0, 0, '', textStyle);
		this.text.alpha = 0;

		this.heartUI = game.add.sprite(0, 0, 'gui_heart');
		this.heartUI.scale.setTo(0.75, 0.75);
		this.heartUI.alpha = 0;
		this.mandrakeUI = game.add.sprite(0, 0, 'gui_mandrake');
		this.mandrakeUI.scale.setTo(0.75, 0.75);
		this.mandrakeUI.alpha = 0;
		this.eyeballsUI = game.add.sprite(0, 0, 'gui_jar');
		this.eyeballsUI.scale.setTo(0.75, 0.75);
		this.eyeballsUI.alpha = 0;

		
		this.conversationState = 'END';
		this.line = 2;
		this.conversationManager = function() {
			if (playerHasIngredient == false) {
				/* --Shelf 1-- */
				if (this.touchedShelf1 && this.conversationState == 'END') {
					this.player.changeState('cutscene');
					this.dialogBox.alpha = 1;
					this.text.alpha = 1;
					this.conversationState = narrative('shelf1_' + this.line);
					this.text.text = this.conversationState;
				}
				else if (this.conversationState == narrative('shelf1_4Choice1')) {
					this.player.changeEyeballsAlpha(1);
					playerHasEyeballs = true;
					this.eyeballsUI.alpha = 0;
					this.conversationState = 'END';
				}
				else if (this.touchedShelf1 && this.conversationState != 'END') {
					this.line = this.line + 1;
					this.conversationState = narrative('shelf1_' + this.line);
					this.text.text = this.conversationState;
				}
				
				/* --Shelf 2-- */
					if (this.touchedShelf2 && this.conversationState == 'END') {
						this.player.changeState('cutscene');
						this.dialogBox.alpha = 1;
						this.text.alpha = 1;
						this.conversationState = narrative('shelf2_' + this.line);
						this.text.text = this.conversationState;
					}
					else if (this.conversationState == narrative('shelf2_4Choice1')) {
						this.player.changeMandrakeAlpha(1);
						playerHasMandrake = true;
						this.mandrakeUI.alpha = 0;
						this.conversationState = 'END';
					}
					else if (this.touchedShelf2 && this.conversationState != 'END') {
						this.line = this.line + 1;
						this.conversationState = narrative('shelf2_' + this.line);
						this.text.text = this.conversationState;
					}
				/* --Crates 1-- */
				if (this.touchedCrates && this.conversationState == 'END') {
					this.player.changeState('cutscene');
					this.dialogBox.alpha = 1;
					this.text.alpha = 1;
					this.conversationState = narrative('crates1_' + this.line);
					this.text.text = this.conversationState;
				}
				else if (this.conversationState == narrative('crates1_4Choice1')) {
					this.player.changeHeartAlpha(1);
					playerHasHeart = true;
					this.heartUI.alpha = 0;
					this.conversationState = 'END';
				}
				else if (this.touchedCrates && this.conversationState != 'END') {
					this.line = this.line + 1;
					this.conversationState = narrative('crates1_' + this.line);
					this.text.text = this.conversationState;
				}
			}
		};

		controls.space.onDown.add(this.conversationManager, this);

	},
	update: function() {
		// Run the 'Play' state's game loop
		/* --Collisions-- */
		this.touchedShelf1 = game.physics.arcade.overlap(this.player, this.shelf1);
		this.touchedShelf2 = game.physics.arcade.overlap(this.player, this.shelf2);
		this.touchedCrates = game.physics.arcade.overlap(this.player, this.crates);
		var isTouchingTable = game.physics.arcade.overlap(this.player, this.tables);
		var touchedDoor = game.physics.arcade.overlap(this.player, this.door);
		game.physics.arcade.collide(this.player, this.bounds);


		/* --Dialog Interactions-- */
		if (this.conversationState == 'END') {
			this.line = 2;
			this.dialogBox.alpha = 0;
			this.text.alpha = 0;
			this.player.changeState('normal');
		}
		/* --Shelf 1 CHOICES-- */
		if (this.conversationState == narrative('shelf1_4')) {
			if (controls.num1.justDown) {
				this.eyeballsUI.alpha = 1;				
				this.conversationState = narrative('shelf1_4Choice1');
				this.text.text = this.conversationState;
			}
			if (controls.num2.justDown) {
				this.conversationState = narrative('shelf1_5');
				this.text.text = this.conversationState;
			}
		}
		/* --Shelf 2 CHOICES-- */
		if (this.conversationState == narrative('shelf2_4')) {
			if (controls.num1.justDown) {
				this.mandrakeUI.alpha = 1;				
				this.conversationState = narrative('shelf2_4Choice1');
				this.text.text = this.conversationState;
			}
			if (controls.num2.justDown) {
				this.conversationState = narrative('shelf2_5');
				this.text.text = this.conversationState;
			}
		}
		/* --Crate 1 CHOICES-- */
		if (this.conversationState == narrative('crates1_4')) {
			if (controls.num1.justDown) {
				this.heartUI.alpha = 1;				
				this.conversationState = narrative('crates1_4Choice1');
				this.text.text = this.conversationState;
			}
			if (controls.num2.justDown) {
				this.conversationState = narrative('crates1_5');
				this.text.text = this.conversationState;
			}
		}

		if (playerHasEyeballs) {
			playerHasIngredient = true;
			this.player.changeEyeballsAlpha(1);
		}
		if (playerHasMandrake) {
			playerHasIngredient = true;
			this.player.changeMandrakeAlpha(1);
		}
		if (playerHasHeart) {
			playerHasIngredient = true;
			this.player.changeHeartAlpha(1);
		}

		/* --Interaction-- */
		if (controls.space.justDown && touchedDoor) {
			game.add.audio('snd_door').play('', 0, 0.05, false, false);
			game.state.start('Level2', true, false, 3700, game.world.height - 200, true);
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
		this.heartUI.x = game.camera.x + (game.camera.width/2 - this.heartUI.width/2);
		this.heartUI.y = this.dialogBox.y - this.heartUI.height;
		this.mandrakeUI.x = game.camera.x + (game.camera.width/2 - this.mandrakeUI.width/2);
		this.mandrakeUI.y = this.dialogBox.y - this.mandrakeUI.height;
		this.eyeballsUI.x = game.camera.x + (game.camera.width/2 - this.eyeballsUI.width/2);
		this.eyeballsUI.y = this.dialogBox.y - this.eyeballsUI.height;
		this.border.bringToTop();
		this.filter.bringToTop();
		this.dialogBox.bringToTop();
		this.text.bringToTop();	
		this.heartUI.bringToTop();
		this.mandrakeUI.bringToTop();
		this.eyeballsUI.bringToTop();

	}
		
}
