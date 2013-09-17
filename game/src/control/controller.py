import pyglet
from pyglet.window import key

class Controller:
    def __init__(self):
        self.keys_down = {'A': False, 'D': False, 'W': False, 'S': False}
                
    def on_key_press(self, symbol, modifiers):
        if symbol == key.A:
            self.keys_down['A'] = True
        elif symbol == key.D:
            self.keys_down['D'] = True
        elif symbol == key.W:
            self.keys_down['W'] = True
        elif symbol == key.S:
            self.keys_down['S'] = True
        
    def on_key_release(self, symbol, modifiers):
        if symbol == key.A:
            self.keys_down['A'] = False
        elif symbol == key.D:
            self.keys_down['D'] = False
        elif symbol == key.W:
            self.keys_down['W'] = False
        elif symbol == key.S:
            self.keys_down['S'] = False
        
    def handle_input(self, player):
        if self.keys_down['A']:
            player.dx = 0-player.MAX_DX
        elif self.keys_down['D']:
            player.dx = player.MAX_DX
        else:
            player.dx = 0
        if self.keys_down['W']:
            player.dy = player.MAX_DY
        elif self.keys_down['S']:
            player.dy = 0-player.MAX_DY
        else:
            player.dy = 0