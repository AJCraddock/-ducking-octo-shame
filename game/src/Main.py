import pyglet, control, view, model

SCREEN_X, SCREEN_Y = 800, 600

# instantiate the window
window = pyglet.window.Window(SCREEN_X, SCREEN_Y)
keys_down = {'A': False, 'D': False}

# these don't seem to work
#keys = pyglet.window.key.KeyStateHandler()
#window.push_handlers(keys)

@window.event
def on_key_press(symbol, modifiers):
    control.controller.on_key_press(symbol, keys_down, modifiers)

@window.event
def on_key_release(symbol, modifiers):
    control.controller.on_key_release(symbol, keys_down, modifiers)
    
@window.event
def on_draw():
    window.clear()
    
    # update and render the game
    control.controller.handle_input(keys_down)
    control.engine.update()
    view.renderer.render(window)

pyglet.app.run()