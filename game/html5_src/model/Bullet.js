define(
    //dependencies
    ['model/GameObject'],
    
    //module definition
    function(){
        //constructor
        function Bullet(x, y){
            this.x = x;
            this.y = y;
            this.dy = 10
            this.dx = 10
            this.width = 5;
            this.height = 5;
        }

        Bullet.prototype = GameObject.prototype;

        Bullet.prototype.constructor = Bullet;

        BUllet.prototype.draw = function(graphics, screen_x){
            graphics.fillStyle = "#00FF00";
            var object_draw_x = this.x-screen_x;
            graphics.fillRect(object_draw_x, this.y, this.width, this.height);                
            
            this.last_render_x = object_draw_x;
            this.last_render_y = this.y;
        };
        locatePlayer: function(){
            model.player.
        }
        update: function(){
                
                this.x += this.dx;
                this.y += this.dy;
            },
        return Bullet;
    }
);
