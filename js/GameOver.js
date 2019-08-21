var GameOver = function(game) {};
GameOver.prototype = {
	preload: function() {
		console.log('GameOver: preload');		
	},
	create: function() {
		console.log('Gameover: create');
		
	}, 
	update: function() {
		// Game Over logic
		game.state.start('MainMenu');
	}
}