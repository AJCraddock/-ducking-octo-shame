define(
    //module definition
    function(){
        //constructor
        function Player(x, y){
            this.x = x;
            this.y = y;
            this.dx = 0;
            this.dy = 0;
            this.ddx = 0.12;
            this.MAX_DX = 5;
            this.MAX_DY = 10;
            this.width = 25;
            this.height = 25;
            this.on_ground = false;

            this.dead = false;
            this.victorious = false;
            this.touching_robot = false;
            
            this.last_render_x = 0;
            this.last_render_y = 0;

            this.grounding_object = null;
        }

        Player.prototype = {
            constructor: Player,

            update: function(){
                this.x += this.dx;
                this.y += this.dy;
            },

            clear_old: function(graphics){
                graphics.clearRect(this.last_render_x-2, this.last_render_y-2, 
                this.width+4, this.height+4);
            },

            draw: function(graphics, canvas){
                graphics.fillStyle = '#FF0000';
                var player_draw_x = (canvas.width/2)-(this.width/2);
                graphics.fillRect(player_draw_x, this.y, this.width, this.height);
                this.last_render_x = player_draw_x;
                this.last_render_y = this.y;
            }
        };

        return Player;
    }
);