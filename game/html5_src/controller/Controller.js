define(
    //dependencies
    [],

    //module definition
    function(){
        function Controller(){
            this.keys_down = {A:false, D:false, W:false, S:false, Space:false};
            this.A = 65;
            this.D = 68;
            this.SPACE = 32;            
        }

        Controller.prototype = {
            constructor: Controller,

            on_keydown: function(event){
                var key = event.keyCode;
                if (key == this.A){
                    this.keys_down.A = true;
                }else if(key == this.D){
                    this.keys_down.D = true;
                }else if(key == this.SPACE){
                    this.keys_down.Space = true;
                }
            },

            on_keyup: function(event){
                var key = event.keyCode;
                if (key == this.A){
                    this.keys_down.A = false;
                }else if(key == this.D){
                    this.keys_down.D = false;
                }else if(key == this.SPACE){
                    this.keys_down.Space = false;
                }
            },

            handle_input: function(){
            }
        };

        return Controller;
    }
);