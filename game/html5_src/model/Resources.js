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

        return Resources;
    }
);