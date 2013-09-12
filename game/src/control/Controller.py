import pyglet
from pyglet.window import key

def on_key_press(symbol, keys_down, modifiers):
    if symbol == key.A:
        keys_down['A'] = True
    elif symbol == key.D:
        keys_Down['D'] = True
    
def on_key_release(symbol, keys_down, modifiers):
    if symbol == key.A:
        keys_down['A'] = False
    elif symbol == key.D:
        keys_Down['D'] = False
    
def handle_input(keys_down):
    if keys_down['A']:
        print("A is pressed")
    if keys_down['D']:
        print("D is pressed")
    # if keys_down[key.W]:
        # print("W is pressed")
    # if keys_down[key.S]:
        # print("S is pressed")