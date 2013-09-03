import pyglet
from pyglet.window import key

# instantiate the window
window = pyglet.window.Window()

# run this function every time window.event is called
@window.event
def on_key_press(symbol, modifiers):
    if symbol == key.A:
        print('The A key was pressed')

# run this function every time window.event is called
@window.event
def on_draw():
    window.clear()

# start pyglet    
pyglet.app.run()