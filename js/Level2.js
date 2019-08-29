var Level2 = function(game) {
	this.player;
	this.playerX;
	this.playerY;
	this.kitchenMonster;
	this.rightMonster;
	this.leftMonster;

	this.border;
	this.filter;
	this.dialogBox;
	this.text;
	this.showDialogBox = false;
	this.cutsceneTriggered = false;
	this.conversationState;
	this.line;
	this.bounds;
	this.kitchenwall;

	this.diningtables;
	this.chandalier;
	this.chandalier1;
	this.door1;
	this.ddor2;
	this.kitchendoor;
	this.exit;

	this.key1=false;
	this.key2=false;
	this.key11;

	this.playerTouchingKitchenMonster;
	this.playerTouchingRightMonster;
	this.playerTouchingLeftMonster;

	this.songIsPlaying;
};
Level2.prototype = {
	init: function(playerX, playerY, songPlaying) {
		this.playerX = playerX;
		this.playerY = playerY;
		this.songIsPlaying = songPlaying;
	},

	preload: function() {
	this.game.load.image('key', 'assets/img/keyIcon.png');	
		// Anything to preload during the Play state
	console.log('Level2: preload');
	},
	
	create: function() {
		console.log('Level2: create');
		localStorage.setItem('level', 'Level2');

		game.camera.flash(0x000000, 1500);

		this.stageBkg = game.add.sprite(0, 0, 'bkg_levelShort');
		game.world.setBounds(0, 0, 2400, 600);

		if (this.songIsPlaying == null) {
			this.songIsPlaying = false;
		}
		this.song = game.add.audio('snd_anxiety');
		if (this.songIsPlaying == false) {
			this.song.play('', 0, 0.5, true);
		}
		
		/* --Objects & Furniture-- */
		this.bounds = game.add.group();
		this.bounds.enableBody = true;
		this.bounds.alpha = 0;
		this.bound = this.bounds.create(100, 0, 'obj_bounds'); 
		this.bound.body.immovable = true;
		this.bound = this.bounds.create(2400, 0, 'obj_bounds');
		this.bound.body.immovable = true;
		this.bound = this.bounds.create(1650, 0, 'obj_bounds');
		this.bound.body.immovable = true;				
		//monster 1
		this.rightMonster = game.add.sprite(1180, game.world.height-250, 'spr_right');
		game.physics.enable(this.rightMonster);
		this.rightMonster.anchor.set(0.5, 0.5);
		this.rightMonster.body.setSize(150, 300, 50, 50 );
		this.rightMonster.frame = 1;
		
		//monster 2
		this.leftMonster = game.add.sprite(600, game.world.height-250, 'spr_left');
		game.physics.enable(this.leftMonster);
		this.leftMonster.anchor.set(0.5, 0.5);
		this.leftMonster.body.setSize(150, 300, 0, 50 );
		this.leftMonster.frame = 1;

		//tables
		this.diningtables = game.add.group();
		this.diningtables.enableBody = true;
		this.diningtables.create(650, 325, 'obj_diningtable');

		//keys
		this.key11 = game.add.sprite(1000, 355, 'key');
		game.physics.enable(this.key11);
		this.key11.alpha = 0;

		
		//doors
		this.door1 = game.add.sprite(1400, 0, 'obj_door2');		
		game.physics.enable(this.door1);				
		this.door2 = game.add.sprite(1800, 0, 'obj_door2');		
		game.physics.enable(this.door2);
		this.exit= game.add.sprite(2200, 0, 'obj_door');
		game.physics.enable(this.exit);
		
		//kitchen wall
		this.kitchenwall = game.add.sprite(1650, 0, 'wall');
		this.kitchenwall.enableBody = true;

		//chandaliers
		this.chandalier = game.add.sprite(825, 0, 'obj_chandalier');
		this.chandalier.animations.add('anima', Phaser.Animation.generateFrameNames('chandalier', 1, 3), 2, true);
		this.chandalier.animations.play('anima');				

		
		//kitchen monster
		this.kitchenMonster = game.add.sprite(2150, game.world.height-200, 'spr_kitchen');
		game.physics.enable(this.kitchenMonster);
		this.kitchenMonster.anchor.set(0.5, 0.5);
		
		//player
		if (this.playerX == null && this.player == null) {
			this.playerX = 200;
			this.playerY = game.world.height - 200;
		}
		this.player = new Player(game, this.playerX, this.playerY, 'spr_player', controls);
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
		
		this.conversationState = 'END';
		this.line = 1;
		this.conversationManager = function() {
			/* --LEFT MONSTER-- */
			if (this.playerTouchingLeftMonster && this.conversationState == 'END') {
				this.player.changeState('cutscene');
				this.dialogBox.alpha = 1;
				this.text.alpha = 1;
				this.conversationState = narrative('leftMonster' + this.line);
				this.text.text = this.conversationState;
			}
			if (this.playerTouchingLeftMonster && this.conversationState != 'END') {
				this.line = this.line + 1;
				this.conversationState = narrative('leftMonster' + this.line);
				this.text.text = this.conversationState;
			}
			/* --RIGHT MONSTER-- */
			if (this.playerTouchingRightMonster && this.conversationState == 'END') {
				this.player.changeState('cutscene');
				this.dialogBox.alpha = 1;
				this.text.alpha = 1;
				this.conversationState = narrative('rightMonster' + this.line);
				this.text.text = this.conversationState;
			}
			if (this.conversationState == narrative('rightMonsterChoice1') || this.conversationState == narrative('rightMonsterChoice2')) {
				this.player.changeState('hidden');
				this.game.camera.fade(0xD13030, 500);
				this.deathTimer.start();
				this.conversationState = 'END';
			}
			else if (this.playerTouchingRightMonster && this.conversationState != 'END') {
				this.line = this.line + 1;
				this.conversationState = narrative('rightMonster' + this.line);
				this.text.text = this.conversationState;
			}
		};

		controls.space.onDown.add(this.conversationManager, this);

		this.death = function() {
			game.state.start('GameOver');
		};
	
		this.deathTimer = game.time.create(false);
    	this.deathTimer.add(500, this.death, this);
	},
	update: function() {
		// Run the 'Play' state's game loop

		/* --Collisions-- */
		var isTouchingTable = game.physics.arcade.overlap(this.player, this.tables);
		this.playerTouchingKitchenMonster = game.physics.arcade.overlap(this.kitchenMonster, this.player);
		this.playerTouchingRightMonster = game.physics.arcade.overlap(this.rightMonster, this.player);
		this.playerTouchingLeftMonster = game.physics.arcade.overlap(this.leftMonster, this.player);
		var TouchingDoor1 = game.physics.arcade.overlap(this.player, this.door1);
		var TouchingDoor2 = game.physics.arcade.overlap(this.player, this.door2);
		var TouchingExit = game.physics.arcade.overlap(this.player, this.exit);
		game.physics.arcade.collide(this.player, this.bounds);


		/* --Dialog Interactions-- */
		if (this.conversationState == 'END') {
			this.line = 1;
			this.dialogBox.alpha = 0;
			this.text.alpha = 0;
			this.player.changeState('normal');
		}
		/* --RIGHT MONSTER CHOICES-- */
		if (this.conversationState == narrative('rightMonster2')) {
			if (controls.num1.justDown) {
				this.conversationState = narrative('rightMonsterChoice1');
				this.text.text = this.conversationState;
			}
			if (controls.num2.justDown) {
				this.conversationState = narrative('rightMonsterChoice2');
				this.text.text = this.conversationState;
			}
		}
				

		if(this.key1==true && mirror==true){
		this.bound.body.immovable = false;
		}


		if(controls.space.justDown && TouchingDoor1){
			game.add.audio('snd_door').play('', 0, 0.05, false, false);
			game.state.start('Sub1');
		}
		
		if(TouchingDoor2&&controls.space.isDown){
			game.state.start('Sub2');
		}
	
		if(TouchingExit&&key2==true){
			game.state.start('Level3');
		}

		/* --GUI & Effects Positioning-- */
		this.border.x = game.camera.x - 16; // We want the GUI and FX to align with the camera, not just a world position
		this.border.y = game.camera.y;
		this.filter.x = game.camera.x - 16;
		this.filter.y = game.camera.y;
		this.dialogBox.x = game.camera.x + (game.camera.width/2 - this.dialogBox.width/2);
		this.dialogBox.y = game.camera.y + (game.world.height - this.dialogBox.height);
		//this.journal.x = game.camera.x + (game.camera.width/2 - this.journal.width/2);
		//this.journal.y = this.dialogBox.y - this.journal.height;
		this.text.x = this.dialogBox.x + 32;
		this.text.y = this.dialogBox.y + 32;
		this.border.bringToTop();
		this.filter.bringToTop();
		this.dialogBox.bringToTop();
		this.text.bringToTop();			
	}	
}

