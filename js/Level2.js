var playerHasMirror = false;
var hasMirrorFlag = false;
var bloodrootPleased = false;
var bloodrootPleasedFlag = false;
var playerHasIngredient = false
var hasIngredientFlag = false;
var doneWithNoLegs = false;
var doneWithChefArma = false;
var playerHasKey1 = false;
var playerHasKey2 = false;

var playerHasEyeballs = false;
var playerHasMandrake = false;
var playerHasHeart = false;

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
	this.kitchenBound;
	this.kitchenwall;
	this.spaceButton;
	this.touchedMonsterOnce = false;
	this.showActionUI;


	this.tables;
	this.chandalier;
	this.bookcases;
	this.kitchenShelf;
	this.door1;
	this.door2;
	this.kitchendoor;
	this.exit;

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
	
	create: function() {
		game.world.setBounds(0, 0, 4800, 600);
		localStorage.setItem('level', 'Level2');

		game.camera.flash(0x000000, 1500);

		this.stageBkg = game.add.sprite(0, 0, 'atlas', 'background_levelLong');

		if (this.songIsPlaying == null) {
			this.songIsPlaying = false;
		}
		this.song = game.add.audio('snd_level2');
		if (this.songIsPlaying == false) {
			this.song.play('', 0, 0.5, true);
		}
		
		/* --Objects & Furniture-- */
		this.bounds = game.add.group();
		this.bounds.enableBody = true;
		this.bounds.alpha = 0;
		this.bound = this.bounds.create(100, 0, 'atlas', 'obj_bounds'); 
		this.bound.body.immovable = true;
		this.bound = this.bounds.create(4650, 0, 'atlas', 'obj_bounds');
		this.bound.body.immovable = true;
		this.kitchenBound = this.bounds.create(2600, 0, 'atlas', 'obj_bounds');
		this.kitchenBound.body.immovable = true;				
		
		//left monster
		this.leftMonster = game.add.sprite(1300, game.world.height-250, 'spr_left');
		game.physics.enable(this.leftMonster);
		this.leftMonster.anchor.set(0.5, 0.5);
		this.leftMonster.body.setSize(150, 300, 0, 50 );
		this.leftMonster.frame = 1;

		//tables
		this.tables = game.add.group();
		this.tables.enableBody = true;
		this.tables.create(400, 355, 'atlas', 'obj_table');
		this.table = this.tables.create(1350, 325, 'atlas', 'obj_diningtable');
		this.table.body.setSize(400, 200, 50);

		//right monster
		this.rightMonster = game.add.sprite(1880, game.world.height-250, 'spr_right');
		game.physics.enable(this.rightMonster);
		this.rightMonster.anchor.set(0.5, 0.5);
		this.rightMonster.body.setSize(150, 300, 50, 50 );
		this.rightMonster.frame = 1;

		//bookcase
		this.bookcases = game.add.group();
		this.bookcases.enableBody = true;
		this.bookcases.create(700, 150, 'atlas', 'obj_bookcase');
		
		//doors
		this.door = game.add.sprite(200, 0, 'atlas', 'obj_door');		
		game.physics.enable(this.door);	
		this.door.scale.x = -1;
		this.door1 = game.add.sprite(2200, 0, 'atlas', 'obj_door2');		
		game.physics.enable(this.door1);				
		this.door2 = game.add.sprite(3600, 0, 'atlas', 'obj_door2');		
		game.physics.enable(this.door2);
		this.exit= game.add.sprite(4600, 0, 'atlas', 'obj_door');
		game.physics.enable(this.exit);

		//chandaliers
		this.chandalier = game.add.sprite(1475, 0, 'obj_chandalier');
		this.chandalier.animations.add('anima', Phaser.Animation.generateFrameNames('chandalier', 1, 3), 2, true);
		this.chandalier.animations.play('anima');				

		//kitchen counter
		this.counter = game.add.sprite(2800, 365, 'atlas', 'counter');

		//kitchen monster
		this.kitchenMonster = game.add.sprite(3350, game.world.height-225, 'spr_kitchen');
		game.physics.enable(this.kitchenMonster);
		this.kitchenMonster.anchor.set(0.5, 0.5);
		this.kitchenMonster.frame = 1;

		//kitchen shelf
		this.kitchenShelf = game.add.sprite(3900, 150, 'atlas', 'obj_shelf');
		
		//player
		if (this.playerX == null && this.player == null) {
			this.playerX = 200;
			this.playerY = game.world.height - 200;
		}
		this.player = new Player(game, this.playerX, this.playerY, 'spr_player', controls);
		this.game.add.existing(this.player);

		//kitchen wall
		this.kitchenwall = game.add.sprite(2600, 0, 'atlas', 'wall');
		this.kitchenwall.enableBody = true;
		
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
		
		this.conversationState = 'END';
		this.line = 1;
		this.conversationManager = function() {
			/* --LEFT MONSTER (No Legs)-- */
			if (doneWithNoLegs == false) {
				if (bloodrootPleased == true) {
					if (bloodrootPleasedFlag == false) {
						bloodrootPleasedFlag = true;
						this.line = 7;
					}
					
					if (this.playerTouchingLeftMonster && this.conversationState == 'END') {
						this.player.changeState('cutscene');
						this.dialogBox.alpha = 1;
						this.text.alpha = 1;
						this.conversationState = narrative('leftMonster' + this.line);
						this.text.text = this.conversationState;
					}
					else if (this.conversationState == narrative('leftMonster9')) {
						this.player.changeDoorKeyAlpha(1);
						playerHasKey1 = true;
						this.conversationState = 'END';
						
					}
					else if (this.playerTouchingLeftMonster && this.conversationState != 'END') {
						this.line = this.line + 1;
						this.conversationState = narrative('leftMonster' + this.line);
						this.text.text = this.conversationState;
					}
				}
				else {
					if (this.playerTouchingLeftMonster && this.conversationState == 'END') {
						this.player.changeState('cutscene');
						this.dialogBox.alpha = 1;
						this.text.alpha = 1;
						this.conversationState = narrative('leftMonster' + this.line);
						this.text.text = this.conversationState;
					}
					else if (this.playerTouchingLeftMonster && this.conversationState != 'END') {
						this.line = this.line + 1;
						this.conversationState = narrative('leftMonster' + this.line);
						this.text.text = this.conversationState;
					}
				}
			}
			
			/* --RIGHT MONSTER (Bloodroot)-- */
			if (bloodrootPleased == false) {
				if (playerHasMirror) {
					if (hasMirrorFlag == false) {
						hasMirrorFlag = true;
						this.line = 5;
					}
				}
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
				else if (this.conversationState == narrative('rightMonsterChoice3')) {
					bloodrootPleased = true;
					playerHasMirror = false;
					this.conversationState = 'END';
				}
				else if (this.playerTouchingRightMonster && this.conversationState != 'END') {
					this.line = this.line + 1;
					this.conversationState = narrative('rightMonster' + this.line);
					this.text.text = this.conversationState;
				}
			}

			/* --Kitchen MONSTER (Chef Arma)-- */
			if (doneWithChefArma == false) {
				if (playerHasIngredient) {
					if (hasIngredientFlag == false) {
						hasIngredientFlag = true;
						this.line = 5;
					}
				}
				if (this.playerTouchingKitchenMonster && this.conversationState == 'END') {
					this.player.changeState('cutscene');
					this.dialogBox.alpha = 1;
					this.text.alpha = 1;
					this.conversationState = narrative('kitchenMonster' + this.line);
					this.text.text = this.conversationState;
				}
				if (this.conversationState == narrative('kitchenMonster7')) {
					playerHasIngredient = false;
					game.add.audio('snd_screech1').play('', 0, 0.25, false, false);
				}
				else if (this.conversationState == narrative('kitchenMonster8')) {
						this.player.changeDoorKeyAlpha(1);
						playerHasKey2 = true;
						this.conversationState = 'END';
				}
				if (this.playerTouchingKitchenMonster && this.conversationState != 'END') {
					this.line = this.line + 1;
					this.conversationState = narrative('kitchenMonster' + this.line);
					this.text.text = this.conversationState;
				}
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
		var touchedKitchenWall = game.physics.arcade.collide(this.player, this.kitchenBound);
		var isTouchingTable = game.physics.arcade.overlap(this.player, this.tables);
		game.physics.arcade.collide(this.player, this.bounds);


		if (this.playerTouchingLeftMonster && this.touchedMonsterOnce == false) {
			this.touchedMonsterOnce = true;
			this.showActionUI(true);
		}

		/* --Dialog Interactions-- */
		if (this.conversationState == 'END') {
			this.line = 1;
			hasMirrorFlag = false;
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
		if (this.conversationState == narrative('rightMonster6')) {
			if (controls.num1.justDown) {
				this.conversationState = narrative('rightMonsterChoice3');
				this.text.text = this.conversationState;
			}
			if (controls.num2.justDown) {
				this.conversationState = narrative('rightMonsterChoice2');
				this.text.text = this.conversationState;
			}
		}

		if(controls.space.isDown && isTouchingTable){
			game.world.bringToTop(this.tables);
			this.player.changeState('hidden');
		}
				
		if (playerHasMirror) {
			this.player.changeMirrorAlpha(1);
		} else {
			this.player.changeMirrorAlpha(0);
		}
		if (playerHasEyeballs) {
			this.player.changeEyeballsAlpha(1);
		}
		if (playerHasMandrake) {
			this.player.changeMandrakeAlpha(1);
		}
		if (playerHasHeart) {
			this.player.changeHeartAlpha(1);
		}
		if (playerHasIngredient == false) {
			this.player.changeEyeballsAlpha(0);
			this.player.changeMandrakeAlpha(0);
			this.player.changeHeartAlpha(0);
		}


		if (playerHasKey1) {
			doneWithNoLegs = true;
		}
		if (playerHasKey2) {
			doneWithChefArma = true;
		}
		if (playerHasKey1 && touchedKitchenWall) {
			game.add.audio('snd_door').play('', 0, 0.05, false, false);
			this.player.changeDoorKeyAlpha(0);
			this.kitchenBound.kill();
		}

		if (playerHasKey1 == false) {
			if(controls.space.justDown && TouchingDoor1){
				game.add.audio('snd_door').play('', 0, 0.05, false, false);
				game.state.start('Sub1');
			}
		}	
		if (playerHasKey2 == false) {
			if(controls.space.justDown && TouchingDoor2){
				game.add.audio('snd_door').play('', 0, 0.05, false, false);
				game.state.start('Sub2');
			}
		}

		if(playerHasKey2){
			if (controls.space.isDown && TouchingExit) {
				game.sound.stopAll();
				game.add.audio('snd_door').play('', 0, 0.05, false, false);
				game.state.start('Stairs3');
			}
		}

		this.player.bringToTop();
		this.kitchenwall.bringToTop();
		this.spaceButton.x = this.player.centerX;
		/* --GUI & Effects Positioning-- */
		this.border.x = game.camera.x - 16; // We want the GUI and FX to align with the camera, not just a world position
		this.border.y = game.camera.y;
		this.filter.x = game.camera.x - 16;
		this.filter.y = game.camera.y;
		this.dialogBox.x = game.camera.x + (game.camera.width/2 - this.dialogBox.width/2);
		this.dialogBox.y = game.camera.y + (game.world.height - this.dialogBox.height);
		this.text.x = this.dialogBox.x + 32;
		this.text.y = this.dialogBox.y + 32;
		this.border.bringToTop();
		this.filter.bringToTop();
		this.dialogBox.bringToTop();
		this.text.bringToTop();			
	}	
}

