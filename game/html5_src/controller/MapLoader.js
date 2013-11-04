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

            //temporary map string
            var map_data_str =
            "Player: 80 80" +
            "END"+
            "GameObjects: " +
            "GoalPlatform 3500 525 " + 
            "GameObject 0 0 30 600 " + 
            "Mechanism 31 525 300 100 2 1 31 200 " + 
            "Mechanism 400 225 90 100 2 1 400 525 " + 
            "Mechanism 700 525 600 100 2 1 700 100 " +
            "Mechanism 1400 100 600 10 2 1 1400 525 " +
            "GameObject 2100 525 600 10 " +
            "Mechanism 2800 525 100 10 2 1 3300 525" +
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
            "Mechanism 900 525 50 10 1 1 900 200" +
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
            "Mechanism 3200 525 50 10 3 1 3200 200" +
            "END" +
            "Background: 000000";

            this.maps = MapLoader.create_map_strings(map_data_str);
        }

        MapLoader.create_map_strings = function(map_data_str){
            return map_data_str.split("ENDMAP");
        }

        MapLoader.create_map = function(map_str){
            var map_data = map_str.split("END");
            
            var player;
            var objects = new Array();
            var background = document.createElement("canvas");

            for(var j=0; j < map_data.length; j++){
                var regex = /\W+/;
                data = map_data[j].split(regex);
                //parse and create player object
                if(data[0] == "Player"){
                    var x = parseInt(data[1]);
                    var y = parseInt(data[2]);
                    player = new Player(x, y);
                }

                //parse and create static objects
                if(data[0] == "GameObjects"){
                    for(var k = 1; k < data.length;){
                        switch (data[k]){
                            case "GoalPlatform":
                                k++;
                                var x = parseInt(data[k]);
                                k++;
                                var y = parseInt(data[k]);
                                k++;
                                objects.push(new GoalPlatform(x, y));
                                break;
                            case "GameObject":
                                k++;
                                var x = parseInt(data[k]);
                                k++;
                                var y = parseInt(data[k]);
                                k++;
                                var width = parseInt(data[k]);
                                k++;
                                var height = parseInt(data[k]);
                                k++;
                                objects.push(new GameObject(x, y, width, height));
                                break;
                            case "Mechanism":
                                k++;
                                var x = parseInt(data[k]);
                                k++;
                                var y = parseInt(data[k]);
                                k++;
                                var width = parseInt(data[k]);
                                k++;
                                var height = parseInt(data[k]);
                                k++;
                                var speed = parseInt(data[k]);
                                k++;

                                // build the path
                                var path = new Array();
                                var start = new Object();
                                start.x = x;
                                start.y = y;
                                path.push(start);
                                // get the points of the path
                                var num_points = parseInt(data[k]);
                                k++;

                                while(num_points > 0){
                                    point_x = parseInt(data[k]);
                                    k++;
                                    point_y = parseInt(data[k]);
                                    k++;
                                    var point = new Object();
                                    point.x = point_x;
                                    point.y = point_y;
                                    path.push(point);
                                    num_points--;
                                }
                                objects.push(new Mechanism(x, y, width, height, speed, path, null));
                                break;
                        }
                    }
                }

                //parse and create background
                if(data[0] == "Background"){
                    background.width = 800;
                    background.height = 600;
                    var temp_graphics = background.getContext('2d');
                    temp_graphics.fillStyle = "#" + data[1];
                    temp_graphics.fillRect(0, 0, background.width, background.height);
                }
            }
            return new Map(player, objects, background);
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