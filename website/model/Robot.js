define(
    // dependencies
    ['model/GameObject', 'model/Resources'],

    // class definition
    function(GameObject, Resources){
        function Robot(x, y){
            GameObject.prototype.constructor.call(this, x, y, 80, 60);

            this.instructions = new Array();
            this.standing_order = "standby";

            this.initial_x = x;
            this.initial_y = y;
            this.dx = 0;
            this.dy = 0;
            this.fall_death = false;
            this.MAX_DX = 5;
            this.MAX_DY = 10;

            this.on_ground = false;
            this.grounding_object = null;

            this.robot_sprites = {"forward":[], "backward":[], "jump":[]};

            var images = new Array();
            var frame_width = 3072/24;
            var frame_height = 1024/8;

            var sprite_sheet = Resources.robot_sprite_sheet;

            this.draw_width = this.width+100;
            this.draw_height = this.height+100;
            this.draw_x_offset = (this.draw_width-this.width)/2;
            this.draw_y_offset = (this.draw_height-this.height)/2 + 10;
            
            for(var i = 0; i < 8; i++){
                for(var j = 0; j < 24; j++){
                    var c = document.createElement('canvas');
                    c.width = this.draw_width;
                    c.height = this.draw_height;
                    var ctx = c.getContext('2d');
                    ctx.drawImage(sprite_sheet, frame_width*j, frame_height*i, frame_width, frame_height, 0, 0, this.draw_width, this.draw_height);

                    images.push(c);
                }
            }

            var backward = this.robot_sprites.backward;
            for(var i = 3; i < 12; i++){
                backward.push(images[i]);
            }

            var forward = this.robot_sprites.forward;
            for(var i = 99; i < 108; i++){
                forward.push(images[i]);
            }        

            this.curr_sprite_array = this.robot_sprites.forward;

            this.curr_sprite_index = 0;
        }

        Robot.prototype = new GameObject();
        Robot.prototype.constructor = Robot;

        Robot.prototype.handle_player_collision = function(player){
            GameObject.prototype.handle_player_collision.call(this, player);
            player.touching_robot = true;
        };

        Robot.prototype.update = function(robot_dx_zero, robot_dy_zero){

            if(this.on_ground){
                this.dy = robot_dy_zero;
            }

            // reset the robots speed
            if(this.standing_order == "standby"){
                this.dx = robot_dx_zero;
            }else if(this.standing_order == "backward"){
                this.dx = robot_dx_zero - this.MAX_DX;
            }else if(this.standing_order == "forward"){
                this.dx = robot_dx_zero + this.MAX_DX;
            }
            
            if (this.fall_death){
                this.standing_order = "standby";
                this.x = this.initial_x;
                this.y = this.initial_y;
                this.instructions = [];
                this.fall_death = false;
            }

            if(this.instructions.length > 0){
                var curr_instr = this.instructions[0];

                switch(curr_instr.type){
                    case 'backward':
                        this.dx = robot_dx_zero - this.MAX_DX;
                        
                        if(curr_instr.time <= 0){
                            this.instructions.splice(0, 1);
                        }else{
                            curr_instr.time -= 1;
                        }
                        break;
                    case 'forward':
                        this.dx = robot_dx_zero + this.MAX_DX;

                        if(curr_instr.time <= 0){
                            this.instructions.splice(0, 1);
                        }else{
                            curr_instr.time -= 1;
                        }
                        break;
                    case 'jump':
                        if (this.on_ground){
                            this.dy = robot_dy_zero - this.MAX_DY;
                            this.on_ground = false;
                        }
                        
                        this.instructions.splice(0, 1);
                        break;
                    case 'wait':
                        if(curr_instr.time <= 0){
                            this.instructions.splice(0, 1);
                        }else{
                            curr_instr.time -= 1;
                        }
                        break;
                }
            }

            if(this.dx < 0){
                this.curr_sprite_array = this.robot_sprites.backward;
                this.curr_sprite_index = (this.curr_sprite_index+0.2)%this.curr_sprite_array.length;
            }else if(this.dx > 0){
                this.curr_sprite_array = this.robot_sprites.forward;
                this.curr_sprite_index = (this.curr_sprite_index+0.2)%this.curr_sprite_array.length;
            }else{
                this.curr_sprite_index = 0;
            }

            this.x += this.dx;
            this.y += this.dy;
        };

        Robot.prototype.clear_old = function(graphics){
            graphics.clearRect(this.last_render_x-2, this.last_render_y-2, this.draw_width+4, this.draw_height+4);
        };

        Robot.prototype.draw = function(graphics, screen_x){
            //draw, adjusting for draw offset
            var draw_x = this.x - this.draw_x_offset;
            var draw_y = this.y - this.draw_y_offset;
            var object_draw_x = draw_x-screen_x;
            graphics.drawImage(this.curr_sprite_array[Math.floor(this.curr_sprite_index)], Math.floor(object_draw_x), Math.floor(draw_y));                
            
            this.last_render_x = Math.floor(object_draw_x);
            this.last_render_y = Math.floor(draw_y);
        };

        return Robot;
    }
);
