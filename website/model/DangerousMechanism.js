define(
    // dependencies
    ['model/Mechanism','model/Resources'],

    // class definition
    function(Mechanism, Resources){
        function DangerousMechanism(x, y, width, height, cycles_to_goal, path, image){
            Mechanism.prototype.constructor.call(this, x, y, width, height, cycles_to_goal, path, image);
            
            var sprite_sheet = Resources.fire_sprite_sheet;
            this.sprites = new Array();

            var frame_width = 320/5;
            var frame_height = 320/5;

            this.draw_width = this.width+50;
            this.draw_height = this.height+50;
            this.draw_x_offset = (this.draw_width-this.width)/2;
            this.draw_y_offset = (this.draw_height-this.height)/2;

            for(var k = 0; k < 3; k++){
                for(var l = 0; l < 5; l++){
                    var c = document.createElement('canvas');
                    c.width = this.draw_width;
                    c.height = this.draw_height;
                    var ctx = c.getContext('2d');
                    ctx.drawImage(sprite_sheet, frame_width*k, frame_height*l, frame_width, frame_height, 0, 0, this.draw_width, this.draw_height);
                    this.sprites.push(c);
                }
            }

            for(var k = 2; k >= 0; k--){
                for(var l = 4; l >= 0; l--){
                    var c = document.createElement('canvas');
                    c.width = this.draw_width;
                    c.height = this.draw_height;
                    var ctx = c.getContext('2d');
                    ctx.drawImage(sprite_sheet, frame_width*k, frame_height*l, frame_width, frame_height, 0, 0, this.draw_width, this.draw_height);
                    this.sprites.push(c);
                }
            }

            this.curr_sprite_index = 0;
        }

        DangerousMechanism.prototype = new Mechanism();
        DangerousMechanism.prototype.constructor = DangerousMechanism;

        DangerousMechanism.prototype.update = function(){
            Mechanism.prototype.update.call(this);
            this.curr_sprite_index = (this.curr_sprite_index+0.1)%this.sprites.length;
        };

        DangerousMechanism.prototype.handle_player_collision = function(player){
            Mechanism.prototype.handle_player_collision.call(this, player);
            player.dead = true;
        };
  
        DangerousMechanism.prototype.clear_old = function(graphics){
            graphics.clearRect(this.last_render_x-2, this.last_render_y-2, this.draw_width+4, this.draw_height+4);
        };

        DangerousMechanism.prototype.draw = function(graphics, screen_x){
            //draw, adjusting for draw offset
            var draw_x = this.x - this.draw_x_offset;
            var draw_y = this.y - this.draw_y_offset;
            var object_draw_x = draw_x-screen_x;
            graphics.drawImage(this.sprites[Math.floor(this.curr_sprite_index)], Math.floor(object_draw_x), Math.floor(draw_y));                
            
            this.last_render_x = Math.floor(object_draw_x);
            this.last_render_y = Math.floor(draw_y);
        };
       
        return DangerousMechanism;
    }
);
