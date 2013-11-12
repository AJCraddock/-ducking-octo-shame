define(
    // dependencies
    ['model/GameObject'],

    // class definition
    function(GameObject){
        function Robot(x, y){
            GameObject.prototype.constructor.call(this, x, y, 50, 35);

            this.instructions = new Array();
            this.instruction_index = 0;

            this.dx = 0;
            this.dy = 0;

            this.MAX_DX = 5;
            this.MAX_DY = 10;

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

        Robot.prototype.update = function(){
            if(this.instruction_index < this.instructions.length){
                var curr_instr = this.instructions[this.instruction_index];

                switch(curr_instr.type){
                    case 'backward':
                        this.dx = 0 - this.MAX_DX;
                        
                        if(curr_instr.time <= 0){
                            this.instruction_index++;
                        }else{
                            curr_instr.time -= 1;
                        }
                        break;
                    case 'forward':
                        this.dx = this.MAX_DX;

                        if(curr_instr.time <= 0){
                            this.instruction_index++;
                        }else{
                            curr_instr.time -= 1;
                        }
                        break;
                    case 'jump':
                        this.instruction_index++;
                        break;
                    case 'wait':
                        if(curr_instr.time <= 0){
                            this.instruction_index++;
                        }else{
                            curr_instr.time -= 1;
                        }
                        break;
                }

                this.x += this.dx;
                this.y += this.dy;

                this.dx = 0;
            }
        };

        return Robot;
    }
);