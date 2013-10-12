function PlayerController(){
    this.keys_down = {A:false, D:false, W:false, S:false, Space:false};

    this.on_keydown = function(event){
        var key = event.keyCode;
        if (key == KeyboardEvent.DOM_VK_A){
            this.keys_down.A = true;
        }else if(key == KeyboardEvent.DOM_VK_D){
            this.keys_down.D = true;
        }else if(key == KeyboardEvent.DOM_VK_SPACE){
            this.keys_down.Space = true;
        }
    };

    this.on_keyup = function(event){
        var key = event.keyCode;
        if (key == KeyboardEvent.DOM_VK_A){
            this.keys_down.A = false;
        }else if(key == KeyboardEvent.DOM_VK_D){
            this.keys_down.D = false;
        }else if(key == KeyboardEvent.DOM_VK_SPACE){
            this.keys_down.Space = false;
        }
    };

    this.handle_input = function(player){
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

    this.jump = function(player){
        if (player.on_ground){
            player.dy = 0-player.MAX_DY;
            player.on_ground = false;
        }
    };
}