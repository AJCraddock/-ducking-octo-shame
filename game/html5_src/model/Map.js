define(
    
    //module definition
    function(){
        //constructor
        function Map(player, robot, game_objects, background){
            this.death_height = 750;

            this.player = player;
            this.robot = robot;
            this.objects = game_objects;
            this.background = background;

            // array to separate objects based on location
            this.screens = new Array();
            for(var i = 0; i < 99; i++){
                this.screens[i] = new Array();
            }

            // add the player to a starting screen based on its position and
            // keep track of player's old index
            this.player_index = Math.floor(this.player.x/800);
            this.screens[this.player_index].push(this.player);

            this.robot_index = Math.floor(this.robot.x/800);

            // add objects to a screen based on their position
            for(var i = 0; i < this.objects.length; i++){
                var object = this.objects[i];
                var screen_index = Math.floor(object.x/800);
                this.screens[screen_index].push(object);
            }
        }

        Map.prototype = {
            constructor: Map,

            // update the position of moving objects in the screens array
            update_screens: function(){
                var new_player_index = Math.floor(this.player.x/800);
                if(this.player_index != new_player_index){
                    // remove the object from its old screen
                    var s = this.screens[this.player_index];
                    s.splice(s.indexOf(this.player), 1);

                    // add the player to its new screen
                    this.screens[new_player_index].push(this.player);
                    // update the player_index
                    this.player_index = new_player_index;
                }

                var new_robot_index = Math.floor(this.robot.x/800);
                if(this.robot_index != new_robot_index){
                    // remove the robot from its old screen
                    var s = this.screens[this.robot_index];
                    s.splice(s.indexOf(this.robot), 1);

                    // add the robot to its new screen
                    this.screens[new_robot_index].push(this.robot);
                    // update the robot index
                    this.robot_index = new_robot_index;
                }
            },

            // function to get objects that are near the player
            get_nearby_objects: function(){
                var nearby_objects = new Array();
                var s = this.screens;
                var p = this.player;
                var p_index = this.player_index;

                // add objects from the screen preceding the player's screen
                if(p_index > 0){
                    for(var i = 0; i < s[p_index-1].length; i++){
                        nearby_objects.push(s[p_index-1][i]);
                    }
                }

                // add objects from the screen the player is on
                for(var i = 0; i < s[p_index].length; i++){
                    if(s[p_index][i] != p){
                        nearby_objects.push(s[p_index][i]);
                    }
                }

                //add objects from the screen after the player's screen
                if(p_index < s.length-1){
                    for(var i = 0; i < s[p_index+1].length; i++){
                        nearby_objects.push(s[p_index+1][i]);
                    }
                }

                return nearby_objects;
            }
        };

        return Map;
    }
);