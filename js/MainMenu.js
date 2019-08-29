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
		
		//audio
		game.sound.stopAll();
		titleAudio = game.add.audio('snd_title');
		titleAudio.play('', 0, 0.05, true, true);
		game.camera.flash(0x000000, 1000);
		titleAudio.fadeTo(2000, 0.25);

		// Add in title image
		this.titleScreen = game.add.sprite(game.camera.width/2 - 400, 0, 'bkg_titleScreen'); //The title screen is animated
		this.titleScreen.anchor.set(0, 0);
		this.titleScreen.animations.add('title', Phaser.Animation.generateFrameNames('titleScreen', 0, 19), 10, true);
		this.titleScreen.animations.play('title');
		
		// Add in load/play buttons
		this.playButton = game.add.button(450, 450, 'gui_icons', null, this, 
							'playHover', 'play', 'playHover');
		this.loadButton = game.add.button(650, 450, 'gui_icons', null, this, 
							'loadHover', 'load', 'loadHover');	
		//save/load system					
		var level = localStorage.getItem('level');
		if (level === null) { 
			localStorage.setItem('level', 'GroundLevelOutside');
			level = localStorage.getItem('level');
		}

		var goToStage1 = function() {
			game.state.start('GroundLevelOutside');
		};
		var goToLoadStage = function() {
			game.sound.stopAll();
			game.state.start(level, true, false, 200, game.world.height - 200, false);
		};
		var playUp = function() {
			this.game.camera.fade(0x000000, 1000);
			titleAudio.fadeOut(1000);
			this.transitionTimer.start();
		};
		var loadUp = function() {
			this.game.camera.fade(0x000000, 1000);
			titleAudio.fadeOut(1000);
			this.transitionTimer2.start();
		};
		this.playButton.onInputUp.add(playUp, this);
		this.transitionTimer = game.time.create(false);
		this.transitionTimer.add(1000, goToStage1, this, true);
		this.loadButton.onInputUp.add(loadUp, this);
		this.transitionTimer2 = game.time.create(false);
    	this.transitionTimer2.add(1000, goToLoadStage, this, true); 
	}, 
	update: function() {
		// Main Menu logic
	}
}
