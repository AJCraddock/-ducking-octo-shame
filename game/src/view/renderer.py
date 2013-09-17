import pyglet

class Renderer:
    def __init__(self, engine):
        self.engine = engine

    # draw all of the game models and graphics to the window
    def render(self, dt):
        self.engine.player.draw()
        pass