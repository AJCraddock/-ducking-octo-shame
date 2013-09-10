import pyglet, control, view, model

SCREEN_X, SCREEN_Y = 800, 600

# instantiate the window
window = pyglet.window.Window(SCREEN_X, SCREEN_Y)

@window.event
def on_key_press(symbol, modifiers):
    control.controller.on_key_press(symbol, modifiers)

@window.event
def on_draw():
    window.clear()
    
    # update and render the game
    control.engine.update()
    view.renderer.render(window)

pyglet.app.run()