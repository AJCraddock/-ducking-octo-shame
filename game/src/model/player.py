import pyglet

class Player:
    'player object'   
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.MAX_DX = 5
        self.MAX_DY = 5
        self.dx = 0
        self.dy = 0
    
    def draw(self):
        pyglet.graphics.draw(4, pyglet.gl.GL_POLYGON, 
            ('v2i', (self.x, self.y, 
            self.x+10, self.y+10,
            self.x+10, self.y,
            self.x, self.y+10)))
            