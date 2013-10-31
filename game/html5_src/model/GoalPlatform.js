define(
    //dependencies
    ['model/GameObject'],
    
    //module definition
    function(GameObject){
        //constructor
        function GoalPlatform(x, y){
            this.x = x;
            this.y = y;
            this.width = 80;
            this.height = 20;

            this.image = document.createElement('canvas');
            this.image.width = this.width;
            this.image.height = this.height;
            var temp_graphics = this.image.getContext('2d');
            temp_graphics.fillStyle = "#0000FF";
            temp_graphics.fillRect(0, 0, this.width, this.height);
        }

        GoalPlatform.prototype = GameObject.prototype;

        GoalPlatform.prototype.constructor = GoalPlatform;

        GoalPlatform.prototype.handle_player_collision = function(player){
            //GameObject.prototype.handle_player_collision(player);
            player.victory = true;
        };

        return GoalPlatform;
    }
);