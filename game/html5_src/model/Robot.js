define(
    // dependencies
    ['model/GameObject'],

    // class definition
    function(GameObject){
        function Robot(x, y){
            GameObject.prototype.constructor.call(this, x, y, 50, 35);

            this.instructions = new Array();
            this.standing_order = "standby";

            this.dx = 0;
            this.dy = 0;

            this.MAX_DX = 5;
            this.MAX_DY = 10;

            this.on_ground = false;
            this.grounding_object = null;

            // create the default image for an object
            var temp_graphics = this.image.getContext('2d');
            temp_graphics.fillStyle = "#006060";
            temp_graphics.fillRect(0, 0, this.width, this.height);
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

        return Robot;
    }
);