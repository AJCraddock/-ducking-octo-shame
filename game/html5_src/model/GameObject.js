define(
    //module definition
    function(){
        //constructor
        function GameObject(x, y, width, height, image=null){
            this.x = x;
            this.y = y;

            this.dx = 0;
            this.dy = 0;

            this.width = width;
            this.height = height;

            this.canvas = "fore";
            
            //create the default image for an object
            if(image == null){
                this.image = document.createElement('canvas');
                this.image.width = this.width;
                this.image.height = this.height;
                var temp_graphics = this.image.getContext('2d');
                temp_graphics.fillStyle = "#FFFFFF";
                temp_graphics.fillRect(0, 0, this.width, this.height);
            }else{
                this.image = image;
            }
        }

        GameObject.prototype = {
            constructor: GameObject,

            update: function(){
            },

            //handle collisions in a special way
            handle_player_collision: function(player){
                var temp_x, temp_y, temp_dx, temp_dy;
                var temp_on_ground = false;
                var temp_grounding_object = null;

                //this.player is above object
                if (player.y < this.y){
                    temp_y = this.y-player.height;
                    temp_on_ground = true;
                    temp_grounding_object = this;
                    temp_dy = 0;
                }else{ //this.player is below object
                    temp_y = this.y+this.height
                    temp_dy = 0.4;
                }
                if (player.x < this.x){
                    temp_x = this.x-player.width;
                    temp_dx = 0;
                }else{
                    temp_x = this.x+this.width;
                    temp_dx = 0;
                }
                //check which overlap is greater
                if(Math.abs(temp_x-player.x) < Math.abs(temp_y-player.y)){
                    player.x = temp_x;
                    player.dx = temp_dx;
                }else{
                    player.y = temp_y;
                    player.on_ground = temp_on_ground;
                    player.grounding_object = temp_grounding_object;
                    player.dy = temp_dy;
                }
            },

            clear_old: function(graphics){
                graphics.clearRect(this.last_render_x-2, this.last_render_y-2, 
                this.width+4, this.height+4);
            },

            draw: function(graphics, screen_x){
                var object_draw_x = this.x-screen_x;
                graphics.drawImage(this.image, object_draw_x, this.y);                
                
                this.last_render_x = object_draw_x;
                this.last_render_y = this.y;
            }
        };

        return GameObject;
    }
);