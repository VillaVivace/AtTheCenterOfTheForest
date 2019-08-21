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
		
		titleAudio.fadeTo(2000, 0.25);

		// Add in title image
		this.titleScreen = game.add.sprite(0, 0, 'bkg_titleScreen'); //The title screen is animated
		this.titleScreen.x = game.world.width/2 - this.titleScreen.width/2
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
			titleAudio.fadeOut(1000);
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