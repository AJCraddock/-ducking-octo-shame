//imports
var head = document.getElementsByTagName('head')[0];

var map_loaderjs = document.createElement('script');
map_loaderjs.type = 'text/javascript';
map_loaderjs.src = 'map_loader.js';
head.appendChild(map_loaderjs);

var player_controllerjs = document.createElement('script');
player_controllerjs.type = 'text/javascript';
player_controllerjs.src = 'player_controller.js';
head.appendChild(player_controllerjs);

function Engine(){
    var GRAVITY = 0.3;

    this.map_loader = new MapLoader();
    this.player_controller = new PlayerController();
    this.map = this.map_loader.load_next_map();

    this.update = function(){
        this.player_controller.handle_input(this.map.player);
        gravity(this.map.player);
        this.map.player.x += this.map.player.dx;
        this.map.player.y += this.map.player.dy;
        this.map.player.on_ground = false;
        //check forthis.map.player collisions
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
        //this.player is above object
        if (this.map.player.y < o.y){
            temp_y = o.y-this.map.player.height;
            temp_on_ground = true;
            temp_dy = 0;
        }else{ //this.player is below object
            temp_y = o.y+o.height
            temp_on_ground = false;
            temp_dy = 0;
        }
        if (this.map.player.x < o.x){
            temp_x = o.x-this.map.player.width;
            temp_dx = 0;
        }else{
            temp_x = o.x+o.width;
            temp_dx = 0;
        }
        //check which overlap is greater
        if(Math.abs(temp_x-this.map.player.x) < Math.abs(temp_y-this.map.player.y)){
            this.map.player.x = temp_x;
            this.map.player.dx = temp_dx;
        }else{
            this.map.player.y = temp_y;
            this.map.player.on_ground = temp_on_ground;
            this.map.player.dy = temp_dy;
        }
    };

    var check_player_collision = function(object){
        //check if there is no overlap on x axis.
        if (this.map.player.x+this.map.player.width < object.x || 
            this.map.player.x > object.x+object.width){
            return false;
        }
        //check if there is no overlap on y axis.
        else if(this.map.player.y+this.map.player.height < object.y || 
            this.map.player.y > object.y+object.height){
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