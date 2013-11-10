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
            temp_graphics.fillStyle = "#FFFFFF";
            temp_graphics.fillRect(0, 0, this.width, this.height);

            temp_graphics.fillStyle = "#0000FF";
            temp_graphics.font = "20px Colibri";
            temp_graphics.textAlign = "center";
            temp_graphics.fillText(type + ": " + time + " seconds", temp_canvas.width/2, temp_canvas.height/2);
        }

        ScriptButton.prototype = {
            constructor: ScriptButton,

        };

        return ScriptButton;
    }
);