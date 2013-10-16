//imports
var head = document.getElementsByTagName('head')[0];
var mapjs = document.createElement('script');
mapjs.type = 'text/javascript';
mapjs.src = '../model/map.js';
head.appendChild(mapjs);

function MapLoader(){
    //fields
    this.curr_map_index = 0;
    this.maps = new Array();

    //temporary map declarations
    var background = document.createElement("canvas");
    background.width = 800;
    background.height = 600;
    var temp_graphics = background.getContext('2d');
    temp_graphics.fillStyle = "#000000";
    temp_graphics.fillRect(0, 0, background.width, background.height);
    var player = new Player(80, 80);
    var objects = new Array();
    objects.push(new StaticObject(0, 525, 600, 10));
    objects.push(new StaticObject(400, 425, 90, 100));
    objects.push(new StaticObject(200, 489, 90, 10));
    
    this.map01 = new Map(player, objects, background);
    this.maps.push(this.map01);
    
    // var background = document.createElement("canvas");
    // background.width = 800;
    // background.height = 600;
    // var temp_graphics = background.getContext('2d');
    // temp_graphics.fillStyle = "#000000";
    // temp_graphics.fillRect(0, 0, background.width, background.height);
    // var player = new Player(80, 80);
    // var objects = new Array();
    // objects.push(new StaticObject(0, 525, 600, 10));
    // objects.push(new StaticObject(100, 425, 90, 100));
    // objects.push(new StaticObject(500, 489, 90, 10));

    // this.map02 = new Map(player, objects, background);
    // this.maps.push(this.map02);

    this.load_next_map = function(){
        this.curr_map_index = (this.curr_map_index+1)%this.maps.length;
        return this.maps[this.curr_map_index];
    };
}