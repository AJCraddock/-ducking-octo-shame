requirejs.config({
    paths: {
        controller: 'controller',
        model: 'model'
    }
});

//start main app logic here
requirejs(
    ['controller/engine'],
    
    function(){
        console.log("got here");
        var engine = new Engine();
        var map = engine.map;
        //set up the canvas.
        var main_canvas = document.getElementById('main_canvas');
        var fore_canvas = document.getElementById('fore_canvas');
        //give the main_canvas focus
        main_canvas.setAttribute('tabindex', '0');
        main_canvas.focus();
        //link event handlers for game
        main_canvas.addEventListener("keydown", on_keydown, false);
        main_canvas.addEventListener("keyup", on_keyup, false);
        //get graphics context for the canvas
        var back_graphics = main_canvas.getContext('2d');
        var graphics = fore_canvas.getContext('2d');
        //set the main canvas background to the current map background
        back_graphics.drawImage(map.background, 0, 0);

        function on_keydown(event){
            engine.player_controller.on_keydown(event);
        }

        function on_keyup(event){
            engine.player_controller.on_keyup(event);
        }

        function render(){
            window.requestAnimationFrame(render);
            
            //blank the screen
            map.player.clear_old(graphics);

            //draw the game objects
            map.player.draw(graphics);
            for(var i = 0; i < map.objects.length; i++){
                map.objects[i].draw(graphics);
            }
        }

        function main_loop(){
            //schedule the engine's update method
            setInterval(engine.update, 1000/60);
            //call the renderer's render method to start the animation loop
            // engine.update();
            render();
        }

        main_loop();
    }
);