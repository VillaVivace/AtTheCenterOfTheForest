var Boot = function(game) {
    this.audio;
};
Boot.prototype = {
	preload: function() {
		console.log('Boot: preload');
		/* --Music-- */
		this.game.load.audio('snd_title', 'assets/audio/Title Screen.mp3');
		this.game.load.audio('snd_anxiety', 'assets/audio/Anxiety.mp3');
		/* --UI-- */
		this.game.load.atlas('gui_eyeLogo', 'assets/img/eyeLogo.png', 'assets/json/eyeLogo.json');
	},
	create: function() {
		console.log('Boot: create');
		this.game.scale.pageAlignHorizontally = true; // Allows the game to be centered on webpage!
		this.game.scale.pageAlignVertically = true;
		this.game.scale.refresh();
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		this.game.stage.backgroundColor = "#000000";

		this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.ENTER]);
	
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		
		controls = game.input.keyboard.addKeys({ // Custom Keys for our game
			'space': Phaser.Keyboard.SPACEBAR,
			'left': Phaser.Keyboard.LEFT,
			'right': Phaser.Keyboard.RIGHT
		});

		var goToLogo = function() {
			game.state.start('Logo');
		};
		this.audioDecode = game.add.audio('snd_title');
		this.audioDecode.onDecoded.add(goToLogo, this);
	},
	update: function() {
		
	}
}