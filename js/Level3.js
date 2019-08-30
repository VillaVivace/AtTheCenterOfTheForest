var Level3 = function(game) {
	this.border;
	this.filter;
	this.dialogBox;
	this.text;

	this.bounds;

	this.stageBkg;
	this.stageBkg1;
	this.stageBkg2;

	this.player;
	this.reflection;

	this.leftDoor;
	this.lockSoundTriggered = false;
	this.progress;
	this.roarVolume;
	this.scaryAlpha;

	this.hopeMusic;
	this.despairMusic;
	this.musicStarted = false;
};
Level3.prototype = {
	preload: function() {
		console.log('Level3: preload');		
	},
	create: function() {
		console.log('Level3: create');
		localStorage.setItem('level', 'Level3');

		game.camera.flash(0x000000, 1000);


		this.stageBkg = game.add.sprite(0, 0, 'atlas', 'background_levelLong');
		this.hopeMusic = game.add.audio('snd_hope');
		this.despairMusic = game.add.audio('snd_despair');
		this.despairMusic.play('', 0, 0.35, true);
	
		// Reflection is inbetween the 2 backgrounds
		this.reflection = new Player(game, 350, game.world.height - 250, 'spr_playerMonster', controls);
		this.game.add.existing(this.reflection);
		this.reflection.changeState('level3');

		this.stageBkg1 = game.add.sprite(0, 0, 'bkg_mirrors');

		//Doors
		this.leftDoor = game.add.sprite(200, 0, 'atlas', 'obj_door');		
		game.physics.enable(this.leftDoor);	
		this.leftDoor.scale.x = -1;
		this.door = this.game.add.sprite(4600, 0, 'atlas', 'obj_door');
		game.physics.enable(this.door);
		this.door.body.immovable = true;

		this.stageBkg2 = game.add.sprite(0, 0, 'bkg_mirrorsScary');
		this.stageBkg2.alpha = 0;
		game.world.setBounds(0, 0, 4800, 600);
		
		// Bounds
		this.bounds = game.add.group();
		this.bounds.enableBody = true;
		this.bounds.alpha = 0;
		this.bound = this.bounds.create(148, 0, 'atlas', 'obj_bounds');
		this.bound.body.immovable = true;
		this.bound = this.bounds.create(4650, 0, 'atlas', 'obj_bounds');
		this.bound.body.immovable = true;
		this.reflectionbounds = game.add.group();
		this.reflectionbounds.enableBody = true;
		this.reflectionbounds.alpha = 0;
		this.bound = this.reflectionbounds.create(198, 0, 'atlas', 'obj_bounds');
		this.bound.body.immovable = true;
		this.bound = this.reflectionbounds.create(4700, 0, 'atlas', 'obj_bounds');
		this.bound.body.immovable = true;


		// Player
		this.player = new Player(game, 300, game.world.height - 200, 'spr_player', controls);
		this.game.add.existing(this.player);
		this.player.changeState('level3');

		// Make the background change every 3 second
		game.time.events.loop(Phaser.Timer.SECOND*3, scare, this);
		function scare() {
			if(this.stageBkg2.alpha == 0){
				if (this.roarVolume >= 0.33) {
					this.roarVolume = 0.33;
				} else if (this.roarVolume <= 0) {
					this.roarVolume = 0;
				}
				game.add.audio('snd_roar').play('', 0, this.roarVolume, false, false);
				if (this.progress <= 0.95) {
					game.camera.shake(0.01, 3000);
				}
				this.stageBkg2.alpha = this.scaryAlpha;
				return;
			}else{
				this.stageBkg2.alpha = 0;
				return;
			}
		}
		game.time.events.loop(Phaser.Timer.SECOND*1, musicCross, this);
		function musicCross() {
			if (this.progress >= 0.95) {
				if (this.musicStarted == false) {
					this.musicStarted = true;
					this.despairMusic.fadeOut();
					this.hopeMusic.play('', 0, 0.1, true)
					this.hopeMusic.fadeTo(1000, 0.5);
				}
			}
		}
		

		this.filter = game.add.sprite(0, 0, 'atlas', 'gui_filter');
		this.filter.scale.setTo(1, 1);
		this.border = game.add.sprite(0, 0, 'atlas', 'gui_border');
		this.border.scale.setTo(1, 1);

		function goToCredits() {
			game.state.start('credits');
		}
		this.transitionTimer = game.time.create(false);
		this.transitionTimer.add(10000, goToCredits, this);
	}, 
	update: function() {
		game.physics.arcade.collide(this.player, this.bounds);
		game.physics.arcade.collide(this.reflection, this.reflectionbounds);
		var touchedLeftDoor = game.physics.arcade.overlap(this.player, this.leftDoor);
		var touchedDoor = game.physics.arcade.overlap(this.player, this.door);

		this.progress = this.player.x / 4400;
		this.roarVolume = 1 - this.progress;
		this.scaryAlpha = 1 - this.progress;
		

		if (!touchedLeftDoor) {
			this.lockSoundTriggered = false;
		}
		if (touchedLeftDoor && this.lockSoundTriggered == false) {
			this.lockSoundTriggered = true;
			game.add.audio('snd_doorLocked').play('', 0, 0.2, false, false);
		}

		if (controls.space.justDown && touchedDoor) {
			this.player.changeState('cutscene');
			game.camera.fade(0xFFFFFF, 10000);
			game.add.audio('snd_door').play('', 0, 0.05, false, false);
			this.transitionTimer.start();
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

var credits = function(game){
	this.credits;

};

credits.prototype = {
	create: function(){
		game.world.setBounds(0, 0, 800, 600);
		game.camera.flash(0xFFFFFF, 3000);
		game.stage.backgroundColor = '#000000';

		var style1 = { font: "32px Nothing You Could Do", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle"};
		var style2 = { font: "16px Nothing You Could Do", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle"};
		this.credits = game.add.text(0, 0, "Credits", style1);
		this.credits.setTextBounds(0, game.world.height/4, game.world.width, 32);
		this.credits = game.add.text(0, 0, "-Art- \n Crystal Yu \n\n -Programming-" + 
		"\n Dominic Villa \n Noah Lu \n\n - Sound- \n Dominic Villa \n\n" +
		"-Level Design- \n Noah Lu", style2);
		this.credits.setTextBounds(0, game.world.height/2 + 40, game.world.width, 16);

		function goToMain() {
			game.state.start('MainMenu');
		}
		this.transitionTimer = game.time.create(false);
		this.transitionTimer.add(5000, goToMain, this);
	},
	update: function(){
		if (controls.space.justDown) {
			game.camera.fade(0x000000, 5000);
			this.transitionTimer.start();
		}
	}
}