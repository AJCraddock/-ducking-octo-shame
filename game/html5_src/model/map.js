define(
    
    //module definition
    function(){
        //constructor
        function Map(player, objects, background){
            this.player = player;
            this.objects = objects;
            this.background = background;

            // array to separate objects based on location
            this.screens = new Array();
            for(var i = 0; i < 99; i++){
                this.screens[i] = new Array();
            }

            // add the player to a starting screen based on its position
            var screen_index = Math.floor(player.x/800);

            // add objects to a screen based on their position
            for(var i = 0; i < objects.length; i++){
                var object = objects[i];
                var screen_index = Math.floor(object.x/800);
                screens[screen_index].push(object);
            }
        }

        //superclass definition
        Map.prototype = {
            constructor: Map
        };

        return Map;
    }
);