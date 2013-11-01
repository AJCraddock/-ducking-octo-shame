define(
    // dependencies
    ['model/GameObject'],

    // module definition
    function(GameObject){
        function Mechanism(x, y, width, height, speed, path, image){
            GameObject.prototype.constructor.call(this, x, y, width, height);

            this.MAX_SPEED = speed;
            this.dx = 0;
            this.dy = 0;
            this.path = path;
            this.curr_goal_index = 0;
            this.goal = this.path[this.curr_goal_index];

            if(image == null){
                // create the default image for an object
                var temp_graphics = this.image.getContext('2d');
                temp_graphics.fillStyle = "#FF0000";
                temp_graphics.fillRect(0, 0, this.width, this.height);
            }else{
                this.image = image;
            }
        }

        Mechanism.prototype = new GameObject();
        Mechanism.prototype.constructor = Mechanism;

        Mechanism.prototype.update = function(){
            this.x += this.dx;
            this.y += this.dy;

            // check if at next goal point and change goal if so
            if(this.check_goal_collision()){
                console.log("changing goal");
                console.log(this.path);
                this.change_goal();
                this.orient_toward_goal();
            }
        };

        Mechanism.prototype.check_goal_collision = function(){
            // check if the object is not touching the goal point on both axes
            if((this.x > this.goal.x) || (this.x + this.width < this.goal.x)){
                return false;
            }
            if((this.y > this.goal.y) || (this.y + this.height < this.goal.y)){
                return false;
            }
            return true;
        };

        Mechanism.prototype.orient_toward_goal = function(){
            var x_vector = this.goal.x - this.x;
            var y_vector = this.goal.y - this.y;

            var theta = Math.atan(y_vector/x_vector);

            this.dx = this.MAX_SPEED * Math.cos(theta);
            this.dy = this.MAX_SPEED * Math.sin(theta);
            //this if should be replaced with something smarter.
            if (x_vector < 0) {
                this.dx *= -1;
                this.dy *= -1;
            }
        };

        Mechanism.prototype.change_goal = function(){
            this.curr_goal_index = (this.curr_goal_index+1) % this.path.length;
            this.goal = this.path[this.curr_goal_index];
            console.log(this.goal);
        };

        return Mechanism;    
    }
);