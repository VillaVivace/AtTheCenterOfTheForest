var Logo = function(game) { 
	this.eyeLogo;
	this.eyeAnim;
	this.animFinished = false;
	this.transitionTimer;
	this.logoText;
};
Logo.prototype = {
	preload: function() {
		console.log('Logo: preload');
		/* --Backgrounds-- */
		this.game.load.atlas('bkg_titleScreen', 'assets/img/titleScreen2.png', 'assets/json/titleScreen2.json');
		this.game.load.image('bkg_mirrors', 'assets/img/mirrors.png');
		this.game.load.image('bkg_mirrorsScary', 'assets/img/mirrorScary.png');
		this.game.load.atlas('atlas', 'assets/img/atlas.png', 'assets/json/atlas.json');
		/* --GUI-- */
		this.game.load.atlas('gui_icons', 'assets/img/gui_icons.png', 'assets/json/gui_icons.json');
		/* --Player and Monsters-- */
		this.game.load.atlas('spr_player', 'assets/img/player.png', 'assets/json/player.json');
		this.game.load.atlas('spr_playerMonster', 'assets/img/playerMonster.png', 'assets/json/player.json');
		this.game.load.atlas('spr_slug', 'assets/img/slug.png', 'assets/json/slug.json');
		this.game.load.atlas('spr_crawler', 'assets/img/crawler.png', 'assets/json/crawler.json');		
		this.game.load.image('spr_kitchen', 'assets/img/spr_kitchen.png');
		this.game.load.image('spr_right', 'assets/img/spr_right.png');
		this.game.load.image('spr_left', 'assets/img/spr_left.png');		
		/* --Objects-- */
		this.game.load.atlas('obj_chandalier', 'assets/img/obj_chandalier.png','assets/json/chandalier.json');
		/* --SFX-- */
		this.game.load.audio('snd_footstep1', 'assets/audio/footstep_grass1.mp3');
		this.game.load.audio('snd_footstep2', 'assets/audio/footstep_grass2.mp3');
		this.game.load.audio('snd_door', 'assets/audio/door_open.mp3');
		this.game.load.audio('snd_pageTurn', 'assets/audio/pageTurn.mp3');
		this.game.load.audio('snd_confirm', 'assets/audio/confirm.mp3');
		this.game.load.audio('snd_screech1', 'assets/audio/screech1.mp3');
		this.game.load.audio('snd_screech2', 'assets/audio/screech2.mp3');
		this.game.load.audio('snd_slimy', 'assets/audio/slimy.mp3');
		this.game.load.audio('snd_warning', 'assets/audio/warning.mp3');
		this.game.load.audio('snd_whisper', 'assets/audio/whisper.mp3');
		this.game.load.audio('snd_doorLocked', 'assets/audio/doorLocked.mp3');
		this.game.load.audio('snd_roar', 'assets/audio/roar.mp3');
	},
	create: function() {
		console.log('Logo: create');
		
		//add eyeLogo and animation
		this.eyeLogo = this.game.add.sprite(0, game.world.height/4, 'gui_eyeLogo');
		this.eyeLogo.x = (game.world.centerX - (this.eyeLogo.width/2));
		this.eyeLogo.animations.add('eye', Phaser.Animation.generateFrameNames('frame_', 0, 18), 5, false);
		this.eyeAnim = this.eyeLogo.animations.play('eye');

		var goToMainMenu = function() {
			game.state.start('MainMenu');
		};
		
		//timer
		this.transitionTimer = game.time.create(false);
		this.transitionTimer.add(1000, goToMainMenu, this, true); 
		
		//Logo text
		var style1 = { font: "32px Nothing You Could Do", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle"};
		var style2 = { font: "16px Nothing You Could Do", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle"};
		this.logoText = game.add.text(0, 0, "Paper Ghouls", style1);
		this.logoText.setTextBounds(0, game.world.height/2, game.world.width, 32);
		this.logoText = game.add.text(0, 0, "-PRESENTS-", style2);
		this.logoText.setTextBounds(0, game.world.height/2 + 40, game.world.width, 16);
	},
	update: function() {
		
		//scene automatically fade after some time
		if (this.eyeAnim.isFinished && this.animFinished == false) {
			this.animFinished = true;
			this.game.camera.fade(0x000000, 1000);
			this.transitionTimer.start();
		} 
		
		//press space = skip animation
		if (controls.space.justDown && this.animFinished == false) {
			this.animFinished = true;
			this.game.camera.fade(0x000000, 1000);
			this.transitionTimer.start();
		}
	}
}
