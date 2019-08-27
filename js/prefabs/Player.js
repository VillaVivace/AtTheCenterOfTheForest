function Player(game, x, y, key, controls) {
	// new Sprite(game, x, y, key, frame);
	this.playerSprite = Phaser.Sprite.call(this, game, x, y, key, 0);
	
	/* --Variable Declaration-- */
	this.controls = controls;
	this.state = 'normal';
	this.direction = 1;
	this.speed = 200;
	
	/* --Player properties-- */
	game.physics.enable(this);
	this.body.setSize(50, 200, 50);
	this.body.collideWorldBounds = true;
	this.body.gravity.y = 0;
	this.anchor.set(0.5, 0.5);
	this.scale.setTo(this.direction, this.direction);
	this.animations.add('walk', Phaser.Animation.generateFrameNames('walk', 0, 7), 8, true);
	this.animations.add('idle', ['still']);
	this.animations.add('hide', ['crouch']);

	/* --Footsteps-- */
	var footstep = function() {
		var randStep = Math.random();
		var stepSound;
		if ((controls.left.isDown || controls.right.isDown) && this.state == 'normal') {
			if (randStep < 0.5) {
				stepSound = game.add.audio('snd_footstep1');
			} else {
				stepSound = game.add.audio('snd_footstep2');
			}
			stepSound.play('', 0, 0.5, false, false);
		}
	}
	this.stepTimer = game.time.create(false);
	this.stepTimer.loop(500, footstep, this);
	this.stepTimer.start();

	/* --Camera-- */
	game.camera.follow(this, '', 0.25, 0.25);
	game.camera.deadzone = new Phaser.Rectangle(game.camera.width/2, 0, 0, game.world.height);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.create = function() {}

Player.prototype.update = function() {
		
		switch(this.state) {
  			case 'normal':
				// if (controls.space.isDown) {
				// 	console.log(this.x);
				// }
				this.alpha = 1;
				this.body.velocity.x = 0;
				this.scale.x = this.direction;
				if (controls.left.isDown) { // Move player left
					this.animations.play('walk');
					this.direction = -1;
					this.body.velocity.x = -this.speed;
				}
				else if (controls.right.isDown) { // Move player right
					this.animations.play('walk');
					this.direction = 1;
					this.body.velocity.x = this.speed;
				}
				else {
					this.animations.play('idle');
				}
				/* if (controls.shift.isDown) {
					this.speed = 800;
				} else {
					this.speed = 200;
				} */
			break;
			
			case 'cutscene':
				this.body.velocity.x = 0;
				this.animations.play('idle');
			break;

			case 'hidden':
				this.body.velocity.x = 0;
				this.animations.play('hide');
				this.alpha = 0.5;
				if (controls.space.upDuration(50)) {
					this.bringToTop();
					this.state = 'normal';
				}
			break;
  			default:
    		
		}
}

Player.prototype.changeState = function(state) {
	this.state = state;
}

Player.prototype.getState = function() {
	return this.state;
}