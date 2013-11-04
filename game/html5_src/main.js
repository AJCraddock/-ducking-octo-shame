requirejs.config({
    paths: {
        controller: 'controller',
        model: 'model'
    }
});

//start main app logic here
requirejs(
    ['controller/Engine', 'view/Renderer'],
    
    function(Engine, Renderer){
        var engine = new Engine();

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

        renderer = new Renderer(engine, window, main_canvas, fore_canvas, volatile_canvas);

        function on_focus(event){
            main_canvas.focus();
        }

        function on_keydown(event){
            engine.current_controller.on_keydown(event);
        }

        function on_keyup(event){
            engine.current_controller.on_keyup(event);
        }

        //schedule the engine's update method, have to use a wrapper function
        //so that engine.update() does not end up in an anonymous namespace
        setInterval(function(){return engine.update();}, 1000/60);
        //call the renderer's render method to start the animation loop
        renderer.render();
    }
);