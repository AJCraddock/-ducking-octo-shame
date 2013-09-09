import pyglet, control, model, view

# instantiate the window
window = pyglet.window.Window()

@window.event
def on_key_press(symbol, modifiers):
    control.Controller.on_key_press(symbol, modifiers)

@window.event
def on_draw():
    window.clear()

pyglet.app.run()