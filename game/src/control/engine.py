import pyglet

class Engine:
    def __init__(self, controller):
        self.controller = controller
        pass
    # update the position of all models for the next iteration of the game loop
    def update(self, dt):
        self.controller.handle_input(dt)
        pass