define(
    // dependencies
    [],

    // class definition
    function(){
        Resources = new Object();
        
        // load the robot's sprites
        var robot_sprite_sheet = new Image();
        var robot_sprite_sheet.src = 'resources/images/bill_sprite_sheet.png';
        Resources.robot_sprites = {"forward":[], "backward":[], "jump":[]};

        robot_sprite_sheet.onLoad = function(){

            var images = new Array();
            var frame_width = 3072/24;
            var frame_height = 1024/8;

            for(var i = 0; i < 24; i++){
                for(var j = 0; j < 8; j++){
                    var c = document.createElement('canvas');
                    c.width = frame_width;
                    c.height = frame_height;
                    var ctx = c.getContext('2d');
                    ctx.drawImage(robot_sprite_sheet, frame_width*i, frame_height*j, frame_width, frame_height);

                    images.push(c);
                }
            }
            var backward = Resources.robot_sprites.backward;
            for(var i = 0; i < 12; i++){
                backward.push(images[i]);
            }

            var forward = Resources.robot_sprites.forward;
            for(var i = 96; i < 96+12; i++){
                forward.push(images[i]);
            }
        }


        return Resources;
    }
);