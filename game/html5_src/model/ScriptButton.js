define(
    // dependencies
    [],

    // class definition
    function(){
        function ScriptButton(x, y, type, time){
            this.x = x;
            this.y = y;
            this.type = type;
            this.time = time;

            this.width = 150;
            this.height = 50;

            this.image = document.createElement('canvas');
            this.image.width = this.width;
            this.image.height = this.height;
            var temp_graphics = this.image.getContext('2d');
            temp_graphics.fillStyle = "#0000FF";
            temp_graphics.fillRect(0, 0, this.width, this.height);

            temp_graphics.fillStyle = "#FFFFFF";
            temp_graphics.font = "18px Colibri";
            temp_graphics.textAlign = "center";

            if(type != "Jump"){
                temp_graphics.fillText(type + ": " + time + " seconds", this.image.width/2, this.image.height/2);
            }else{
                temp_graphics.fillText(type, this.image.width/2, this.image.height/2);
            }
        }

        ScriptButton.prototype = {
            constructor: ScriptButton,

            clear_old: function(graphics){
                graphics.clearRect(this.last_render_x-2, this.last_render_y-2, 
                this.width+4, this.height+4);
            },

            draw: function(graphics){
                var object_draw_x = this.x;
                graphics.drawImage(this.image, object_draw_x, this.y);                
                
                this.last_render_x = object_draw_x;
                this.last_render_y = this.y;
            }
        };

        return ScriptButton;
    }
);