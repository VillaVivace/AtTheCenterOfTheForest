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
	
		// Reflection is inbetween the 2 backgrounds
		this.reflection = new Player(game, 350, game.world.height - 250, 'spr_playerMonster', controls);
		this.game.add.existing(this.reflection);

		this.stageBkg1 = game.add.sprite(0, 0, 'bkg_mirrors');

		//Doors
		this.door = game.add.sprite(200, 0, 'obj_door');		
		game.physics.enable(this.door);	
		this.door.scale.x = -1;
		this.door = this.game.add.sprite(4600, 0, 'obj_door');
		game.physics.enable(this.door);
		this.door.body.immovable = true;

		this.stageBkg2 = game.add.sprite(0, 0, 'bkg_mirrorsScary');
		this.stageBkg2.alpha = 0;
		game.world.setBounds(0, 0, 4800, 600);
		
		// Bounds
		this.bounds = game.add.group();
		this.bounds.enableBody = true;
		this.bounds.alpha = 0;
		this.bound = this.bounds.create(148, 0, 'obj_bounds');
		this.bound.body.immovable = true;
		this.bound = this.bounds.create(4650, 0, 'obj_bounds');
		this.bound.body.immovable = true;
		this.reflectionbounds = game.add.group();
		this.reflectionbounds.enableBody = true;
		this.reflectionbounds.alpha = 0;
		this.bound = this.reflectionbounds.create(198, 0, 'obj_bounds');
		this.bound.body.immovable = true;
		this.bound = this.reflectionbounds.create(4700, 0, 'obj_bounds');
		this.bound.body.immovable = true;


		// Player
		this.player = new Player(game, 300, game.world.height - 200, 'spr_player', controls);
		this.game.add.existing(this.player);
		
	}, 
	update: function() {
		game.physics.arcade.collide(this.player, this.bounds);
		game.physics.arcade.collide(this.reflection, this.reflectionbounds);

		game.time.events.loop(Phaser.Timer.SECOND, scare, this);

		function scare() {
            var go = Math.random();
			if(this.stageBkg2.alpha == 0 && go > .8){
				this.stageBkg2.alpha = 1;
				return;
			}else{
				this.stageBkg2.alpha = 0;
				return;
			}
		}
	}
}