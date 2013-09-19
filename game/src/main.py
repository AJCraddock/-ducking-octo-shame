import pyglet, control, view, model
from pyglet import clock

SCREEN_X, SCREEN_Y = 800, 600

# instantiate the window
window = pyglet.window.Window(SCREEN_X, SCREEN_Y, vsync = True)
controller = control.controller.Controller()
engine = control.engine.Engine(controller)
renderer = view.renderer.Renderer(engine, window)
fps_display = pyglet.clock.ClockDisplay()

@window.event
def on_key_press(symbol, modifiers):
    controller.on_key_press(symbol, modifiers)

@window.event
def on_key_release(symbol, modifiers):
    controller.on_key_release(symbol, modifiers)
    
@window.event
def on_draw():
    window.clear()
    renderer.render()
    fps_display.draw()

# update and render the game
clock.schedule_interval(engine.update, 1/120.0)
# clock.schedule_interval(renderer.render, 1/60.0)

pyglet.app.run()