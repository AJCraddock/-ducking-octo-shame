define(
    // dependencies
    ['model/Resources'],

    //module definition
    function(Resources){
        //constructor
        function Player(x, y){
            this.x = x;
            this.y = y;
            this.dx = 0;
            this.dy = 0;
            this.ddx = 0.10;
            this.MAX_DX = 5;
            this.MAX_DY = 10;
            this.width = 50;
            this.height = 75;
            this.on_ground = false;

            this.dead = false;
            this.victorious = false;
            this.touching_robot = false;
            this.interacting = false;
            
            this.last_render_x = 0;
            this.last_render_y = 0;

            this.sprites = {"forward":[], "backward":[], "jump":[]};

            var images = new Array();
            var frame_width = 1710/15;
            var frame_height = 124;

            var forward_sprite_sheet = Resources.player_forward_sprite_sheet;
            var backward_sprite_sheet = Resources.player_backward_sprite_sheet;

            this.draw_width = this.width;
            this.draw_height = this.height;
            this.draw_x_offset = (this.draw_width-this.width)/2;
            this.draw_y_offset = (this.draw_height-this.height)/2;
            
            for(var i = 0; i < 15; i++){
                var c = document.createElement('canvas');
                c.width = this.draw_width;
                c.height = this.draw_height;
                var ctx = c.getContext('2d');
                ctx.drawImage(backward_sprite_sheet, frame_width*i, 0, frame_width, frame_height, 0, 0, this.draw_width, this.draw_height);

                this.sprites.backward.push(c);
            }

            var frame_width = 1635/15;

            for(var i = 0; i < 15; i++){
                var c = document.createElement('canvas');
                c.width = this.draw_width;
                c.height = this.draw_height;
                var ctx = c.getContext('2d');
                ctx.drawImage(forward_sprite_sheet, frame_width*i, 0, frame_width, frame_height, 0, 0, this.draw_width, this.draw_height);

                this.sprites.forward.push(c);
            }

            this.curr_sprite_array = this.sprites.forward;
            this.curr_sprite_index = 0;

            this.grounding_object = null;
        }

        Player.prototype = {
            constructor: Player,

            update: function(dx_zero, dy_zero){
                this.x += dx_zero + this.dx;
                this.y += dy_zero + this.dy;

                if(this.dx < 0){
                    this.curr_sprite_array = this.sprites.backward;
                    this.curr_sprite_index = (this.curr_sprite_index+0.2)%this.curr_sprite_array.length;
                }else if(this.dx > 0){
                    this.curr_sprite_array = this.sprites.forward;
                    this.curr_sprite_index = (this.curr_sprite_index+0.2)%this.curr_sprite_array.length;
                }else{
                    this.curr_sprite_index = 0;
                }
            },

            clear_old: function(graphics){
                graphics.clearRect(this.last_render_x-2, this.last_render_y-2, 
                this.width+4, this.height+4);
            },

            draw: function(graphics, canvas){
                var player_draw_x = (canvas.width/2)-(this.width/2);
                graphics.drawImage(this.curr_sprite_array[Math.floor(this.curr_sprite_index)], Math.floor(player_draw_x), Math.floor(this.y));
                this.last_render_x = Math.floor(player_draw_x);
                this.last_render_y = Math.floor(this.y);
            }
        };

        return Player;
    }
);