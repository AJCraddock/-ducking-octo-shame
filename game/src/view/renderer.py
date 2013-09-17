import pyglet

class Renderer:
    def __init__(self, engine, window):
        self.engine = engine    

    # draw all of the game models and graphics to the window
    def render(self):
        self.engine.player.draw()
        pass