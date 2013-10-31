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

            this.mode = "game_running";
        }

        //superclass constructor
        Engine.prototype = {
            constructor: Engine,

            update: function(){
                switch(this.mode){
                    case "game_running":
                        this.game_update();
                        break;
                }
            },

            game_update: function(){
                this.player_controller.handle_input(this.map.player);
                
                // update player
                this.gravity(this.map.player);
                this.map.player.update();

                // update object screen positions in map
                // may need to change this to accomodate moving objects
                this.map.update_screens();

                this.map.player.on_ground = false;

                // get objects that are close to player
                var nearby_objects = this.map.get_nearby_objects();

                //update game objects
                for(var i = 0; i < nearby_objects.length; i++){
                    var o = nearby_objects[i];
                    o.update();
                }

                // check for player collisions
                for(var i = 0; i < nearby_objects.length; i++){
                    var o = nearby_objects[i];
                    var collision = this.check_player_collision(o);
                    if(collision){
                        o.handle_player_collision(this.map.player);
                    }
                }

                //check for player victory and death
                if (this.map.player.y > this.map.death_height){
                    this.map.player.death = true;
                }

                if (this.map.player.death){

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