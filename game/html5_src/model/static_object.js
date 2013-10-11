function StaticObject(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.draw = function(graphics){
        graphics.fillStyle = "#FFFFFF";
        graphics.fillRect(this.x, this.y, this.width, this.height);
    };
}