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
        
    def handle_input(self, dt):
        if self.keys_down['A']:
            print("A is pressed")
        if self.keys_down['D']:
            print("D is pressed")
        if self.keys_down['W']:
            print("W is pressed")
        if self.keys_down['S']:
            print("S is pressed")