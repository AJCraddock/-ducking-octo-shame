define(
    //dependencies
    ['controller/Controller'],

    //module definition
    function(Controller){
        function PressAnythingController(){
            Controller.prototype.constructor.call(this);
        }

        PressAnythingController.prototype = new Controller();
        PressAnythingController.prototype.constructor = PressAnythingController;

        PressAnythingController.prototype.handle_input = function(){
            if(this.keys_down.A || this.keys_down.D || this.keys_down.SPACE){
                return true;
            }
            return false;
        };

        return PressAnythingController;
    }
);