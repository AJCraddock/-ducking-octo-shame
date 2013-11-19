define(
    //dependencies
    ['model/Map', 'model/Maps', 'model/Player', 'model/GameObject', 
    'model/GoalPlatform', 'model/Mechanism', 'model/DangerousGameObject',
    'model/DangerousMechanism', 'model/Robot', 'model/TurretObject'],

    //module definition
    function(Map, Maps, Player, GameObject, GoalPlatform, Mechanism, DangerousGameObject, DangerousMechanism, Robot, TurretObject){

        //constructor
        function MapLoader(){
            //fields
            this.curr_map_index = 0;
        }

        // maps are dictionaries of player, game objects, and background
        MapLoader.create_map = function(map_json){
            // GameObjects is a list of dictionaries representing game objects
            var json_game_objects = map_json.GameObjects;
            var game_objects = new Array();
            var robot;

            for(var i = 0; i < json_game_objects.length; i++){
                var game_object = json_game_objects[i];

                switch(game_object.type){
                    case 'GameObject':
                        if(game_object.image == null){
                            game_objects.push(new GameObject(game_object.x, game_object.y, game_object.width, game_object.height));
                        }else{
                            // handle creating an object with a set image
                        }
                        break;
                    case 'Mechanism':
                        game_objects.push(new Mechanism(game_object.x, game_object.y, game_object.width, game_object.height, game_object.cycles_to_goal, game_object.goals, null));
                        break;
                    case 'GoalPlatform':
                        game_objects.push(new GoalPlatform(game_object.x, game_object.y));
                        break;
                    case 'DangerousGameObject':
                        game_objects.push(new DangerousGameObject(game_object.x, game_object.y, game_object.width, game_object.height));
                        break;
                    case 'DangerousMechanism':
                        game_objects.push(new DangerousMechanism(game_object.x, game_object.y, game_object.width, game_object.height, game_object.cycles_to_goal, game_object.goals, null));
                        break;
                    case 'Robot':
                        robot = new Robot(game_object.x, game_object.y);
                        game_objects.push(robot);
                        break;
                    case 'Turret':
                        turret = new TurretObject(game_object.x, game_object.y);
                        game_objects.push(turret);
                        
                        break;
                }
            }

            var player = new Player(map_json.Player.x, map_json.Player.y);
            
            var background = document.createElement('canvas');
            background.width = 800;
            background.height = 600;
            var temp_graphics = background.getContext('2d');
            temp_graphics.fillStyle = map_json.Background;
            temp_graphics.fillRect(0, 0, background.width, background.height);
            
            return new Map(player, robot, game_objects, background);
        };

        //superclass definition
        MapLoader.prototype = {
            constructor: MapLoader,

            load_next_map: function(){
                this.curr_map_index = (this.curr_map_index+1)%Maps.length;
                var map = MapLoader.create_map(Maps[this.curr_map_index]);
                return map;
            },

            reset_curr_map: function(){
                var map = MapLoader.create_map(Maps[this.curr_map_index]);
                return map;
            }
        };
        return MapLoader;
    }
);
