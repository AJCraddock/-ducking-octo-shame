define(
    // dependencies
    ['model/GameObject'],

    // module definition
    function(GameObject){
        function Mechanism(x, y, width, height, cycles_to_goal, path, image){
            GameObject.prototype.constructor.call(this, x, y, width, height);
            
            this.canvas = "volatile";

            this.cycles_to_goal = cycles_to_goal;
            this.dx = 0;
            this.dy = 0;

            // make a copy of the path array
            this.path = new Array();
            for(var i = 0; i < path.length; i++){
                this.path.push({"x":path[i].x, "y":path[i].y});
            }

            // push the starting position onto the path
            this.path.push({"x":x, "y":y});

            this.curr_goal_index = 0;
            this.goal = this.path[this.curr_goal_index];
            this.orient_toward_goal();

            if(image == null){
                // create the default image for an object
                var temp_graphics = this.image.getContext('2d');
                temp_graphics.fillStyle = "#6500FF";
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

            this.goal_counter--;
            // check if at next goal point and change goal if so
            if(this.goal_counter <= 0){
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
            this.dx = (this.goal.x-this.x)/this.cycles_to_goal;
            this.dy = (this.goal.y-this.y)/this.cycles_to_goal;
            this.goal_counter = this.cycles_to_goal;
        };

        Mechanism.prototype.change_goal = function(){
            this.curr_goal_index = (this.curr_goal_index+1) % this.path.length;
            this.goal = this.path[this.curr_goal_index];
        };

        return Mechanism;    
    }
);