define(
    // dependencies
    ['model/GameObject'],

    // class definition
    function(GameObject){
        function Robot(x, y){
            GameObject.prototype.constructor.call(this, x, y, 25, 25);

            // create the default image for an object
            var temp_graphics = this.image.getContext('2d');
            temp_graphics.fillStyle = "#006060";
            temp_graphics.fillRect(0, 0, this.width, this.height);
        }

        Robot.prototype = new GameObject();
        Robot.prototype.constructor = Robot;

        return Robot;
    }
);