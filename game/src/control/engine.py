import pyglet, model

class Engine:
    def __init__(self, controller):
        self.controller = controller
        self.player = model.player.Player(50, 50)

    # update the position of all models for the next iteration of the game loop
    def update(self, dt):
        self.controller.handle_input(self.player)
        # need to move the player based on dt, the player should be moving a certain amount of distance per second
        self.player.x += self.player.dx
        self.player.y += self.player.dy