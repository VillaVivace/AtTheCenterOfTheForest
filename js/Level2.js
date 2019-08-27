var Level2 = function(game) {
	this.player;
	this.kitchen;


	this.border;
	this.filter;
	this.journal;
	this.dialogBox;
	this.dialogBox1
	this.cutsceneTriggered = false;
	this.text;
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

};
Level2.prototype = {
	preload: function() {
		// Anything to preload during the Play state
	console.log('Level2: preload');
	},
	
	create: function() {
		console.log('Level2: create');
		game.sound.stopAll();

		this.stageBkg = game.add.sprite(0, 0, 'bkg_levelLong');
		game.world.setBounds(0, 0, 4800, 600);

		game.add.audio('snd_anxiety').play('', 0, 0.5, true);
		
		/* --Objects & Furniture-- */
		this.bounds = game.add.group();
		this.bounds.enableBody = true;
		this.bounds.alpha = 0;
		this.bound = this.bounds.create(148, 0, 'obj_bounds'); 
		this.bound.body.immovable = true;
		this.bound = this.bounds.create(4600, 0, 'obj_bounds');
		this.bound.body.immovable = true;
		
		this.diningtables = game.add.group();
		this.diningtables.enableBody = true;
		this.diningtables.create(1000, 355, 'obj_diningtable');
		this.diningtables.create(2700, 355, 'obj_diningtable');
		
		this.door1 = game.add.sprite(1800, 0, 'obj_door2');		
		game.physics.enable(this.door1);		
		this.door2 = game.add.sprite(2200, 0, 'obj_door2');	
		game.physics.enable(this.door2);				
		this.kitchendoor = game.add.sprite(3500, 0, 'obj_door');
		game.physics.enable(this.kitchendoor);
		this.exit= game.add.sprite(4600, 0, 'obj_door');
		game.physics.enable(this.exit);
		
		this.chandalier = game.add.sprite(1150, 0, 'obj_chandalier');
		this.chandalier.animations.add('anima', Phaser.Animation.generateFrameNames('chandalier', 0, 2), 6, true);
		this.chandalier.animations.play('anima');				
		this.chandalier1 = game.add.sprite(2800, 0, 'obj_chandalier');
		this.chandalier1.animations.add('anima', Phaser.Animation.generateFrameNames('chandalier', 0, 2), 6, true);
		this.chandalier1.animations.play('anima');	

		
		this.player = new Player(game, 200, game.world.height - 200, 'spr_player', controls);
		this.game.add.existing(this.player);

		this.kitchen = game.add.sprite(1300, game.world.height-200, 'spr_kitchen');
		game.physics.enable(this.kitchen);
		this.kitchen.anchor.set(0.5, 0.5);

		
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

		this.dialogBox1 = game.add.sprite(1000, game.world.height-200, 'gui_dialogBox');
		this.dialogBox1.alpha = 0;

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
		if (isTouchingTable && controls.space.isDown) {
			game.world.bringToTop(this.tables);
			this.player.changeState('hidden');
		}
		if(this.blinktime%2!==0 && kitchenTouchingPlayer && controls.space.isDown){
			this.dialogBox1.alpha = 1;
		}

	/*	if (this.blinktime%2==0 && kitchenTouchingPlayer) {
			game.state.start('GameOver');
		}*/


	/*	if(TouchingDoor1&&controls.space.isDown){
			game.state.start('Sub1');
		}*/
		
	/*	if(TouchingDoor2&&controls.space.isDown){
			game.state.start('Sub2');
		}*/
	
	/*	if(TouchingExit&&key==true){
			game.state.start('Level3');
		}*/
		
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
		

		if(this.blinktime%2==0){
			this.kitchen.frame = 1; 
			this.dialogBox1.alpha = 0;
		}else {this.kitchen.frame = 0;}		
	}
		

}
	function blink(){
		this.blinktime++;
		console.log(this.blinktime);		
	}
