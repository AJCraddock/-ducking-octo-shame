define(
    //dependencies
    ['model/Map', 'model/Player', 'model/GameObject', 
    'model/GoalPlatform', 'model/Mechanism'],

    //module definition
    function(Map, Player, GameObject, GoalPlatform, Mechanism){

        //constructor
        function MapLoader(){
            //fields
            this.curr_map_index = 0;

            this.maps = 
            [
            {
                "Player": {"x":80, "y":80},
                "GameObjects":
                [
                    {"type": "GameObject", "x":0, "y":0, "width":30, "height":600},
                    {"type":"GoalPlatform", "x":3500, "y":525},
                    {"type":"Mechanism", "x":31, "y":525, "width":300, "height":100, "cycles_to_goal":200, "goals":[
                            {"x":31, "y":200}
                        ]
                    },
                    {"type":"Mechanism", "x":400, "y":225, "width":90, "height":100, "cycles_to_goal":100, "goals":[
                            {"x":400, "y":525}
                        ]
                    },
                    {"type":"Mechanism", "x":700, "y":525, "width":600, "height":100, "cycles_to_goal":200, "goals":[
                            {"x":700, "y":100}
                        ]
                    },
                    {"type":"Mechanism", "x":1400, "y":100, "width":600, "height":10, "cycles_to_goal":200, "goals":[
                            {"x":1400, "y":525}
                        ]
                    },
                    {"type": "GameObject", "x":2100, "y":525, "width":600, "height":10},
                    {"type":"Mechanism", "x":2800, "y":525, "width":100, "height":10, "cycles_to_goal":200, "goals":[
                            {"x":3300, "y":525}
                        ]
                    },
                ],
                "Background": '#000000'
            },
            {
                "Player": {"x":80, "y":80},
                "GameObjects":
                [
                    {"type":"GoalPlatform", "x":3500, "y":525},
                    {"type": "GameObject", "x":0, "y":525, "width":600, "height":10},
                    {"type":"GameObject", "x":0, "y":0, "width":30, "height":600},
                    {"type":"Mechanism", "x":400, "y":225, "width":90, "height":100, "cycles_to_goal":100, "goals":[
                            {"x":400, "y":525}
                        ]
                    },
                    {"type":"Mechanism", "x":700, "y":525, "width":600, "height":100, "cycles_to_goal":200, "goals":[
                            {"x":700, "y":100}
                        ]
                    },
                    {"type":"Mechanism", "x":1400, "y":100, "width":600, "height":10, "cycles_to_goal":200, "goals":[
                            {"x":1400, "y":525}
                        ]
                    },
                    {"type": "GameObject", "x":2100, "y":525, "width":600, "height":10},
                    {"type":"Mechanism", "x":2800, "y":525, "width":100, "height":10, "cycles_to_goal":200, "goals":[
                            {"x":3300, "y":525}
                        ]
                    },
                ],
                "Background": '#000000'
            },
            ];

            //this.maps = JSON.parse(maps_json_str);
        }

        // maps are dictionaries of player, game objects, and background
        MapLoader.create_map = function(map_json){
            // GameObjects is a list of dictionaries representing game objects
            var json_game_objects = map_json.GameObjects;
            var game_objects = new Array();

            for(var i = 0; i < json_game_objects.length; i++){
                var game_object = json_game_objects[i];

                switch(game_object.type){
                    case 'GameObject':
                        game_objects.push(new GameObject(game_object.x, game_object.y, game_object.width, game_object.height));
                        break;
                    case 'Mechanism':
                        game_objects.push(new Mechanism(game_object.x, game_object.y, game_object.width, game_object.height, game_object.cycles_to_goal, game_object.goals, null));
                        break;
                    case 'GoalPlatform':
                        game_objects.push(new GoalPlatform(game_object.x, game_object.y));
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
            
            return new Map(player, game_objects, background);
        };

        //superclass definition
        MapLoader.prototype = {
            constructor: MapLoader,

            load_next_map: function(){
                this.curr_map_index = (this.curr_map_index+1)%this.maps.length;
                var map = MapLoader.create_map(this.maps[this.curr_map_index]);
                return map;
            },

            reset_curr_map: function(){
                var map = MapLoader.create_map(this.maps[this.curr_map_index]);
                return map;
            }
        };
        return MapLoader;
    }
);