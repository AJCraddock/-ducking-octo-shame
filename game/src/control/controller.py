import pyglet
from pyglet.window import key

class Controller:
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
            print "moved forward", player.x
            player.dx = player.MAX_DX
        else:
            player.dx = 0
        if self.keys_down['W']:
            self.jump(player)            
            #player.dy = player.MAX_DY
            #print player.x, player.dx, player.y, player.dy
#            print player.y, "  ", player.dy
            #player.dy = 0-player.MAX_DY
#        elif self.keys_down['SPACE']:
#            player.dy = 0-player.MAX_DY
#        else:
#            player.dy = 0
    
    def jump(self, player):
        floor = 50
        print "IN the jump method" #debugging
        if player.y == floor and player.dy == 0:   #if player is on ground and not moving(the not moving part needs to go
            player.dy= player.MAX_DY*5 #adjust the y coordinate
            print "in first if statment", player.y , player.dy #debugging           
        while (player.y > 50): #suppose to be gravity
            player.y -=1      #trying to bring him down was not working 
            if player.dy > 0:
               player.dy -=4
       # if player.y > floor and player.dy < 0:
        #    player.dy -= 2   
       # if player.dy > 20:
        #    player.dy -= 20
            print "in second", player.y, player.dy               
        
        if player.y < floor:   #stop falling
            print "in third", player.y, player.dy    
            player.y = floor
            player.dy = 0


