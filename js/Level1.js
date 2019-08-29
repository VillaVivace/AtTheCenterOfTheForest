var eyeIsClosed = false;

var Level1 = function(game) {
	this.player;
	this.crawler;
	this.crawlerFlipped = false;
	this.eyes;

	this.border;
	this.filter;
	this.journal;
	this.dialogBox;
	this.text;
	this.showJournal;
	this.bounds;
	this.warningTriggered = false;

	this.timer;
	this.stepTimer;

	this.curtains;
	this.door;
};

Level1.prototype = {
	preload: function() {
		// Anything to preload during the Play state
		console.log('Level1: preload');
	
	},
	create: function() {
		console.log('Level1: create');
		localStorage.setItem('level', 'Level1');

		game.camera.flash(0x000000, 1500);

		this.stageBkg = game.add.sprite(0, 0, 'bkg_levelLong');
		game.world.setBounds(0, 0, 4800, 600);
		
		game.add.audio('snd_level1').play('', 0, 0.5, true);

		/* --Objects & Furniture-- */
		this.bounds = game.add.group();
		this.bounds.enableBody = true;
		this.bounds.alpha = 0;
		this.bound = this.bounds.create(148, 0, 'obj_bounds');
		this.bound.body.immovable = true;
		this.bound = this.bounds.create(4650, 0, 'obj_bounds');
		this.bound.body.immovable = true;
		
		this.curtains = game.add.group();
		this.curtains.enableBody = true;
		this.curtains.create(800, 0, 'obj_curtains');
		this.curtains.create(1600, 0, 'obj_curtains');
		this.curtains.create(2400, 0, 'obj_curtains');
		this.curtains.create(3200, 0, 'obj_curtains');
		this.curtains.create(4000, 0, 'obj_curtains');

		this.door = this.game.add.sprite(4600, 0, 'obj_door');
		game.physics.enable(this.door);
		this.door.body.immovable = true;
		
		//eyes
		this.eyes = game.add.group();
		this.eyes.enableBody = true;
		this.eyeLogo = this.eyes.create(420, 200, 'gui_eyeLogo');	
		this.eyeLogo.animations.add('eye', Phaser.Animation.generateFrameNames('frame_', 0, 18), 4, true);
		this.eyeLogo.animations.play('eye');
		this.eyeLogo = this.eyes.create(1320, 200, 'gui_eyeLogo');	
		this.eyeLogo.animations.add('eye', Phaser.Animation.generateFrameNames('frame_', 0, 18), 7, true);
		this.eyeLogo.animations.play('eye');
		this.eyeLogo = this.eyes.create(2120, 200, 'gui_eyeLogo');	            
		this.eyeLogo.animations.add('eye', Phaser.Animation.generateFrameNames('frame_', 0, 18), 2, true);
		this.eyeLogo.animations.play('eye');
		this.eyeLogo = this.eyes.create(2920, 200, 'gui_eyeLogo');	
		this.eyeLogo.animations.add('eye', Phaser.Animation.generateFrameNames('frame_', 0, 18), 9, true);
		this.eyeLogo.animations.play('eye');
		this.eyeLogo = this.eyes.create(3720, 200, 'gui_eyeLogo');	
		this.eyeLogo.animations.add('eye', Phaser.Animation.generateFrameNames('frame_', 0, 18), 6, true);
		this.eyeLogo.animations.play('eye');
		
		//player
		this.player = new Player(game, 300, game.world.height - 200, 'spr_player', controls);
		this.game.add.existing(this.player);
		
		this.crawler = game.add.sprite(1000, game.world.height-150, 'spr_crawler');
		game.physics.enable(this.crawler);
		this.crawler.anchor.set(0.5, 0.5);
		this.crawler.body.velocity.x = -350;
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
		
		this.death = function() {
			game.state.start('GameOver');
		};
	
		this.deathTimer = game.time.create(false);
    	this.deathTimer.add(500, this.death, this);
	},
	update: function() {
		
		/* --Collisions-- */
		var touchedDoor = game.physics.arcade.overlap(this.player, this.door);
		var isTouchingCurtains = game.physics.arcade.overlap(this.player, this.curtains);
		var crawlerTouchingCurtains = game.physics.arcade.overlap(this.crawler, this.curtains);
		var crawlerTouchingEye = game.physics.arcade.overlap(this.crawler, this.eyeLogo)		
		var playerTouchingCrawler = game.physics.arcade.overlap(this.player, this.crawler);
		var playerTouchingEye = game.physics.arcade.overlap(this.player, this.eyes, callMonster, null, this);
		game.physics.arcade.collide(this.player, this.bounds);

		if (controls.space.isDown && touchedDoor) {
			game.sound.stopAll();
			game.add.audio('snd_door').play('', 0, 0.05, false, false);
			game.state.start('Stairs2');
		}

		if (playerTouchingCrawler && this.player.getState() == 'normal') {
			this.player.changeState('hidden');
			this.game.camera.fade(0xD13030, 500);
			this.deathTimer.start();
		}
		if (isTouchingCurtains && controls.space.isDown) {
			game.world.bringToTop(this.curtains);
			this.player.changeState('hidden');
		}

		/* --Crawler Interactions and Movement-- */
		if (!playerTouchingEye) {
			this.warningTriggered = false;
			eyeIsClosed = true;
		}

		if (eyeIsClosed == false) {
			if (this.warningTriggered == false) {
				this.warningTriggered = true;
				var rand = Math.random();
				var warningSound;
				if (rand < 0.5) {
					warningSound = game.add.audio('snd_screech1');
				} else {
					warningSound = game.add.audio('snd_screech2');
				}
				warningSound.play('', 0, 0.25, false, false);
				
			}
			if ((this.crawler.x < this.player.x) && this.player.getState() == 'normal') {
				this.crawler.body.velocity.x = 600;
			}
			else if ((this.crawler.x >= this.player.x) && this.player.getState() == 'normal'){
				//this.crawlerFlipped == true;
				this.crawler.body.velocity.x = -600;
			}
		} else {
			if (this.crawler.body.velocity.x == 600) {
				this.crawler.body.velocity.x = 350;
			}
			else if(this.crawler.body.velocity.x == -600) {
				this.crawler.body.velocity.x = -350;
			}
		}
		if (this.crawler.body.velocity.x > 0) {
			this.crawler.scale.x = -1;
		} else {
			this.crawler.scale.x = 1;
		}

		if ((this.crawler.x <= 550 || this.crawler.x >= 4250) && this.crawlerFlipped == false) {
			this.crawlerFlipped = true;
			this.crawler.body.velocity.x = -(this.crawler.body.velocity.x);
		}
		if (this.crawler.x >= 550 && this.crawler.x <= 4200) {
			this.crawlerFlipped = false;
		}
		if (crawlerTouchingCurtains) {
			this.crawler.bringToTop();
		}
		if (crawlerTouchingEye) {
			this.crawler.bringToTop();
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

/* --Helper Functions-- */
function callMonster(player, eye) {
	if(eye.animations.currentAnim.frame==0||
	eye.animations.currentAnim.frame==15||
	eye.animations.currentAnim.frame==16||
	eye.animations.currentAnim.frame==17) {
		eyeIsClosed = true;
	} else {
		eyeIsClosed = false;
	}
}
