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

            var maps_json_str = 
            "[\
            {\
                'Player': {'x':80, 'y':80},\
                'GameObjects':\
                [\
                    {'type':'GoalPlatform', 'x':3500, 'y':525},\
                    {'type':'Mechanism', 'x':31, 'y':525, 'width':300, 'height':100, 'cycles_to_goal':200, 'goals':[\
                            {'x':31, 'y':200}\
                        ]\
                    },\
                    {},\
                    {},\
                    {}\
                ],\
                'Background': 000000\
            }\
            ]"

            //temporary map string
            var map_data_str =
            "Player: 80 80" +
            "END"+
            "GameObjects: " +
            "GoalPlatform 3500 525 " + 
            "GameObject 0 0 30 600 " + 
            "Mechanism 31 525 300 100 200 1 31 200 " + 
            "Mechanism 400 225 90 100 200 1 400 525 " + 
            "Mechanism 700 525 600 100 200 1 700 100 " +
            "Mechanism 1400 100 600 10 200 1 1400 525 " +
            "GameObject 2100 525 600 10 " +
            "Mechanism 2800 525 100 10 200 1 3300 525" +
            "END" +
            "Background: 000000"+
            "ENDMAP" +
            "Player: 80 80" +
            "END"+
            "GameObjects: " +
            "GoalPlatform 3500 525 " + 
            "GameObject 0 0 30 600 " + 
            "GameObject 0 525 600 10 " + 
            "GameObject 400 425 90 100 " + 
            "GameObject 200 489 90 10 " + 
            "GameObject 700 525 600 10 " +
            "GameObject 1400 525 600 10 " +
            "GameObject 2100 525 600 10 " +
            "GameObject 2800 525 600 10 " +
            "Mechanism 900 525 50 10 200 1 900 200" +
            "END" +
            "Background: 000000"+
            "ENDMAP" +
            "Player: 80 80" +
            "END"+
            "GameObjects: " +
            "GoalPlatform 3500 100 " +
            "GameObject 3400 200 30 10 " +
            "GameObject 3320 300 30 10 " +
            "GameObject 3260 400 30 10 " +
            "GameObject 0 0 30 600 " + 
            "GameObject 0 525 600 10 " + 
            "GameObject 400 425 90 100 " + 
            "GameObject 200 489 90 10 " + 
            "GameObject 700 525 600 10 " +
            "GameObject 1400 525 600 10 " +
            "GameObject 1450 525 30 100 " +
            "GameObject 2100 525 600 10 " +
            "GameObject 2800 525 600 10 " +
            "Mechanism 3200 525 50 10 200 1 3200 200" +
            "END" +
            "Background: 000000";

            this.maps = JSON.parse(maps_json_str);
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
                        game_objects.push(new Mechanism(game_object.x, game_object.y, game_object.width, game_object.height, game_object.cycles_to_goal, game_object.goals));
                        break;
                    case 'GoalPlatform':
                        game_objects.push(new GoalPlatform(game_object.x, game_object.y));
                        break;
                }
            }

            var player = new Player(map_json.Player.x, map_json.Player.y);

            return new Map(player, game_objects, )
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