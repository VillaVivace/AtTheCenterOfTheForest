var GameOver = function(game) {};
GameOver.prototype = {
	preload: function() {
		console.log('GameOver: preload');
		this.game.load.image('bkg_gameOver', 'assets/img/endScreen.png');		
	},
	create: function() {
		console.log('Gameover: create');
		this.gameOver = game.add.sprite(game.camera.width/2 - 400, 0, 'bkg_gameOver');
		this.gameOver.anchor.set(0, 0);
	}, 
	update: function() {
		// Game Over logic
		if (controls.space.justDown) {
			game.state.start('MainMenu');
		}
		
	}
}