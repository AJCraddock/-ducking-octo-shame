import pyglet

# instantiate the pyglet window
window = pyglet.window.Window()

# load an image
image = pyglet.resource.image('Bouncer.jpg')

# call this function every time an event takes place
@window.event
def on_draw():
    window.clear()
    image.blit(0, 0)

# start pyglet
pyglet.app.run()