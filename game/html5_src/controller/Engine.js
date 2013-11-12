define(
    //dependencies
    ['controller/MapLoader', 'controller/PlayerController', 
    'controller/PressAnythingController', 'controller/ScriptController', 
    'model/ScriptButton'],

    //module definition
    function(MapLoader, PlayerController, PressAnythingController, ScriptController, ScriptButton){
        //constructor
        function Engine(){
            this.GRAVITY = 0.4;

            this.map_loader = new MapLoader();
            this.player_controller = new PlayerController();
            this.press_anything_controller = new PressAnythingController();
            this.script_controller = new ScriptController();
            
            this.current_controller = this.player_controller;

            this.map = this.map_loader.reset_curr_map();

            this.script_buttons = new Array();

            this.script_buttons.push(new ScriptButton(100, 500, "[a]: Move <"));
            this.script_buttons.push(new ScriptButton(252, 500, "[d]: Move >"));
            this.script_buttons.push(new ScriptButton(404, 500, "[Space]: Jump"));
            this.script_buttons.push(new ScriptButton(556, 500, "[w]: Wait"));

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
                    case "robot_interface":
                        this.robot_interface_mode();
                        break;
                }
            },

            game_running_mode: function(){
                var player = this.map.player;
                var robot = this.map.robot;

                this.current_controller.handle_input(player);

                // update player
                this.gravity(player);
                this.gravity(robot);

                var player_dx_zero = 0;
                var player_dy_zero = 0;
                if(player.grounding_object != null){
                    player_dx_zero = player.grounding_object.dx;
                    player_dy_zero = player.grounding_object.dy;
                }

                player.update(player_dx_zero, player_dy_zero);

                // update object screen positions in map
                // may need to change this to accomodate moving objects
                this.map.update_screens();

                // get objects that are close to player
                var nearby_objects = this.map.get_nearby_objects();

                //update game objects
                for(var i = 0; i < nearby_objects.length; i++){
                    var o = nearby_objects[i];
                    o.update();
                }

                if(robot.grounding_object != null){
                    robot.x += robot.grounding_object.dx;
                    robot.y += robot.grounding_object.dy;
                }

                player.on_ground = false;
                player.touching_robot = false;

                robot.on_ground = false;

                // check for player and robot collisions
                for(var i = 0; i < nearby_objects.length; i++){
                    var o = nearby_objects[i];
                    
                    // check player collision
                    var collision = this.check_collision(player, o);
                    if(collision){
                        o.handle_player_collision(player);
                    }

                    // check robot collision
                    if(o != robot){
                        collision = this.check_collision(robot, o);
                        if(collision){
                            o.handle_player_collision(robot);
                        }
                    }
                }

                //check for player victory and death
                if (player.y > this.map.death_height){
                    player.dead = true;
                }

                if (player.dead){
                    this.mode = "game_over";
                    this.player_controller.reset();
                    this.current_controller = this.press_anything_controller;
                }

                if(player.victory){
                    this.mode = "victory";
                    this.player_controller.reset();
                    this.current_controller = this.press_anything_controller;
                }

                if(player.touching_robot && player.interacting){
                    this.mode = "robot_interface";
                    this.current_controller.reset();
                    this.current_controller = this.script_controller;
                }
            },

            game_over_mode: function(){
                var ready = this.current_controller.handle_input();
                if(ready){
                    // player died, so return map to starting state
                    this.map = this.map_loader.reset_curr_map();
                    
                    // prepare the game for game_running mode
                    this.mode = "game_running";
                    this.press_anything_controller.reset();
                    this.current_controller = this.player_controller;
                }
            },

            victory_mode: function(){
                var ready = this.current_controller.handle_input();
                if(ready){
                    // prepare the game for the next map
                    this.map = this.map_loader.load_next_map();

                    // prepare the game for game_running mode
                    this.mode = "game_running";
                    this.press_anything_controller.reset();
                    this.current_controller = this.player_controller;
                }
            },

            robot_interface_mode: function(){
                // handle events
                var done = this.current_controller.handle_input(this.map.robot);
                if(done){
                    this.mode = "game_running";
                    this.current_controller.reset();
                    this.current_controller = this.player_controller;
                }
            },

            check_collision: function(o1, o2){
                //check if there is no overlap on x axis.
                if (o1.x+o1.width < o2.x || o1.x > o2.x+o2.width){
                    return false;
                }
                //check if there is no overlap on y axis.
                else if(o1.y+o1.height < o2.y || o1.y > o2.y+o2.height){
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