var Level3 = function(game) {
	this.border;
	this.filter;
	this.dialogBox;
	this.text;

	this.bounds;

	this.stageBkg1;
	this.stageBkg2;
};
Level3.prototype = {
	preload: function() {
		console.log('Level3: preload');		
	},
	create: function() {
		console.log('Level3: create');
		localStorage.setItem('level', 'Level3');

		game.camera.flash(0x000000, 1000);

		this.stageBkg1 = game.add.sprite(0, 0, 'bkg_mirrors');
		this.stageBkg1 = game.add.sprite(0, 0, 'bkg_mirrorsScary');
		game.world.setBounds(0, 0, 4800, 600);
		
	}, 
	update: function() {
        
	}
}