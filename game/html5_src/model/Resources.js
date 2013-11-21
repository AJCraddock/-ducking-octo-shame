define(
    // dependencies
    [],

    // class definition
    function(){
        Resources = new Object();
        
        // load the robot's sprites
        Resources.robot_sprite_sheet = new Image();
        Resources.robot_sprite_sheet.src = 'resources/images/bill_sprite_sheet.png';

        // load the player's sprites
        Resources.player_forward_sprite_sheet = new Image();
        Resources.player_forward_sprite_sheet.src = 'resources/images/player_sprite_sheet_forward.png';
        Resources.player_backward_sprite_sheet = new Image();
        Resources.player_backward_sprite_sheet.src = 'resources/images/player_sprite_sheet_backward.png';

        // load fire sprite sheet
        Resources.fire_sprite_sheet = new Image();
        Resources.fire_sprite_sheet.src = 'resources/images/xplosion17.png';

        // create a dirt texture for the ground
        Resources.dirt_texture = document.createElement('canvas');
        Resources.dirt_texture.width = 800;
        Resources.dirt_texture.height = 800;
        var dirt_ctx = Resources.dirt_texture.getContext('2d');

        for(var i = 0; i < 80; i++){
            for(var j = 0; j < 80; j++){
                if((i+j) < 10)
                    dirt_ctx.fillStyle = "rgb(100,100,100)";
                else if((i+j) < 40)
                    dirt_ctx.fillStyle = "rgb(119,49,0)";
                else
                    dirt_ctx.fillStyle = "rgb(139,69,19)";
                dirt_ctx.fillRect(i*10, j*10, 10, 10);
            }
        }
        Resources.dirt_image = new Image();
        Resources.dirt_image.src = Resources.dirt_texture.toDataURL("image/png");

        return Resources;
    }
);