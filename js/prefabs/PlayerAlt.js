function PlayerAlt(game, x, y, key, controls) {
	// new Sprite(game, x, y, key, frame);
	this.playerSprite = Phaser.Sprite.call(this, game, x, y, key, 0);
	
	/* --Variable Declaration-- */
	this.controls = controls;
	this.state = 'normal';
	this.direction = 1;
	this.speed = 2;
	
	/* --Player properties-- */
	this.anchor.set(0.5, 0.5);
	this.scale.setTo(this.direction, this.direction);
	this.animations.add('idle', ['player_still']);
	this.animations.add('hide', ['player_crouch']);
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
				this.animations.play('idle');
				this.direction = -1;
				this.x -= this.speed;
			}
			else if (controls.right.isDown) { // Move player right
				this.animations.play('idle');
				this.direction = 1;
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
				this.animations.play('hide');
				this.alpha = 0.75;
				if (controls.enter.upDuration(50)) {
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