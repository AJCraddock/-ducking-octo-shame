define(
    // dependencies
    [],

    // module definition
    function(){
        function Renderer(engine, main_window, back_canvas, fore_canvas, volatile_canvas, ui_canvas){
            this.engine = engine;

            this.main_window = main_window;

            this.b_canvas = back_canvas;
            this.f_canvas = fore_canvas;
            this.v_canvas = volatile_canvas;
            this.u_canvas = ui_canvas;

            this.b_graphics = this.b_canvas.getContext('2d');
            this.f_graphics = this.f_canvas.getContext('2d');
            this.v_graphics = this.v_canvas.getContext('2d');
            this.u_graphics = this.u_canvas.getContext('2d');

            this.b_graphics.drawImage(engine.map.background, 0, 0);

            this.old_mode = this.engine.mode;
            this.old_touching_robot = false;

            this.curr_map = this.engine.map;
        }

        Renderer.prototype = {
            constructor: Renderer,

            render: function(){
                // call requestAnimationFrame in such a way that 'this' still works in this function
                this.main_window.requestAnimationFrame(function(){return renderer.render()});

                if(this.old_mode == "robot_interface" && this.engine.mode != "robot_interface"){
                    this.u_graphics.clearRect(0, 0, this.u_canvas.width, this.u_canvas.height);
                }

                if(this.old_touching_robot){
                    this.u_graphics.clearRect(0, 0, this.u_canvas.width, this.u_canvas.height);
                }

                if(this.old_mode == "game_over" || this.old_mode == "victory"){
                    this.u_graphics.clearRect(0, 0, this.u_canvas.width, this.u_canvas.height);
                }

                this.old_touching_robot = this.engine.map.player.touching_robot;
                this.old_mode = this.engine.mode;

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
                    case "robot_interface":
                        this.robot_interface_render();
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

                if(this.engine.mode == "game_running" && map.player.touching_robot){
                    this.u_graphics.fillStyle = "#FFFFFF";
                    this.u_graphics.font = "18px Colibri";
                    this.u_graphics.textAlign = "center";
                    this.u_graphics.fillText("Press E to command Bill.", this.u_canvas.width/2, this.u_canvas.height/2);
                }
            },

            game_over_render: function(){
                this.u_graphics.fillStyle = "#0000FF";
                this.u_graphics.font = "100px Colibri";
                this.u_graphics.textAlign = "center";
                this.u_graphics.fillText("YOU DIED", this.u_canvas.width/2, this.u_canvas.height/2);
                this.u_graphics.font = "30px Colibri";
                this.u_graphics.fillText("Press [Space] to continue...", this.u_canvas.width/2, (this.u_canvas.height/2)+30);
            },

            victory_render: function(){
                this.u_graphics.fillStyle = "#0000FF";
                this.u_graphics.font = "80px Colibri";
                this.u_graphics.textAlign = "center";
                this.u_graphics.fillText("LEVEL COMPLETE!", this.u_canvas.width/2, this.u_canvas.height/2);
                this.u_graphics.font = "30px Colibri";
                this.u_graphics.fillText("Press [Space] to continue...", this.u_canvas.width/2, (this.u_canvas.height/2)+30);
            },

            robot_interface_render: function(){
                var robot = this.engine.map.robot;

                // draw the string of instructions to the screen
                var instruction_str = "";
                for(var i = 0; i < robot.instructions.length; i++){
                    curr_instruction = robot.instructions[i];
                    if(curr_instruction.type == 'jump'){
                        if(i > 0){
                            instruction_str += "; " + curr_instruction.type;
                        }else{
                            instruction_str += curr_instruction.type;
                        }
                    }else{
                        if(i > 0){
                            instruction_str += "; " + curr_instruction.type + ": " + curr_instruction.time;
                        }else{
                            instruction_str += curr_instruction.type + ": " + curr_instruction.time;
                        }
                    }
                }
                this.u_graphics.fillStyle = "#FFFFFF";
                this.u_graphics.font = "12px Colibri";
                this.u_graphics.textAlign = "center";
                
                //draw the current standing order
                this.u_graphics.fillText("Standing order: " + robot.standing_order, this.v_canvas.width/2, this.v_canvas.height/2 - 30);

                // draw the instruction queue
                this.u_graphics.fillText(instruction_str, this.v_canvas.width/2, this.v_canvas.height/2);

                // draw the instruction buttons
                for(var i = 0; i < this.engine.script_buttons.length; i++){
                    var script_button = this.engine.script_buttons[i];
                    script_button.clear_old(this.u_graphics);
                }

                for(var i = 0; i < this.engine.script_buttons.length; i++){
                    var script_button = this.engine.script_buttons[i];
                    script_button.draw(this.u_graphics);
                }
            },

            clear_robot_interface: function(){
                for(var i = 0; i < this.engine.script_buttons.length; i++){
                    var script_button = this.engine.script_buttons[i];
                    script_button.clear_old(this.u_graphics);
                }
            }
        };

        return Renderer;
    }
);