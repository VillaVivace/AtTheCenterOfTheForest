var Level2 = function(game) {
	this.player;
	this.kitchen;
	this.right;
	this.left;

	this.border;
	this.filter;
	this.dialogBox1;
	this.dialogBox2;
	this.dialogBox3;
	this.cutsceneTriggered = false;
	this.text1;
	this.text2;
	this.text3;
	this.bounds;
	this.kitchenwall;

	this.blinktime=1;

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

};
Level2.prototype = {
	preload: function() {
	this.game.load.image('key', 'assets/img/keyIcon.png');	
		// Anything to preload during the Play state
	console.log('Level2: preload');
	},
	
	create: function() {
		console.log('Level2: create');
		this.stageBkg = game.add.sprite(0, 0, 'bkg_levelShort');
		game.world.setBounds(0, 0, 2400, 600);

		game.sound.stopAll();
		game.add.audio('snd_anxiety').play('', 0, 0.5, true);
		
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
		this.right = game.add.sprite(1180, game.world.height-250, 'spr_right');
		game.physics.enable(this.right);
		this.right.anchor.set(0.5, 0.5);
		this.right.body.setSize(150, 300, 50, 50 );	
		
		//monster 2
		this.left = game.add.sprite(600, game.world.height-250, 'spr_left');
		game.physics.enable(this.left);
		this.left.anchor.set(0.5, 0.5);
		this.left.body.setSize(150, 300, 0, 50 );	

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
		this.kitchen = game.add.sprite(2150, game.world.height-200, 'spr_kitchen');
		game.physics.enable(this.kitchen);
		this.kitchen.anchor.set(0.5, 0.5);
		
		//player
		this.player = new Player(game, 200, game.world.height - 200, 'spr_player', controls);
		this.game.add.existing(this.player);
		
		/* --GUI & Effects-- */
		this.filter = game.add.sprite(0, 0, 'gui_filter');
		this.filter.scale.setTo(1, 1);
		this.border = game.add.sprite(0, 0, 'gui_border');
		this.border.scale.setTo(1, 1);
		game.world.bringToTop(this.border);

		var textStyle1= { font: "32px Times New Roman", fill: "#ffffff"}
		this.dialogBox1 = game.add.sprite(400, game.world.height-200, 'gui_dialogBox');
		this.dialogBox1.scale.setTo(0.5, 1);
		this.dialogBox1.alpha = 0;
		this.text1 = this.game.add.text(450, 450, narrative("L2_1"), textStyle1);
		this.text1.alpha = 0;

		this.dialogBox2 = game.add.sprite(980, game.world.height-200, 'gui_dialogBox');
		this.dialogBox2.scale.setTo(0.5, 1);
		this.dialogBox2.alpha = 0;
		this.text2 = this.game.add.text(1000, 450, narrative("L2_2"), textStyle1);
		this.text2.alpha = 0;

		this.dialogBox3 = game.add.sprite(1500, game.world.height-200, 'gui_dialogBox');
		this.dialogBox3.scale.setTo(0.5, 1);
		this.dialogBox3.alpha = 0;

    	game.time.events.loop(3000, blink, this);
		
		
	},
	update: function() {
		// Run the 'Play' state's game loop

		/* --Collisions-- */
		var isTouchingTable = game.physics.arcade.overlap(this.player, this.tables);
		var kitchenTouchingPlayer = game.physics.arcade.overlap(this.kitchen, this.player);
		var rightTouch = game.physics.arcade.overlap(this.right, this.player);
		var leftTouch = game.physics.arcade.overlap(this.left, this.player);
		var TouchingDoor1 = game.physics.arcade.overlap(this.player, this.door1);
		var TouchingDoor2 = game.physics.arcade.overlap(this.player, this.door2);
		var TouchingExit = game.physics.arcade.overlap(this.player, this.exit);
		var TouchingKey1 = game.physics.arcade.overlap(this.player, this.key11);
		game.physics.arcade.collide(this.player, this.bounds);


		/* --Interaction-- */
		if(this.blinktime%2!==0){ 
			if(leftTouch && controls.space.isDown){
			this.dialogBox1.alpha = 1;
			this.text1.alpha = 1;
			}
		
		if(rightTouch&& controls.space.isDown){
			this.dialogBox2.alpha = 1;
			this.text2.alpha = 1;	
			}
		if(kitchenTouchingPlayer&& controls.space.isDown){
			this.dialogBox3.alpha = 1;	
				}
		}
		
		if(this.dialogBox2.alpha == 1){
			if(mirror==false){
				if(controls.up.isDown||controls.down.isDown){
				game.state.start('GameOver');
			}
		}else if(mirror==true){
				if(controls.up.isDown){
				this.key1=true
				this.key11.alpha = 1;
			}}
		}
		
		if(this.key11.alpha == 1){
			if(controls.space.isDown){
				this.key11.alpha = 0;
			}
		}			

		if(this.key1==true && mirror==true){
		this.bound.body.immovable = false;
		}

		if (this.blinktime%2==0){
		 if(kitchenTouchingPlayer||rightTouch||leftTouch) {
			//game.state.start('GameOver');
		} }

		if(TouchingDoor1&&controls.space.isDown){
			game.state.start('Sub1');
		}
		
		if(TouchingDoor2&&controls.space.isDown){
			game.state.start('Sub2');
		}
	
		if(TouchingExit&&key2==true){
			game.state.start('Level3');
		}
		
		
		if(this.blinktime%2==0){
		this.kitchen.frame = 1;
		this.right.frame = 1;
		this.left.frame = 1;
		this.dialogBox1.alpha = 0;
		this.dialogBox2.alpha = 0;
		this.dialogBox3.alpha = 0;
		this.text1.alpha = 0;
		this.text2.alpha = 0;			
		}else {
		this.kitchen.frame = 0;
		this.right.frame = 0;
		this.left.frame = 0;
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
		
	function blink(){
		this.blinktime++;
		console.log(this.blinktime);		
	}
