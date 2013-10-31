define(
    //dependencies
    ['controller/MapLoader', 
    'controller/PlayerController', 
    'controller/VictoryController'],

    //module definition
    function(MapLoader, PlayerController, VictoryController){
        //constructor
        function Engine(){
            this.GRAVITY = 0.4;

            this.map_loader = new MapLoader();
            this.player_controller = new PlayerController();
            this.victory_controller = new VictoryController();
            
            this.current_controller = this.player_controller;

            this.map = this.map_loader.load_next_map();

            this.mode = "game_running";
        }

        //superclass constructor
        Engine.prototype = {
            constructor: Engine,

            update: function(){
                switch(this.mode){
                    case "game_running":
                        this.game_running_mode();
                        break;
                    case "game_over":
                        this.game_over_mode();
                        break;
                    case "victory":
                        this.victory_mode();
                        break;
                }
            },

            game_running_mode: function(){
                var player = this.map.player;
                this.player_controller.handle_input(this.map.player);
                
                // update player
                this.gravity(player);
                player.update();

                // update object screen positions in map
                // may need to change this to accomodate moving objects
                this.map.update_screens();

                player.on_ground = false;

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
                        o.handle_player_collision(player);
                    }
                }

                //check for player victory and death
                if (player.y > this.map.death_height){
                    player.dead = true;
                }

                if (player.dead){
                    this.mode = "game_over";
                }

                if(player.victory){
                    this.mode = "victory";
                    this.current_controller = this.victory_controller;
                }
            },

            game_over_mode: function(){

            },

            victory_mode: function(){
                var ready = this.victory_controller.handle_input();
                if(ready){
                    //prepare the game for the next map
                    this.map = this.map_loader.load_next_map();
                    this.mode = "game_running";
                    this.current_controller = this.player_controller;
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