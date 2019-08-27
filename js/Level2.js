var Level2 = function(game) {
	this.player;
	this.kitchen;
	this.right;
	this.left;

	this.border;
	this.filter;
	this.journal;
	this.dialogBox;
	this.dialogBox1;
	this.dialogBox2;
	this.dialogBox3;
	this.cutsceneTriggered = false;
	this.text;
	this.text1;
	this.text2;
	this.text3;
	this.showJournal;
	this.bounds;

	this.timer;
	this.stepTimer;
	this.helpText = false;
	this.blinktime=1;

	this.diningtables;
	this.chandalier;
	this.chandalier1;
	this.door1;
	this.ddor2;
	this.kitchendoor;
	this.exit;

	this.key=false;
	this.mirror=false;

};
Level2.prototype = {
	preload: function() {
		// Anything to preload during the Play state
	console.log('Level2: preload');
	},
	
	create: function() {
		console.log('Level2: create');
		this.stageBkg = game.add.sprite(0, 0, 'bkg_levelShort');
		game.world.setBounds(0, 0, 2400, 600);

		game.add.audio('snd_anxiety').play('', 0, 0.5, true);
		
		/* --Objects & Furniture-- */
		this.bounds = game.add.group();
		this.bounds.enableBody = true;
		this.bounds.alpha = 0;
		this.bound = this.bounds.create(148, 0, 'obj_bounds'); 
		this.bound.body.immovable = true;
		this.bound = this.bounds.create(2400, 0, 'obj_bounds');
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

		
		//doors
		this.door1 = game.add.sprite(1800, 0, 'obj_door2');		
		game.physics.enable(this.door1);				
		this.exit= game.add.sprite(2200, 0, 'obj_door');
		game.physics.enable(this.exit);
		
		//kitchen wall
		this.kitchenwall = game.add.sprite(1500, 0, 'wall');	

		//chandaliers
		this.chandalier = game.add.sprite(825, 0, 'obj_chandalier');
		this.chandalier.animations.add('anima', Phaser.Animation.generateFrameNames('chandalier', 1, 3), 2, true);
		this.chandalier.animations.play('anima');				

		
		//kitchen monster
		this.kitchen = game.add.sprite(1700, game.world.height-200, 'spr_kitchen');
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
		this.journal = game.add.sprite(0, 0, 'gui_journal');
		this.journal.scale.setTo(0.75, 0.75);
		this.journal.alpha = 0;
		this.dialogBox = game.add.sprite(0, 0, 'gui_dialogBox');
		this.dialogBox.alpha = 0;
		var textStyle = { font: "16px Times New Roman", fill: "#ffffff"}
		this.text = this.game.add.text(0, 0, narrative("stage2_1"), textStyle);
		this.text.alpha = 0;

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
		
		this.showJournal = function(show) {
			if (show == true) {
				this.cutsceneTriggered = true;
				this.dialogBox.alpha = 1;
				this.journal.alpha = 1;
				this.text.alpha = 1;
			}
			else {
				this.player.changeState('normal');
				this.dialogBox.alpha = 0;
				this.journal.alpha = 0;
				this.text.alpha = 0;
			}
		};
		
		this.journalTimer = game.time.create(false);
    	this.journalTimer.add(500, this.showJournal, this, true); 

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
		var TouchingDoor2 = game.physics.arcade.overlap(this.player, this.door1);
		var TouchingExit = game.physics.arcade.overlap(this.player, this.exit);

		game.physics.arcade.collide(this.player, this.bounds);

		/* --Cutscenes-- */
		if (this.cutsceneTriggered == false && this.player.x > 600) {
			this.player.changeState('cutscene');
			this.journalTimer.start();
		}
		if (controls.space.justDown && this.cutsceneTriggered == true) {
			this.showJournal(false);
		}

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
			if(controls.up.isDown||controls.down.isDown){
				game.state.start('GameOver');
			}
		}

		
		if (this.blinktime%2==0){
		 if(kitchenTouchingPlayer||rightTouch||leftTouch) {
			//game.state.start('GameOver');
		} }

		if(TouchingDoor1&&controls.space.justDown){
			game.state.start('Sub1');
		}
		
		if(TouchingDoor2&&controls.space.isDown){
			game.state.start('Sub2');
		}
	
		if(TouchingExit&&key==true){
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
		this.dialogBox.x = game.camera.x + (game.camera.width/2 - this.dialogBox.width/2);
		this.dialogBox.y = game.camera.y + (game.world.height - this.dialogBox.height);
		this.journal.x = game.camera.x + (game.camera.width/2 - this.journal.width/2);
		this.journal.y = this.dialogBox.y - this.journal.height;
		this.text.x = this.dialogBox.x + 32;
		this.text.y = this.dialogBox.y + 32;
		this.border.bringToTop();
		this.filter.bringToTop();
		this.dialogBox.bringToTop();
		this.journal.bringToTop();
		this.text.bringToTop();
		this.text1.bringToTop();				
	},

	render: function() {
   	 	game.debug.body(this.right);
   	 	game.debug.body(this.left);
   	 	game.debug.body(this.player);
	}		
}
		
	function blink(){
		this.blinktime++;
		console.log(this.blinktime);		
	}
