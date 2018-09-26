ig.module(
    'game.entities.mario'
)
.requires(
    'impact.entity',
)
.defines(function(){

    EntityMario = ig.Entity.extend({

        collides: ig.Entity.COLLIDES.ACTIVE,
        //offset is for properly setting his collision box
        size: {x: 10, y: 16},
        offset: {x: 3.5, y: 0},
        gravityFactor: 4,
        flip: false,
        maxVel: {x: 90, y: 390},
        speed: 240,
        jump_height: 500,
        friction: {x: 400, y: 0},
        is_dead: false,

        animSheet: new ig.AnimationSheet('media/marioAni.png', 16, 16),
        

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            
            this.addAnim('idle', 1, [0]);
            this.addAnim('walk', 0.07, [1,2,3,2]);
            this.addAnim('jump', 1, [4]);
            this.addAnim('die', 1, [5]);
        },

        update: function() {
            this.currentAnim.flip.x = this.flip;
            //Handle input
            if (ig.input.state('right')) {
                this.accel.x = this.speed;
                this.flip = false;
            }
            else if (ig.input.state('left')) {
                this.accel.x = -this.speed;
                this.flip = true;
            }
            else {
                this.accel.x = 0;
            }
            if (ig.input.pressed('up') && this.standing) {
                if (this.vel.y == 0) {
                    this.vel.y -= this.jump_height;
                }
            }
            if (ig.input.state('space')) {
                this.kill();
            }
            //Handle animations
            if (this.is_dead) {
                this.currentAnim = this.anims.die;
            } else if (this.vel.y != 0 && !this.standing) {
                this.currentAnim = this.anims.jump;
            } else if (this.vel.x != 0 && this.standing) {
                this.currentAnim = this.anims.walk;
            } else {
                this.currentAnim = this.anims.idle;
            }
            
            this.parent();
        },
        
        // basic kill function
        //TODO: properly handle death
        kill: function () {

            this.vel.y = 0;
            this.is_dead = true;

            this.gravityFactor = 1.7;
            this.accel.y = 200;
            this.vel.y -= this.accel.y;
        }
    })
})