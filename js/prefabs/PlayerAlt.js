function PlayerAlt(game, x, y, key, controls) {
	// new Sprite(game, x, y, key, frame);
	this.playerSprite = Phaser.Sprite.call(this, game, x, y, key, 0);
	
	/* --Variable Declaration-- */
	this.controls = controls;
	this.state = 'normal';
	this.direction = 1.5;
	this.speed = 2.5;
	
	/* --Player properties-- */
	this.anchor.set(0.5, 0.5);
	this.scale.setTo(this.direction, this.direction);
	this.animations.add('walk', Phaser.Animation.generateFrameNames('walk', 1, 8), 8, true);
	this.animations.add('idle', ['still']);
	//this.animations.add('hide', ['crouch']);
}

PlayerAlt.prototype = Object.create(Phaser.Sprite.prototype);
PlayerAlt.prototype.constructor = PlayerAlt;

PlayerAlt.prototype.create = function() {
}

PlayerAlt.prototype.update = function() {
		console.log(this.x);
		switch(this.state) {
  			case 'normal':
			this.alpha = 1;
			this.scale.x = this.direction;
			if (controls.left.isDown) { // Move player left
				this.animations.play('walk');
				this.direction = -1.5;
				this.x -= this.speed;
			}
			else if (controls.right.isDown) { // Move player right
				this.animations.play('walk');
				this.direction = 1.5;
				this.x += this.speed;
			}
			else {
				this.animations.play('idle');
			}
			break;
			
			case 'cutscene':
				this.animations.play('idle');
			break;

			case 'hidden':
				this.animations.play('idle');
				this.alpha = 0.5;
				if (controls.space.upDuration(50)) {
					this.state = 'normal';
				}
			break;
  			default:
    		
		}
}

PlayerAlt.prototype.changeState = function(state) {
	this.state = state;
}

PlayerAlt.prototype.getState = function() {
	return this.state;
}