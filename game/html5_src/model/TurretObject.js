define(
    //dependencies
    ['model/GameObject'],
    
    //module definition
    function(GameObject){
        //constructor
        function TurretObject(x, y){
            GameObject.prototype.constructor.call(this, x, y, 28, 27);
            this.width = 28;
            this.height = 27;
         
/* if(image == null){
                this.image = document.createElement('canvas');
                this.image.width = width;
                this.image.height = height;
                var temp_graphics = this.image.getContext('2d');
                temp_graphics.fillStyle = "#0000FF";
                temp_graphics.fillRect(0, 0, width, height);    
            }else{
                this.image = image;
            }*/
        }

        TurretObject.prototype = GameObject.prototype;

        TurretObject.prototype.constructor = TurretObject;
        

   //     TurretObject.prototype.draw = function(graphics, screen_x){
    //        this.graphics.fillStyle = "#00FF00";
    //        var object_draw_x = this.x-screen_x;
    //        graphics.fillRect(object_draw_x, this.y, this.width, this.height);                 
    //        this.last_render_x = object_draw_x;
    //        this.last_render_y = this.y;
    //    };
        TurretObject.prototype.update = function(){
             this.shot_timer += 1;
             if(this.shot_timer == 60){
                   shoot();
         }       
        };
        TurretObject.prototype.Shoot = function(){
            new Bullet(this.x-10, this.y-10);
        };
         
        return TurretObject;
    }
);
