define(
    //dependencies
    ['model/VolatileObject'],
    
    //module definition
    function(){
        //constructor
        function GoalPlatform(x, y){
            this.x = x;
            this.y = y;
            this.width = 80;
            this.height = 20;
        }

        GoalPlatform.prototype = VolatileObject.prototype;

        GoalPlatform.prototype.constructor = GoalPlatform;

        GoalPlatform.prototype.on_collide = function(engine){
            engine.victory = true;
        };

        GoalPlatform.prototype.draw = function(graphics, screen_x){
            graphics.fillStyle = "#0000FF";
            var object_draw_x = this.x-screen_x;
            graphics.fillRect(object_draw_x, this.y, this.width, this.height);                
            
            this.last_render_x = object_draw_x;
            this.last_render_y = this.y;
        };

        return GoalPlatform;
    }
);