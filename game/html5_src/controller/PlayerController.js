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
                player.dx = Math.max(player.dx-player.ddx, 0-player.MAX_DX);
            }else if(this.keys_down.D){
                player.dx = Math.min(player.dx+player.ddx, player.MAX_DX);
            }else{
                if(player.dx > 0){
                    player.dx = Math.max(player.dx-player.ddx, 0);
                }else{
                    player.dx = Math.min(player.dx+player.ddx, 0);
                }
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