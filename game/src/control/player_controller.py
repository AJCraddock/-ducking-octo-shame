import pyglet
from pyglet.window import key

class Player_Controller:
    def __init__(self):
        self.keys_down = {'A': False, 'D': False, 'W': False, 'SPACE': False}
                
    def on_key_press(self, symbol, modifiers):
        if symbol == key.A:
            self.keys_down['A'] = True
        elif symbol == key.D:
            self.keys_down['D'] = True
        elif symbol == key.W:
            self.keys_down['W'] = True
        elif symbol == key.SPACE:
            self.keys_down['SPACE'] = True
        
    def on_key_release(self, symbol, modifiers):
        if symbol == key.A:
            self.keys_down['A'] = False
        elif symbol == key.D:
            self.keys_down['D'] = False
        elif symbol == key.W:
            self.keys_down['W'] = False
        elif symbol == key.SPACE:
            self.keys_down['SPACE'] = False
        
    def handle_input(self, player):            
        if self.keys_down['A']:
            player.dx = 0-player.MAX_DX
        elif self.keys_down['D']:
            player.dx = player.MAX_DX
        else:
            player.dx = 0
        if self.keys_down['SPACE']:
            self.jump(player)
    
    def jump(self, player):
        floor = 50
        if player.y == floor and player.dy == 0:
            player.dy = player.MAX_DY*5

