define(
    //dependencies
    ['model/Map', 'model/Player', 'model/StaticObject'],

    //module definition
    function(Map, Player, StaticObject){

        //constructor
        function MapLoader(){
            //fields
            this.curr_map_index = 0;
            this.maps = new Array();

            //temporary map string
            var map_data_str =
            "Player: 80 80" +
            "END"+
            "Objects: " + 
            "0 0 30 600 " + 
            "0 525 600 10 " + 
            "400 425 90 100 " + 
            "200 489 90 10 " + 
            "700 525 600 10" + 
            "END" + 
            "Background: #000000"+
            "ENDMAP";

            MapLoader.create_map(map_data_str, this.maps);
        }

        MapLoader.create_map = function(map_data_str, maps){
            
            map_data_arr = map_data_str.split("ENDMAP");

            for(var i = 0; i < map_data_arr.length; i++){
                map_data = map_data_arr[i].split("END");
                
                var player;
                var objects = new Array();
                var background = document.createElement("canvas");

                for(var j=0; j < map_data.length; j++){
                    data = map_data[j].split(" ");
                    
                    //parse and create player object
                    if(data[0] == "Player:"){
                        var x = parseInt(data[1]);
                        var y = parseInt(data[2]);
                        player = new Player(x, y);
                    }

                    //parse and create static objects
                    if(data[0] == "Objects:"){
                        for(var k = 1; k < data.length;){
                            var x = parseInt(data[k]);
                            k++;
                            var y = parseInt(data[k]);
                            k++;
                            var width = parseInt(data[k]);
                            k++;
                            var height = parseInt(data[k]);
                            k++;
                            objects.push(new StaticObject(x, y, width, height));
                        }
                    }

                    //parse and create background
                    if(data[0] == "Background:"){
                        background.width = 800;
                        background.height = 600;
                        var temp_graphics = background.getContext('2d');
                        temp_graphics.fillStyle = data[1];
                        temp_graphics.fillRect(0, 0, background.width, background.height);
                    }

                    maps.push(new Map(player, objects, background));
                }
            }
        };

        //superclass definition
        MapLoader.prototype = {
            constructor: MapLoader,

            load_next_map: function(){
                this.curr_map_index = (this.curr_map_index+1)%this.maps.length;
                return this.maps[this.curr_map_index];
            }
        };
        return MapLoader;
    }
);