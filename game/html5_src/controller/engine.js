function Engine(player_controller, map){
    var FLOOR = 500;
    var GRAVITY = 1;
    this.player_controller = player_controller;
    this.map = map;
    this.player = map.player;

    this.update = function(){
        this.player_controller.handle_input(player);
        this.player.dy += this.player.ddy;
        gravity(this.player);
        this.player.x += this.player.dx;
        this.player.y += this.player.dy;

        //check for player collisions
        for(var i = 0; i < map.objects.length; i++){
            var o = map.objects[i];

            collision = check_player_collision(o);
            if(collision){
                //player is to the left of object
                if(player.x < o.x){

                }else{ //player is to the right of object

                }
                //player is above object
                if (player.y < o.y){
                    while(player.y+player.height > o.y){
                        player.y-=1;
                    }
                    player.on_ground = true;
                }else{ //player is below object
                    while(player.y < o.y+o.height){
                        player.y+=1;
                    }
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
            if (object.ddy < 0) object.ddy += 1;
            if (object.dy > object.MAX_DY) object.dy = object.MAX_DY;
            else if (object.dy < 0-object.MAX_DY) object.dy = 0-object.MAX_DY;
        }else{
            object.dy = 0;
        }
    };
}