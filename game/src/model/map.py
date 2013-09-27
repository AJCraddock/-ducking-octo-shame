
class Map:
    def __init__(self, player, game_entities, grid_width, grid_height):
        self.grid = [[None for i in range(grid_width)] for j in range[grid_height]]
        self.player = player
        self.game_entities = game_entities