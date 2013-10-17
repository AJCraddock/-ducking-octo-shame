define(
    //module definition
    function(){
        //constructor
        function StaticObject(x, y, width, height){
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }

        StaticObject.prototype = {
            constructor: StaticObject,

            clear_old: function(graphics){
                graphics.clearRect(this.last_render_x-2, this.last_render_y-2, 
                this.width+4, this.height+4);
            },

            draw: function(graphics, screen_x){
                graphics.fillStyle = "#FFFFFF";
                var object_draw_x = this.x-screen_x;
                graphics.fillRect(object_draw_x, this.y, this.width, this.height);                
                
                this.last_render_x = object_draw_x;
                this.last_render_y = this.y;
            }
        };

        return StaticObject;
    }
);