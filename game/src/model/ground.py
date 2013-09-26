import pyglet

class Ground:
    '''ground object'''
    def __init__(self, x, y, width, height):
        self.x = x
        self.y = y
        self.height = height
        self.width = width

    def draw(self):
        pyglet.graphics.draw(4, pyglet.gl.GL_POLYGON,
            ('v2i', (self.x, self.y,
                self.x, self.y+self.height,
                self.x+self.width, self.y+self.height,
                self.x+self.width, self.y)))