define(
    //dependencies
    [],

    //module definition
    function(){
        function Controller(){
            this.keys_down = {A:false, D:false, W:false, S:false, Space:false, E:false, 
                Esc:false, Backspace:false, Z:false, C:false};
            this.A = 65;
            this.D = 68;
            this.E = 69;
            this.W = 87;
            this.Z = 90;
            this.C = 67;
            this.Esc = 27;
            this.SPACE = 32;
            this.BACKSPACE = 8;
        }

        Controller.prototype = {
            constructor: Controller,

            on_keydown: function(event){
                console.log(event.keyCode);
                var key = event.keyCode;
                if (key == this.A){
                    this.keys_down.A = true;
                }else if(key == this.D){
                    this.keys_down.D = true;
                }else if(key == this.E){
                    this.keys_down.E = true;
                }else if(key == this.W){
                    this.keys_down.W = true;
                }else if(key == this.Z){
                    this.keys_down.Z = true;
                }else if(key == this.C){
                    this.keys_down.C = true;
                }else if(key == this.Esc){
                    this.keys_down.Esc = true;
                }else if(key == this.SPACE){
                    this.keys_down.Space = true;
                }else if(key == this.BACKSPACE){
                    this.keys_down.Backspace = true;
                }
            },

            on_keyup: function(event){
                var key = event.keyCode;
                if (key == this.A){
                    this.keys_down.A = false;
                }else if(key == this.D){
                    this.keys_down.D = false;
                }else if(key == this.E){
                    this.keys_down.E = false;
                }else if(key == this.W){
                    this.keys_down.W = false;
                }else if(key == this.Z){
                    this.keys_down.Z = false;
                }else if(key == this.C){
                    this.keys_down.C = false;
                }else if(key == this.Esc){
                    this.keys_down.Esc = false;
                }else if(key == this.SPACE){
                    this.keys_down.Space = false;
                }else if(key == this.BACKSPACE){
                    this.keys_down.Backspace = false;
                }
            },

            handle_input: function(){
            },

            reset: function(){
                this.keys_down.A = false;
                this.keys_down.S = false;
                this.keys_down.D = false;
                this.keys_down.W = false;
                this.keys_down.E = false;
                this.keys_down.Z = false;
                this.keys_down.C = false;
                this.keys_down.Space = false;
                this.keys_down.Esc = false;
                this.keys_down.Backspace = false;
            }
        };

        return Controller;
    }
);