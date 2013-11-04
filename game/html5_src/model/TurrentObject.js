define(
    //dependencies
    ['model/GameObject'],
    
    //module definition
    function(){
        //constructor
        function TurrentObject(x, y){
            this.x = x;
            this.y = y;
            this.width = 28;
            this.height = 28;
        }

        TurrentObject.prototype = GameObject.prototype;

        TurrentObject.prototype.constructor = TurrentObject;

        TurrentObject.prototype.draw = function(graphics, screen_x){
            graphics.fillStyle = "#FF0000";
            var object_draw_x = this.x-screen_x;
            graphics.fillRect(object_draw_x, this.y, this.width, this.height);                
            
            this.last_render_x = object_draw_x;
            this.last_render_y = this.y;
        };
        function Shoot(graphics, x){
            new Bullet(this.x-10, this.y-10);
        };
        return TurrentObject;
    }
);
