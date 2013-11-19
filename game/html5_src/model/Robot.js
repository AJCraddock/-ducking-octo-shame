define(
    // dependencies
    ['model/GameObject'],

    // class definition
    function(GameObject){
        function Robot(x, y, sprite_sheet){
            GameObject.prototype.constructor.call(this, x, y, 50, 35);

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

            this.forward_sprites = new Array();
            this.backward_sprites = new Array();
            this.jumping_sprites = new Array();

            // var sprite_sheet = new Image();
            // sprite_sheet.src = '../resources/images/bill_sprite_sheet.png';
            sprite_sheet.onload = function(){
                var sprite_sheet_canvas = document.createElement('canvas');
                sprite_sheet_canvas.width = 3072;
                sprite_sheet_canvas.height = 1024;
                var ctx = sprite_sheet_canvas.getContext('2d');
                ctx.drawImage(sprite_sheet, 0, 0);
                var images = new Array();
                var frame_width = 3072/24;
                var frame_height = 1024/8;

                for(var i = 0; i < 24; i++){
                    for(var j = 0; j < 8; j++){
                        images.push(ctx.getImageData(frame_width*i, frame_height*j, frame_width, frame_height));
                    }
                }

                for(var i = 0; i < 12; i++){
                    this.backward_sprites.push(images[i]);
                }

                for(var i = 96; i < 96+12; i++){
                    this.forward_sprites.push(images[i]);
                }
            };
            
            this.curr_sprite_array = this.forward_sprites;
            this.curr_sprite_index = 0;
            this.image = this.curr_sprite_array[this.curr_sprite_index];

            console.log(this.image);

            // var temp_graphics = this.image.getContext('2d');
            // temp_graphics.fillStyle = "#006060";
            // temp_graphics.fillRect(0, 0, this.width, this.height);
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
                this.curr_sprite_index = 0;
            }else if(this.standing_order == "backward"){
                this.dx = robot_dx_zero - this.MAX_DX;
                this.curr_sprite_array = this.backward_sprites;
                this.curr_sprite_index = (curr_sprite_index+1)%curr_sprite_array.length;
            }else if(this.standing_order == "forward"){
                this.dx = robot_dx_zero + this.MAX_DX;
                this.curr_sprite_array = this.forward_sprites;
                this.curr_sprite_index = (curr_sprite_index+1)%curr_sprite_array.length;
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

            this.x += this.dx;
            this.y += this.dy;
        };

        Robot.prototype.draw = function(graphics, screen_x){
            var object_draw_x = this.x-screen_x;
            graphics.putImageData(this.image, object_draw_x, this.y);                
            
            this.last_render_x = object_draw_x;
            this.last_render_y = this.y;
        };

        return Robot;
    }
);
