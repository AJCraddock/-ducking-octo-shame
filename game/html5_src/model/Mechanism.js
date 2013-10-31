define(
    // dependencies
    ['model/GameObject'],

    // module definition
    function(GameObject){
        function Mechanism(x, y, width, height, speed, path){
            GameObject.prototype.constructor.call(this, x, y, width, height);

            this.MAX_SPEED = speed;
            this.dx = 0;
            this.dy = 0;
            this.path = path;
            this.curr_goal_index = 0;

            //create the default image for an object
            var temp_graphics = this.image.getContext('2d');
            temp_graphics.fillStyle = "#FF0000";
            temp_graphics.fillRect(0, 0, this.width, this.height);
        }

        Mechanism.prototype = new GameObject();
        Mechanism.prototype.constructor = Mechanism;

        Mechanism.prototype.update = function(){
            var goal = this.path[curr_goal_index];
            
            this.x += this.dx;
            this.y += this.dy;

            // check if at next goal point and change goal if so
            if(this.check_goal_collision()){
                this.change_goal();
                this.orient_toward_goal;
            }
        };

        Mechanism.prototype.check_goal_collision = function(){

        };

        Mechanism.prototype.orient_toward_goal = function(){

        };

        Mechanism.prototype.change_goal = function(){
            this.curr_goal_index = (this.curr_goal_index+1) % this.path.length;
        };

        return Mechanism;    
    }
);