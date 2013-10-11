function Player(x, y){
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.MAX_DX = 5;
    this.MAX_DY = 10;
    this.ddy = 0;
    this.MAX_DDY = 5;
    this.width = 25;
    this.height = 25;
    this.on_ground = false;


    this.draw = function(graphics){
        graphics.strokeStyle = '#FF0000';
        graphics.strokeRect(this.x, this.y, this.width, this.height);
    };
}