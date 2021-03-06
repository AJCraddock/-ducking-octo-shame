define(
    // dependencies
    ['controller/Controller'],

    // class definition
    function(Controller){
        function ScriptController(){
            Controller.prototype.constructor.call(this);
        }

        ScriptController.prototype = new Controller();
        ScriptController.prototype.constructor = ScriptController;

        ScriptController.prototype.handle_input = function(robot){
            
            // check for the exit condition
            if(this.keys_down.Esc || this.keys_down.E){
                return true;
            }

            var last_instruction = robot.instructions[robot.instructions.length-1];

            if(this.keys_down.A){
                if(last_instruction != null && last_instruction.type == 'backward'){
                    last_instruction.time += 1;
                }else{
                    robot.instructions.push({"type":'backward', "time":1});
                }
                this.keys_down.A = false;
            }
            else if(this.keys_down.D){
                if(last_instruction != null && last_instruction.type == 'forward'){
                    last_instruction.time += 1;
                }else{
                    robot.instructions.push({"type":'forward', "time":1});
                }
                this.keys_down.D = false;
            }
            else if(this.keys_down.Space){
                robot.instructions.push({"type":'jump'});
                this.keys_down.Space = false;
            }
            else if(this.keys_down.W){
                if(last_instruction != null && last_instruction.type == 'wait'){
                    last_instruction.time += 1;
                }else{
                    robot.instructions.push({"type":'wait', "time":1});
                }
                this.keys_down.W = false;
            }
            else if(this.keys_down.Backspace){             
                if(last_instruction.time == 1 || last_instruction.type== 'jump'){                
                robot.instructions.pop();
                }else{
                last_instruction.time -= 1;
                }
                this.keys_down.Backspace = false;
            }
            else if(this.keys_down.Z){
                // issue command to move horse backward constantly
                robot.standing_order = "backward";
                this.keys_down.Z = false;
            }
            else if(this.keys_down.C){
                // issue command to move horse forward constantly
                robot.standing_order = "forward";
                this.keys_down.C = false;
            }
            else if(this.keys_down.X){
                robot.standing_order = "standby";
                this.keys_down.X = false;
            }

            return false;
        };

        return ScriptController;
    }
);
