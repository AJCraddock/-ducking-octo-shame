define(
    //dependencies
    ['model/Map', 'model/Player', 'model/GameObject', 'model/GoalPlatform'],

    //module definition
    function(Map, Player, GameObject, GoalPlatform){

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
            "0 0 30 600 " + 
            "0 525 600 10 " + 
            "400 425 90 100 " + 
            "200 489 90 10 " + 
            "700 525 600 10 " +
            "1400 525 600 10 " +
            "2100 525 600 10 " +
            "2800 525 600 10" +
            "END" +
            "Background: 000000"+
            "ENDMAP" +
            "Player: 80 80" +
            "END"+
            "GameObjects: " +
            "GoalPlatform 3500 525 " + 
            "0 0 30 600 " + 
            "0 525 600 10 " + 
            "400 425 90 100 " + 
            "200 489 90 10 " + 
            "700 525 600 10 " +
            "1400 525 600 10 " +
            "2100 525 600 10 " +
            "2800 525 600 10" +
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
                        if(data[k] == "GoalPlatform"){
                            k++;
                            var x = parseInt(data[k]);
                            k++;
                            var y = parseInt(data[k]);
                            k++;
                            objects.push(new GoalPlatform(x, y));
                            continue;
                        }
                        var x = parseInt(data[k]);
                        k++;
                        var y = parseInt(data[k]);
                        k++;
                        var width = parseInt(data[k]);
                        k++;
                        var height = parseInt(data[k]);
                        k++;
                        objects.push(new GameObject(x, y, width, height));
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
                console.log(this.maps);
                return MapLoader.create_map(this.maps[this.curr_map_index]);
            }
        };
        return MapLoader;
    }
);