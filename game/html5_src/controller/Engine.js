define(
    //dependencies
    ['controller/MapLoader', 'controller/PlayerController'],

    //module definition
    function(MapLoader, PlayerController){
        //constructor
        function Engine(){
            this.GRAVITY = 0.4;

            this.victory = false;

            this.map_loader = new MapLoader();
            this.player_controller = new PlayerController();
            this.map = this.map_loader.load_next_map();
        }

        //superclass constructor
        Engine.prototype = {
            constructor: Engine,

            update: function(){
                this.player_controller.handle_input(this.map.player);
                
                // move objects
                this.gravity(this.map.player);
                this.map.player.x += this.map.player.dx;
                this.map.player.y += this.map.player.dy;

                // update object screen positions in map
                this.map.update_screens();

                this.map.player.on_ground = false;

                // get objects that are close to player
                var nearby_objects = this.map.get_nearby_objects();
                // check for player collisions
                for(var i = 0; i < nearby_objects.length; i++){
                    var o = nearby_objects[i];
                    var collision = this.check_player_collision(o);
                    if(collision){
                        this.handle_player_collision(o);
                    }
                }
            },

            handle_player_collision: function(o){
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
            },

            check_player_collision: function(object){
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
            },

            gravity: function(object){
                if(!object.on_ground){
                    object.dy += this.GRAVITY;
                    if (object.dy > object.MAX_DY) object.dy = object.MAX_DY;
                }else{
                    object.dy = 0;
                }
            }
        };
        return Engine;
    }
);