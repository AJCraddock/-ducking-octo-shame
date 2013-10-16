define(
    //module definition
    function(){
        //constructor
        function StaticObject(x, y, width, height){
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }

        StaticObject.prototype = {
            constructor: StaticObject,

            draw: function(graphics){
                graphics.fillStyle = "#FFFFFF";
                graphics.fillRect(this.x, this.y, this.width, this.height);                
            }
        };
    }
);

//OLD CODE
// function StaticObject(x, y, width, height){
//     this.x = x;
//     this.y = y;
//     this.width = width;
//     this.height = height;

//     this.draw = function(graphics){
//         graphics.fillStyle = "#FFFFFF";
//         graphics.fillRect(this.x, this.y, this.width, this.height);
//     };
// }