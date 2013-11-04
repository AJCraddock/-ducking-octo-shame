define(
    // dependencies
    [],

    // module definition
    function(){
        function Renderer(engine, main_window, back_canvas, fore_canvas, volatile_canvas){
            this.engine = engine;

            this.main_window = main_window;

            this.b_canvas = back_canvas;
            this.f_canvas = fore_canvas;
            this.v_canvas = volatile_canvas;

            this.b_graphics = this.b_canvas.getContext('2d');
            this.f_graphics = this.f_canvas.getContext('2d');
            this.v_graphics = this.v_canvas.getContext('2d');

            this.b_graphics.drawImage(engine.map.background, 0, 0);

            this.curr_map = this.engine.map;
        }

        Renderer.prototype = {
            constructor: Renderer,

            render: function(){
                // call requestAnimationFrame in such a way that 'this' still works in this function
                this.main_window.requestAnimationFrame(function(){return renderer.render()});
                
                switch(this.engine.mode){
                    case "game_running":
                        this.game_running_render();
                        break;
                    case "game_over":
                        this.game_over_render();
                        break;
                    case "victory":
                        this.victory_render();
                        break;
                }
            },

            game_running_render: function(){
                var map = this.engine.map;
                var curr_map = this.curr_map;
                
                //if the map has changed, reset the canvases
                if (map != curr_map){
                    this.b_graphics.clearRect(0, 0, this.b_canvas.width, this.b_canvas.height);
                    this.b_graphics.drawImage(map.background, 0, 0);

                    this.f_graphics.clearRect(0, 0, this.f_canvas.width, this.f_canvas.height);

                    this.v_graphics.clearRect(0, 0, this.v_canvas.width, this.v_canvas.height);
                    curr_map = map;
                }

                var player_center_x = map.player.x+(map.player.width/2)
                var screen_x = player_center_x-(this.f_canvas.width/2);
                // var screen_y;

                //blank the screen
                map.player.clear_old(this.f_graphics);
                for(var i = 0; i < map.objects.length; i++){
                    var obj = map.objects[i];
                    if(obj.canvas == "fore"){
                        obj.clear_old(this.f_graphics);
                    }else if(obj.canvas == "volatile"){
                        obj.clear_old(this.v_graphics);
                    }
                }

                //draw the game objects
                map.player.draw(this.f_graphics, this.f_canvas);

                for(var i = 0; i < map.objects.length; i++){
                    var obj = map.objects[i];
                    if(obj.canvas == "fore"){
                        obj.draw(this.f_graphics, screen_x);
                    }else if(obj.canvas == "volatile"){
                        obj.draw(this.v_graphics, screen_x);
                    }
                }
            },

            game_over_render: function(){
                this.v_graphics.fillStyle = "#0000FF";
                this.v_graphics.font = "100px Colibri";
                this.v_graphics.textAlign = "center";
                this.v_graphics.fillText("YOU DIED", this.v_canvas.width/2, this.v_canvas.height/2);
                this.v_graphics.font = "30px Colibri";
                this.v_graphics.fillText("Press [Space] to continue...", this.v_canvas.width/2, (this.v_canvas.height/2)+30);
            },

            victory_render: function(){
                this.v_graphics.fillStyle = "#0000FF";
                this.v_graphics.font = "80px Colibri";
                this.v_graphics.textAlign = "center";
                this.v_graphics.fillText("LEVEL COMPLETE!", this.v_canvas.width/2, this.v_canvas.height/2);
                this.v_graphics.font = "30px Colibri";
                this.v_graphics.fillText("Press [Space] to continue...", this.v_canvas.width/2, (this.v_canvas.height/2)+30);
            }

        };

        return Renderer;
    }
);