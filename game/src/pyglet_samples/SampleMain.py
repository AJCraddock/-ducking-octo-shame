import pyglet
from pyglet.window import key

# instantiate the window
window = pyglet.window.Window()

image = pyglet.resource.image('Bouncer.jpg')
image.x, image.y = 50, 50

@window.event
def on_key_press(symbol, modifiers):
    if symbol == key.A:
        image.x -= 20

@window.event
def on_draw():
    window.clear()
    image.blit(image.x,image.y)


pyglet.app.run()