define(
    // dependencies
    ['model/GameObject'],

    // class definition
    function(GameObject){
        function DangerousGameObject(x, y, width, height, image=null){
            GameObject.prototype.constructor.call(this, x, y, width, height);

            //create the default image for an object
            if(image == null){
                this.image = document.createElement('canvas');
                this.image.width = this.width;
                this.image.height = this.height;
                var temp_graphics = this.image.getContext('2d');
                temp_graphics.fillStyle = "#FF6500";
                temp_graphics.fillRect(0, 0, this.width, this.height);
            }else{
                this.image = image;
            }
        }

        DangerousGameObject.prototype = new GameObject();
        DangerousGameObject.prototype.constructor = DangerousGameObject;

        DangerousGameObject.prototype.handle_player_collision = function(player){
            GameObject.prototype.handle_player_collision(player);
            player.dead = true;
        };

        return DangerousGameObject;
    }
);