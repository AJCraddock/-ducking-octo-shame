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
            if(this.keys_down.Esc){
                return true;
            }

            if(this.keys_down.A){
                robot.instructions.push("backward");
            }else if(this.keys_down.D){
                robot.instructions.push("forward");
            }else if(this.keys_down.Space){
                robot.instructions.push("jump");
            }else if(this.keys_down.W){
                robot.instructions.push("wait");
            }else if(this.keys_down.Backspace){
                robot.instructions.pop();
            }

            return false;
        };

        return ScriptController;
    }
);