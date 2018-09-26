ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',

	'game.entities.mario',
	'game.entities.goomba',
	'game.entities.mysteryBox',

	'game.levels.1-1',

	'impact.debug.debug',
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	//font: new ig.Font( 'media/04b03.font.png' ),
	gravity: 300,
	player: null,
	
	init: function() {
		// Initialize your game here; bind keys etc.
		this.loadLevel( Level11 );
		this.player = this.getEntitiesByType(EntityMario)[0];

		ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
		ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind(ig.KEY.UP_ARROW, 'up');
		ig.input.bind(ig.KEY.SPACE, 'space');
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		if (this.player) {
			this.screen.x = this.player.pos.x - ig.system.width/2;
		}

		if (this.player.pos.y > ig.system.height - 16) {
			this.player.kill();
		}
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		
		// Add your own drawing code here

	}
});


// Start the Game with 60fps, a resolution of 256x240(NES native resolution), scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 256, 240, 2.5 );

});
