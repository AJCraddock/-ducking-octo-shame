define(function(){
    //constructor
    function Player(x, y){
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.MAX_DX = 5;
        this.MAX_DY = 10;
        this.width = 25;
        this.height = 25;
        this.on_ground = false;
        
        this.last_render_x = 0;
        this.last_render_y = 0;
    }

    //superclass definition or something, I'm not sure
    Player.prototype = {
        constructor: Player,

        clear_old: function(graphics){
            graphics.clearRect(this.last_render_x-2, this.last_render_y-2, 
            this.width+4, this.height+4);
        },

        draw: function(graphics){
            graphics.fillStyle = '#FF0000';
            graphics.fillRect(this.x, this.y, this.width, this.height);
            this.last_render_x = this.x;
            this.last_render_y = this.y;
        }
    };
});


//OLD CODE
// function Player(x, y){
//     this.x = x;
//     this.y = y;
//     this.dx = 0;
//     this.dy = 0;
//     this.MAX_DX = 5;
//     this.MAX_DY = 10;
//     this.width = 25;
//     this.height = 25;
//     this.on_ground = false;

//     this.last_render_x = 0;
//     this.last_render_y = 0;

//     this.clear_old = function(graphics){
//         graphics.clearRect(this.last_render_x-2, this.last_render_y-2, 
//             this.width+4, this.height+4);
//     }
//     this.draw = function(graphics){
//         graphics.fillStyle = '#FF0000';
//         graphics.fillRect(this.x, this.y, this.width, this.height);
//         this.last_render_x = this.x;
//         this.last_render_y = this.y;
//     };
// }