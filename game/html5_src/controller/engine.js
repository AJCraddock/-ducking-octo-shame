function Engine(player_controller, map){
    var FLOOR = 500;
    var GRAVITY = 3;
    this.player_controller = player_controller;
    this.map = map;
    this.player = map.player;

    this.update = function(){
        this.player_controller.handle_input(player);
        gravity(this.player);
        this.player.x += this.player.dx;
        this.player.y += this.player.dy;
    };

    var gravity = function(object){
        if (object.y < FLOOR){
            object.dy += GRAVITY;
        }else if(object.y > FLOOR){
            object.y = FLOOR;
            object.dy = 0;
        }
    };
}