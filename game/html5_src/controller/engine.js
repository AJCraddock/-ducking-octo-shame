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
            var collision = check_player_collision(o);
            if(collision){
                handle_player_collision(o);
            }
        }
    };

    var handle_player_collision = function(o){
        var temp_x, temp_y, temp_dx, temp_dy;
        var temp_on_ground;
        //player is above object
        if (this.player.y < o.y){
            temp_y = o.y-this.player.height;
            temp_on_ground = true;
            temp_dy = 0;
        }else{ //player is below object
            temp_y = o.y+o.height
            temp_on_ground = false;
            temp_dy = 0;
        }
        if (this.player.x < o.x){
            temp_x = o.x-this.player.width;
            temp_dx = 0;
        }else{
            temp_x = o.x+o.width;
            temp_dx = 0;
        }
        //check which overlap is greater
        if(Math.abs(temp_x-this.player.x) < Math.abs(temp_y-this.player.y)){
            this.player.x = temp_x;
            this.player.dx = temp_dx;
        }else{
            this.player.y = temp_y;
            this.player.on_ground = temp_on_ground;
            this.player.dy = temp_dy;
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