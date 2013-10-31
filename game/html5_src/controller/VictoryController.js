define(
    //dependencies
    ['controller/Controller'],

    //module definition
    function(Controller){
        function VictoryController(){
            Controller.prototype.constructor.call(this);
        }

        VictoryController.prototype = new Controller();
        VictoryController.prototype.constructor = VictoryController;

        VictoryController.prototype.handle_input = function(){
            if(this.keys_down.A || this.keys_down.D || this.keys_down.SPACE){
                return true;
            }
            return false;
        };

        return VictoryController;
    }
);