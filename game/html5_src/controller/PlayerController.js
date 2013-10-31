define(
    //dependencies
    ['controller/Controller'],

    //module definition
    function(Controller){
        function PlayerController(){
            Controller.prototype.constructor.call(this);            
        }

        PlayerController.prototype = new Controller();
        PlayerController.prototype.constructor = PlayerController;

        PlayerController.prototype.handle_input = function(player){
            if (this.keys_down.A){
                player.dx = 0-player.MAX_DX;
            }else if(this.keys_down.D){
                player.dx = player.MAX_DX;
            }else{
                player.dx = 0;
            }
            if (this.keys_down.Space){
                this.jump(player);
            }
        };

        PlayerController.prototype.jump = function(player){
            if (player.on_ground){
                player.dy = 0-player.MAX_DY;
                player.on_ground = false;
            }
        };

        return PlayerController;
    }
);