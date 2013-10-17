define(
    //dependencies
    [],

    //module definition
    function(){
        function PlayerController(){
            this.keys_down = {A:false, D:false, W:false, S:false, Space:false};            
        }

        var A = 65;
        var D = 68;
        var SPACE = 32;

        //superclass definition
        PlayerController.prototype = {
            constructor: PlayerController,

            on_keydown: function(event){
                var key = event.keyCode;
                if (key == A){
                    this.keys_down.A = true;
                }else if(key == D){
                    this.keys_down.D = true;
                }else if(key == SPACE){
                    this.keys_down.Space = true;
                }
            },

            on_keyup: function(event){
                var key = event.keyCode;
                if (key == A){
                    this.keys_down.A = false;
                }else if(key == D){
                    this.keys_down.D = false;
                }else if(key == SPACE){
                    this.keys_down.Space = false;
                }
            },

            handle_input: function(player){
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
            },

            jump: function(player){
                if (player.on_ground){
                    player.dy = 0-player.MAX_DY;
                    player.on_ground = false;
                }
            }
        };

        return PlayerController;
    }
);