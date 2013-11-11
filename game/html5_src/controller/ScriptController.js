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
                robot.instructions.push({"type":'backward', "time":1});
            }else if(this.keys_down.D){
                robot.instructions.push({"type":'forward', "time":1});
            }else if(this.keys_down.Space){
                robot.instructions.push({"type":'jump'});
            }

            return false;
        };

        return ScriptController;
    }
);