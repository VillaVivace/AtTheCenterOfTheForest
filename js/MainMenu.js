var MainMenu = function(game) {
	this.titleAudio;
	this.transitionTimer;
	this.playButton;
	this.loadButton;
};
MainMenu.prototype = {
	preload: function() {
		console.log('MainMenu: preload');
		// preload our assets
		
		
	},
	create: function() {
		console.log('MainMenu: create');
		game.camera.flash(0x000000, 1000);
		this.game.scale.setGameSize(800, 600);
		this.titleAudio = game.add.audio('snd_title');
		this.titleAudio.volume = 0.25;
		this.titleAudio.fadeIn(2000);

		// Add in title image
		this.titleScreen = game.add.sprite(0, 0, 'bkg_titleScreen'); //The title screen is animated
		this.titleScreen.animations.add('title', Phaser.Animation.generateFrameNames('titleScreen', 0, 19), 10, true);
		this.titleScreen.animations.play('title');
		// Add in load/play buttons
		this.playButton = game.add.button(350, 450, 'gui_icons', null, this, 
							'playHover', 'play', 'playHover');
		this.loadButton = game.add.button(550, 450, 'gui_icons', null, this, 
							'loadHover', 'load', 'loadHover');					

		var goToStage1 = function() {
			game.state.start('GroundLevelOutside');
		};
		var playUp = function() {
			this.game.camera.fade(0x000000, 1000);
			this.titleAudio.fadeOut(1000);
			this.transitionTimer.start();
		};
		this.playButton.onInputUp.add(playUp, this);
		this.transitionTimer = game.time.create(false);
    	this.transitionTimer.add(1000, goToStage1, this, true); 
	}, 
	update: function() {
		// Main Menu logic
	}
}