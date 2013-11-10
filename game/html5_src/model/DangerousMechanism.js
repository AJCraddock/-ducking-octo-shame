define(
    // dependencies
    ['model/Mechanism'],

    // class definition
    function(Mechanism){
        function DangerousMechanism(x, y, width, height, cycles_to_goal, path, image){
            Mechanism.prototype.constructor.call(this, x, y, width, height, cycles_to_goal, path, image);
            
            if(image == null){
                this.image = document.createElement('canvas');
                this.image.width = width;
                this.image.height = height;
                var temp_graphics = this.image.getContext('2d');
                temp_graphics.fillStyle = "#FF6000";
                temp_graphics.fillRect(0, 0, width, height);    
            }else{
                this.image = image;
            }
        }

        DangerousMechanism.prototype = new Mechanism();
        DangerousMechanism.prototype.constructor = DangerousMechanism;

        DangerousMechanism.prototype.handle_player_collision = function(player){
            Mechanism.prototype.handle_player_collision.call(this, player);
            player.dead = true;
        };

        return DangerousMechanism;
    }
);