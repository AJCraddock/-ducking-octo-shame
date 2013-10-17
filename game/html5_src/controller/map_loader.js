define(
    //dependencies
    ['model/map', 'model/player', 'model/static_object'],

    //module definition
    function(map, player, static_object){

        //constructor
        function MapLoader(){
            //fields
            this.curr_map_index = 0;
            this.maps = new Array();

            //temporary map string
            var map_data_str =
            "Player: 80 80ENDObjects: 0 525 600 10 400 425 90 100 200 489 90 10 700 525 600 10ENDBackground: #000000";

            MapLoader.create_map(map_data_str, this.maps);
        }

        MapLoader.create_map = function(map_data_str, maps){
            map_data = map_data_str.split("END");
            
            var map_player;
            var objects = new Array();
            var background = document.createElement("canvas");

            for(var i=0; i < map_data.length; i++){
                data = map_data[i].split(" ");
                
                //parse and create player object
                if(data[0] == "Player:"){
                    var x = parseInt(data[1]);
                    var y = parseInt(data[2]);
                    map_player = new player(x, y);
                }

                //parse and create static objects
                if(data[0] == "Objects:"){
                    for(var j = 1; j < data.length;){
                        var x = parseInt(data[j]);
                        j++;
                        var y = parseInt(data[j]);
                        j++;
                        var width = parseInt(data[j]);
                        j++;
                        var height = parseInt(data[j]);
                        j++;
                        objects.push(new static_object(x, y, width, height));
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

                maps.push(new map(map_player, objects, background));
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

//OLD CODE
// //imports
// var head = document.getElementsByTagName('head')[0];
// var mapjs = document.createElement('script');
// mapjs.type = 'text/javascript';
// mapjs.src = '../model/map.js';
// head.appendChild(mapjs);

// function MapLoader(){
//     //fields
//     this.curr_map_index = 0;
//     this.maps = new Array();

//     //temporary map declarations
//     var background = document.createElement("canvas");
//     background.width = 800;
//     background.height = 600;
//     var temp_graphics = background.getContext('2d');
//     temp_graphics.fillStyle = "#000000";
//     temp_graphics.fillRect(0, 0, background.width, background.height);
//     var player = new Player(80, 80);
//     var objects = new Array();
//     objects.push(new StaticObject(0, 525, 600, 10));
//     objects.push(new StaticObject(400, 425, 90, 100));
//     objects.push(new StaticObject(200, 489, 90, 10));
    
//     this.map01 = new Map(player, objects, background);
//     this.maps.push(this.map01);

//     this.load_next_map = function(){
//         this.curr_map_index = (this.curr_map_index+1)%this.maps.length;
//         return this.maps[this.curr_map_index];
//     };
// }