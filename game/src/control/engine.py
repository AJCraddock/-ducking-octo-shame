import pyglet, model, math

FLOOR = 50
GRAVITY = 3

class Engine:
    def __init__(self, controller):
        self.controller = controller

        # temporary object declarations
        self.player = model.player.Player(50, 50)
        self.ground = model.ground.Ground(0, 30, 800, 20)

    # update the position of all models for the next iteration of the game loop
    def update(self, dt):
        self.controller.handle_input(self.player)
        # need to move the player based on dt, the player should be moving a certain amount of distance per second
        #print dt
        # movement = int(math.floor(self.player.dx * dt*30))
        # print movement
        gravity(self.player)
        self.player.x += self.player.dx 
        self.player.y += self.player.dy
    
def gravity(object):
    if object.y > FLOOR:
        object.dy -= GRAVITY
    if object.y < FLOOR:
        object.y = FLOOR
        object.dy = 0
