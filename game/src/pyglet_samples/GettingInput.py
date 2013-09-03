import pyglet
from pyglet.window import key

window = pyglet.window.Window()

@window.event
def on_key_press(symbol, modifiers):
    if symbol == key.A:
        print('The A key was pressed')

@window.event
def on_draw():
    window.clear()
    
pyglet.app.run()