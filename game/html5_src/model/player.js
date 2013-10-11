function Player(x, y){
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.MAX_DX = 5;
    this.MAX_DY = 5;
    this.width = 25;
    this.height = 25;


    this.draw = function(graphics){
        graphics.strokeStyle = '#FF0000';
        graphics.strokeRect(this.x, this.y, this.width, this.height);
    };
}