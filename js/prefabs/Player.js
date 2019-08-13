function Player(game, key, controls) {
	// new Sprite(game, x, y, key, frame);
	this.playerSprite = Phaser.Sprite.call(this, game, 0, 0, key, 0);
	
	/* --Player properties-- */
	this.anchor.set(0);
	game.physics.enable(this);
	this.body.collideWorldBounds = true;
	this.body.gravity.y = 980;
	
	/* --Variable Declaration-- */
	this.controls = controls;
	this.state = 'normal';
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.create = function() {
}

Player.prototype.update = function() {
	
		switch(this.state) {
  			case 'normal':
	    		this.body.velocity.x = 0; // Reset the player's x-velocity to 0 when left/right is not pressed
				this.alpha = 1;
				this.body.moves = true;
				
				if (this.controls.left.isDown) { // Move player left
					this.body.velocity.x = -150;
				}
				else if (this.controls.right.isDown) { // Move player right
					this.body.velocity.x = 150;
				}
				if (this.controls.up.justDown) { // If Player is colliding with the ground/platforms, allow them to jump
					this.body.velocity.y = -400;
				}
				if (this.controls.space.justDown) {
					console.log('SPACE is Pressed');
					this.state = 'hidden';
					this.y -= 8;
				}
    		break;
    		
  			case 'hidden':
    			this.body.velocity.x = 0; // Reset the player's x-velocity to 0 when left/right is not pressed
				this.alpha = 0.5;
				this.body.moves = false;
				
				if (this.controls.left.isDown) { // Move player left
					this.x -= 0.75;
				}
				else if (this.controls.right.isDown) { // Move player right
					this.x += 0.75;
				}
				if (this.eKey.justDown) {
					console.log('E is Pressed');
					this.state = 'normal';
				}
    		break;
    		
  			default:
    		
		}
}