import os, sys
import pyglet, control, view, model

# instantiate the window
window = pyglet.window.Window()

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