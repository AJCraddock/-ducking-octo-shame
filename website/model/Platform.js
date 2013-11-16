define(
    //module definition
    ['model/GameObject'],
    function(GameObject){
        //constructor
        function Platform(x, y, width, height, image){
          GameObject.prototype.constructor.call(this, x, y, width, height);
           
           if(image == null){
                // create the default image for an object
                var temp_graphics = this.image.getContext('2d');
                temp_graphics.fillStyle = "#6500FF";
                temp_graphics.fillRect(0, 0, this.width, this.height);
            }else{
                this.image = image;
            }
        };      

        Platform.prototype = new GameObject();
        Platform.prototype.constructor = Platform;
        return Platform
     }
);

