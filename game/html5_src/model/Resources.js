define(
    // dependencies
    [],

    // class definition
    function(){
        Resources = new Object();
        
        // load the robot's sprites
        Resources.robot_sprite_sheet = new Image();
        Resources.robot_sprite_sheet.src = 'resources/images/bill_sprite_sheet.png';

        return Resources;
    }
);