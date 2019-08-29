var Boot = function(game) {
    this.audio;
};
Boot.prototype = {
	preload: function() {
		console.log('Boot: preload');
		/* --Music-- */
		this.game.load.audio('snd_title', 'assets/audio/Its Over.mp3');
		this.game.load.audio('snd_anxiety', 'assets/audio/Anxiety.mp3');
		this.game.load.audio('snd_level1', 'assets/audio/Level 1.mp3');
		this.game.load.audio('snd_level2', 'assets/audio/Dinner Music.mp3');
		/* --UI-- */
		this.game.load.atlas('gui_eyeLogo', 'assets/img/eyeLogo.png', 'assets/json/eyeLogo.json');
	},
	create: function() {
		console.log('Boot: create');
		//physics
		game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		
		// Allows the game to be centered on webpage!
		this.game.scale.pageAlignHorizontally = true; 
		this.game.scale.pageAlignVertically = true;
		this.game.scale.refresh();
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;		
		
		//background
		this.game.stage.backgroundColor = "#000000";
		
		//Keyboard input
		this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.ENTER]);			
		controls = game.input.keyboard.addKeys({ // Custom Keys for our game
			'shift': Phaser.Keyboard.SHIFT,
			'space': Phaser.Keyboard.SPACEBAR,
			'left': Phaser.Keyboard.LEFT,
			'right': Phaser.Keyboard.RIGHT,
			'up': Phaser.Keyboard.UP,
			'down': Phaser.Keyboard.DOWN,
			'num1': Phaser.Keyboard.ONE,
			'num2': Phaser.Keyboard.TWO
		});

		var goToLogo = function() {
			game.state.start('Logo');
		};
		
		//background music
		this.audioDecode = game.add.audio('snd_title');
		this.audioDecode.onDecoded.add(goToLogo, this);
	},
	update: function() {
		
	}
}
