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

        ScriptController.prototype.handle_input = function(){
            if(this.keys_down.Esc){
                return true;
            }

            return false;
        };

        return ScriptController;
    }
);