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
};
Level3.prototype = {
	preload: function() {
		console.log('Level3: preload');		
	},
	create: function() {
		console.log('Level3: create');
		localStorage.setItem('level', 'Level3');

		game.camera.flash(0x000000, 1000);


		this.stageBkg = game.add.sprite(0, 0, 'bkg_levelLong');

		this.reflection = new Player(game, 350, game.world.height - 150, 'spr_playerMonster', controls);
		this.game.add.existing(this.reflection);

		this.stageBkg1 = game.add.sprite(0, 0, 'bkg_mirrors');
		this.stageBkg2 = game.add.sprite(0, 0, 'bkg_mirrorsScary');
		game.world.setBounds(0, 0, 4800, 600);

		this.reflection = new Player(game, 300, game.world.height - 200, 'spr_player', controls);
		this.game.add.existing(this.player);
		
	}, 
	update: function() {
        
	}
}