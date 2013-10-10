function Engine(controller){
    var FLOOR = 50;
    var GRAVITY = 3;
    this.controller = controller;

    //temporary object declarations
    // this.player = player;
    // this.ground = ground;

    this.update = function(){
        gravity(this.player);
        this.player.x += this.player.dx;
        this.player.y += this.player.dy;
    };

    this.prototype.gravity = function(object){
        if (object.y > FLOOR){
            object.dy -= GRAVITY;
        }else if(object.y < FLOOR){
            object.y = FLOOR;
            object.dy = 0;
        }
    };
}