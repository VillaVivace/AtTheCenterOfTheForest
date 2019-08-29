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

		// Make the background change every 3 second
		game.time.events.loop(Phaser.Timer.SECOND*3, scare, this);
		function scare() {
			if(this.stageBkg2.alpha == 0){
				this.stageBkg2.alpha = 1;
				return;
			}else{
				this.stageBkg2.alpha = 0;
				return;
			}
		}
		
	}, 
	update: function() {
		game.physics.arcade.collide(this.player, this.bounds);
		game.physics.arcade.collide(this.reflection, this.reflectionbounds);

		var touchedDoor = game.physics.arcade.overlap(this.player, this.door);

		if (controls.space.isDown && touchedDoor) {
			game.sound.stopAll();
			game.add.audio('snd_door').play('', 0, 0.05, false, false);
			game.state.start('credits');
		}
	}
}

var credits = function(game){
	this.credits;

};

credits.prototype = {
	create: function(){
		game.world.setBounds(0, 0, 800, 600);
		game.stage.backgroundColor = '#000000';

		var style1 = { font: "32px Nothing You Could Do", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle"};
		var style2 = { font: "16px Nothing You Could Do", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle"};
		this.credits = game.add.text(0, 0, "Credits", style1);
		this.credits.setTextBounds(0, game.world.height/4, game.world.width, 32);
		this.credits = game.add.text(0, 0, "-Art- \n Crystal Yu \n\n -Programming-" + 
		"\n Dominic Villa \n Noah Lu \n\n - Sound- \n Dominic Villa \n\n" +
		"-Level Design- \n Noah Lu", style2);
		this.credits.setTextBounds(0, game.world.height/2 + 40, game.world.width, 16);
	},
	update: function(){
		if (controls.space.justDown) {
			game.state.start('MainMenu');
		}
	}
}