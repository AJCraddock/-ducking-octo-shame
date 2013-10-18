requirejs.config({
    paths: {
        controller: 'controller',
        model: 'model'
    }
});

//start main app logic here
requirejs(
    ['controller/Engine'],
    
    function(Engine){
        var engine = new Engine();
        var map = engine.map;

        //set up the canvas.
        var main_canvas = document.getElementById('main_canvas');
        var fore_canvas = document.getElementById('fore_canvas');
        var volatile_canvas = document.getElementById('volatile_canvas');
        //give the main_canvas focus
        main_canvas.setAttribute('tabindex', '0');
        main_canvas.focus();
        //link event handlers for game
        main_canvas.addEventListener("keydown", on_keydown, false);
        main_canvas.addEventListener("keyup", on_keyup, false);
        // event handlers to allow the main_canvas to get focus back
        fore_canvas.addEventListener("focus", on_focus, false);
        fore_canvas.addEventListener("mouseup", on_focus, false);
        volatile_canvas.addEventListener("focus", on_focus, false);
        volatile_canvas.addEventListener("mouseup", on_focus, false);
        //get graphics context for the canvas
        var back_graphics = main_canvas.getContext('2d');
        var graphics = fore_canvas.getContext('2d');
        //set the main canvas background to the current map background
        back_graphics.drawImage(map.background, 0, 0);

        function on_focus(event){
            main_canvas.focus();
        }

        function on_keydown(event){
            engine.player_controller.on_keydown(event);
        }

        function on_keyup(event){
            engine.player_controller.on_keyup(event);
        }

        function render(){
            window.requestAnimationFrame(render);
            var player_center_x = map.player.x+(map.player.width/2)
            var screen_x = player_center_x-(fore_canvas.width/2);
            // var screen_y;

            //blank the screen
            map.player.clear_old(graphics);
            for(var i = 0; i < map.objects.length; i++){
                map.objects[i].clear_old(graphics);
            }

            //draw the game objects
            map.player.draw(graphics, volatile_canvas);

            for(var i = 0; i < map.objects.length; i++){
                map.objects[i].draw(graphics, screen_x);
            }
        }

        //schedule the engine's update method, have to use a wrapper function
        //so that engine.update() does not end up in an anonymous namespace
        setInterval(function(){return engine.update();}, 1000/60);
        //call the renderer's render method to start the animation loop
        render();
    }
);