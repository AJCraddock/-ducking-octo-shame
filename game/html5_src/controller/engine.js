function Engine(player_controller, map){
    var GRAVITY = 0.3;
    this.player_controller = player_controller;
    this.map = map;
    this.player = map.player;

    this.update = function(){
        this.player_controller.handle_input(player);
        gravity(this.player);
        this.player.x += this.player.dx;
        this.player.y += this.player.dy;
        player.on_ground = false;
        //check for player collisions
        for(var i = 0; i < map.objects.length; i++){
            var o = map.objects[i];
            collision = check_player_collision(o);
            var temp_x, temp_y;
            var temp_on_ground;
            if(collision){
                //player is above object
                if (this.player.y < o.y){
                    temp_y = o.y-this.player.height;
                    temp_on_ground = true;
                }else{ //player is below object
                    temp_y = o.y+o.height
                    temp_on_ground = false;
                }
                if (this.player.x < o.x){
                    temp_x = o.x-this.player.width;
                }else{
                    temp_x = o.x+o.width;
                }
                //check which overlap is greater
                if(Math.abs(temp_x-player.x) < Math.abs(temp_y-player.y)){
                    player.x = temp_x;
                }else{
                    player.y = temp_y;
                    player.on_ground = temp_on_ground;
                }
            }
        }
    };

    var check_player_collision = function(object){
        //check if there is no overlap on x axis.
        if (this.player.x+this.player.width < object.x || 
            this.player.x > object.x+object.width){
            return false;
        }
        //check if there is no overlap on y axis.
        else if(this.player.y+this.player.height < object.y || 
            this.player.y > object.y+object.height){
            return false;
        }
        //if both checks fail, both axes overlap and there is a collision.
        else{
            return true;
        }
    };

    var gravity = function(object){
        if(!object.on_ground){
            object.dy += GRAVITY;
            if (object.dy > object.MAX_DY) object.dy = object.MAX_DY;
        }else{
            object.dy = 0;
        }
    };
}