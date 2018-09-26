ig.module(
    'game.entities.mysteryBox'
)
.requires(
    'impact.entity',
    'game.entities.mario',
)
.defines(function(){
    
    EntityMysteryBox = ig.Entity.extend({

        collides: ig.Entity.COLLIDES.FIXED,

        size: {x: 16, y: 16},
        gravityFactor: 0,
        pushed: false,
        player: null,
        lastPos: null,
        animSheet: new ig.AnimationSheet('media/mysteryBox.png', 16, 16),

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            
            this.lastPos = this.pos.y;
            this.addAnim('normal', 0.17, [0,1,2,1,0]);
            this.addAnim('pushed', 1, [3]);
        },
        
        update: function() {
            this.parent();
            if (!this.pushed) {
                this.currentAnim = this.anims.normal;
            } else {
                this.currentAnim = this.anims.pushed;
            }
        },
        //TODO: finish colliding mario with the box
        collideWith: function(other, x) {
            //TODO: improve the resetting of the block... somehow
            //apparently the box is never back to its original position so this is a quick hack
            if (this.pos.y != this.lastPos) {
                console.log('fixing block position');
                this.pos.y = this.lastPos;
            }
            if (this.pushed) {return}
            
            this.player = ig.game.getEntitiesByType(EntityMario)[0];
            //if mario's x pos is less than the box's x pos then push the block
            if (this.player.pos.y - 8 > this.pos.y) {
                this.vel.y = -80;
                setTimeout(function() {
                    this.vel.y = 80;
                    setTimeout(function() {
                        this.vel.y = 0
                    }.bind(this), 50)
                }.bind(this), 50);
            }

            this.pushed = true;
        }
    })
})