var Level1 = function(game) {
	this.player;
	this.crawler;
	this.crawlerFlipped = false;
	this.eyes;
	this.eyeLogo;

	this.border;
	this.filter;
	this.journal;
	this.dialogBox;
	this.cutsceneTriggered = false;
	this.text;
	this.showJournal;
	this.bounds;

	this.timer;
	this.stepTimer;
	this.helpText = false;

	this.curtains;
};
Level1.prototype = {
	preload: function() {
		// Anything to preload during the Play state
		console.log('Level1: preload');
	
	},
	create: function() {
		console.log('Level1: create');
		this.stageBkg = game.add.sprite(0, 0, 'bkg_levelLong');
		game.world.setBounds(0, 0, 4800, 600);

		game.add.audio('snd_anxiety').play('', 0, 0.5, true);

		/* --Objects & Furniture-- */
		this.bounds = game.add.group();
		this.bounds.enableBody = true;
		this.bounds.alpha = 0;
		this.bound = this.bounds.create(148, 0, 'obj_bounds');
		this.bound.body.immovable = true;
		this.bound = this.bounds.create(4700, 0, 'obj_bounds');
		this.bound.body.immovable = true;
		
		this.curtains = game.add.group();
		this.curtains.enableBody = true;
		this.curtains.create(1000, 0, 'obj_curtains');
		this.curtains.create(1800, 0, 'obj_curtains');
		this.curtains.create(2600, 0, 'obj_curtains');
		this.curtains.create(3400, 0, 'obj_curtains');
		this.curtains.create(4000, 0, 'obj_curtains');
		
		//eyes
		this.eyeLogo= this.game.add.sprite(800, 200, 'gui_eyeLogo');	
		this.eyeLogo.animations.add('eye', Phaser.Animation.generateFrameNames('frame_', 0, 18), 4, true);
		this.eyeLogo.animations.play('eye');		
		game.physics.enable(this.eyeLogo);
		this.eyeLogo1= this.game.add.sprite(1400, 200, 'gui_eyeLogo');	
		this.eyeLogo1.animations.add('eye', Phaser.Animation.generateFrameNames('frame_', 0, 18), 4, true);
		this.eyeLogo1.animations.play('eye');		
		game.physics.enable(this.eyeLogo1);
		this.eyeLogo2= this.game.add.sprite(2000, 200, 'gui_eyeLogo');	
		this.eyeLogo2.animations.add('eye', Phaser.Animation.generateFrameNames('frame_', 0, 18), 4, true);
		this.eyeLogo2.animations.play('eye');		
		game.physics.enable(this.eyeLogo2);
		this.eyeLogo3= this.game.add.sprite(2600, 200, 'gui_eyeLogo');	
		this.eyeLogo3.animations.add('eye', Phaser.Animation.generateFrameNames('frame_', 0, 18), 4, true);
		this.eyeLogo3.animations.play('eye');		
		game.physics.enable(this.eyeLogo3);
		this.eyeLogo4= this.game.add.sprite(3500, 200, 'gui_eyeLogo');	
		this.eyeLogo4.animations.add('eye', Phaser.Animation.generateFrameNames('frame_', 0, 18), 4, true);
		this.eyeLogo4.animations.play('eye');		
		game.physics.enable(this.eyeLogo4);
		
		//player
		this.player = new Player(game, 200, game.world.height - 200, 'spr_player', controls);
		this.game.add.existing(this.player);

		this.crawler = game.add.sprite(1300, game.world.height-150, 'spr_crawler');
		game.physics.enable(this.crawler);
		this.crawler.anchor.set(0.5, 0.5);
		this.crawler.body.velocity.x = 350;
		this.crawler.animations.add('walk', Phaser.Animation.generateFrameNames('walk', 1, 4), 7, true);
		this.crawler.animations.play('walk');



		
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

		
		
	},
	update: function() {
		// Run the 'Play' state's game loop
		
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
		/* --Collisions-- */
		var isTouchingTable = game.physics.arcade.overlap(this.player, this.curtains);
		var crawlerTouchingTable = game.physics.arcade.overlap(this.crawler, this.curtains);
		var crawlerTouchingEye = game.physics.arcade.overlap(this.crawler, this.eyeLogo)		
		var Die = game.physics.arcade.overlap(this.player, this.crawler);
		var CloseEye=false;
		game.physics.arcade.collide(this.player, this.bounds);
		
		game.physics.arcade.overlap(this.player, this.eyeLogo, SpeedUp, null);
		game.physics.arcade.overlap(this.player, this.eyeLogo1, SpeedUp, null);
		game.physics.arcade.overlap(this.player, this.eyeLogo2, SpeedUp, null);
		game.physics.arcade.overlap(this.player, this.eyeLogo3, SpeedUp, null);
		game.physics.arcade.overlap(this.player, this.eyeLogo4, SpeedUp, null);
		
		if(this.eyeLogo.animations.currentAnim.frame==3||
			this.eyeLogo.animations.currentAnim.frame==7||
			this.eyeLogo.animations.currentAnim.frame==11||
			this.eyeLogo.animations.currentAnim.frame==15){
			 CloseEye = true;
		}

		console.log('Close='+CloseEye);

		/* --Cutscenes-- */
		if (this.cutsceneTriggered == false && this.player.x > 600) {
			this.player.changeState('cutscene');
			this.journalTimer.start();
		}
		if (controls.space.justDown && this.cutsceneTriggered == true) {
			this.showJournal(false);
		}
		if (isTouchingTable && controls.space.isDown) {
			game.world.bringToTop(this.curtains);
			this.player.changeState('hidden');
		}
		
	/*	if (TouchingEye && CloseEye==false) {
		this.player.bringToTop();			
		if(this.crawler.x<this.player.x){
			this.crawler.body.velocity.x = 600;
		}else{
			this.crawlerFlipped == true;
			this.crawler.body.velocity.x = -600;}
		}*/

		/* --crawler Movement-- */
		if (this.crawler.body.velocity.x > 0) {
			this.crawler.scale.x = -1;
		} else {
			this.crawler.scale.x = 1;
		}

	if ((this.crawler.x <= 400 || this.crawler.x >= 4250) && this.crawlerFlipped == false) {
			this.crawlerFlipped = true;
			this.crawler.body.velocity.x = -(this.crawler.body.velocity.x);
		}
		if (this.crawler.x >= 1200 && this.crawler.x <= 1400) {
			this.crawlerFlipped = false;
		}
		if (crawlerTouchingTable) {
			this.crawler.bringToTop();
		}
		if (crawlerTouchingEye) {
			this.crawler.bringToTop();
		}
	},

		render:function() {
   	 	game.debug.body(this.crawler);
   	 	game.debug.body(this.eyeLogo);
   	 	game.debug.body(this.player);
   	 	game.debug.body(this.curtains);
   	 },
   	 
   	 CreateEyes: function() {
		this.eyeLogo= this.game.add.sprite(800, 200, 'gui_eyeLogo');	
		this.eyeLogo.animations.add('eye', Phaser.Animation.generateFrameNames('frame_', 0, 18), 4, true);
		this.eyeLogo.animations.play('eye');		
		game.physics.enable(this.eyeLogo);
		this.eyeLogo1= this.game.add.sprite(1400, 200, 'gui_eyeLogo');	
		this.eyeLogo1.animations.add('eye', Phaser.Animation.generateFrameNames('frame_', 0, 18), 7, true);
		this.eyeLogo1.animations.play('eye');		
		game.physics.enable(this.eyeLogo1);
		this.eyeLogo2= this.game.add.sprite(2000, 200, 'gui_eyeLogo');	
		this.eyeLogo2.animations.add('eye', Phaser.Animation.generateFrameNames('frame_', 0, 18), 2, true);
		this.eyeLogo2.animations.play('eye');		
		game.physics.enable(this.eyeLogo2);
		this.eyeLogo3= this.game.add.sprite(2600, 200, 'gui_eyeLogo');	
		this.eyeLogo3.animations.add('eye', Phaser.Animation.generateFrameNames('frame_', 0, 18), 9, true);
		this.eyeLogo3.animations.play('eye');		
		game.physics.enable(this.eyeLogo3);
		this.eyeLogo4= this.game.add.sprite(3500, 200, 'gui_eyeLogo');	
		this.eyeLogo4.animations.add('eye', Phaser.Animation.generateFrameNames('frame_', 0, 18), 6, true);
		this.eyeLogo4.animations.play('eye');		
		game.physics.enable(this.eyeLogo4);
   	 },
   	 
   	 SpeedUp: function(){
		if(CloseEye==true){
		this.player.bringToTop();}
		else{
			this.player.bringToTop();			
		if(this.crawler.x<this.player.x){
			this.crawler.body.velocity.x = 600;
		}else{
			this.crawlerFlipped == true;
			this.crawler.body.velocity.x = -600;}}
		
   	 }
		
}
