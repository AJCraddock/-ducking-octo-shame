define(
    // dependencies
    ['model/GameObject'],

    // class definition
    function(GameObject){
        function Robot(x, y){
            GameObject.prototype.constructor.call(this, x, y, 50, 35);

            // create the default image for an object
            var temp_graphics = this.image.getContext('2d');
            temp_graphics.fillStyle = "#006060";
            temp_graphics.fillRect(0, 0, this.width, this.height);
        }

        Robot.prototype = new GameObject();
        Robot.prototype.constructor = Robot;

        Robot.prototype.handle_player_collision = function(player){
            GameObject.prototype.handle_player_collision.call(this, player);
            player.touching_robot = true;
        };

        return Robot;
    }
);