define(function(require){
    //constructor
    function Map(player, objects, background){
        this.player = player;
        this.objects = objects;
        this.background = background; 
    }

    //superclass definition
    Map.prototype = {
        constructor: Map
    };
});


//OLD CODE
// function Map(player, objects, background){
//     this.player = player;
//     this.objects = objects;
//     this.background = background;
// }