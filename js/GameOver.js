var GameOver = function(game) {};
GameOver.prototype = {
	create: function() {
		console.log('Gameover: create');
		game.camera.flash(0xD13030, 2000);

		this.gameOver = game.add.sprite(game.camera.width/2 - 400, 0, 'atlas', 'endScreen');
		this.gameOver.anchor.set(0, 0);

		this.spaceButton = game.add.sprite(400, 480, 'gui_icons', 'space');
	}, 
	update: function() {
		// Game Over logic
		if (controls.space.justDown) {
			game.state.start('MainMenu');
		}
		
	}
}