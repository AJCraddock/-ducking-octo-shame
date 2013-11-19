define(
    //dependencies
    ['model/GameObject'],
    
    //module definition
    function(){
        //constructor
        function Bullet(x, y){
            this.x = x;
            this.y = y;
            this.width = 5;
            this.height = 5;
            this.Max_Speed = 3
            var x_vector = model.player.x - this.x;
            var y_vector = model.player.y - this.y;
            var theta = Math.atan(y_vector/x_vector);
            this.dx = this.Max_Speed * Math.cos(theta);
            this.dy = this.Max_Speed * Math.sin(theta);
            this.dx *= -1;
            this.dy *= -1;
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
 //       locatePlayer: function(){
 //           model.player.
 //       }
        update: function(){
                this.x += this.dx;
                this.y += this.dy;
            },
        return Bullet;
    }
);
