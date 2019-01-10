
def crusaders_move(self):
    self.log("Crusader health: " + str(self.me['health']))
    # The directions: North, NorthEast, East, SouthEast, South, SouthWest, West, NorthWest
    choices = [(0,-1), (1, -1), (1, 0), (1, 1), (0, 1), (-1, 1), (-1, 0), (-1, -1)]
    choice = random.choice(choices)
    self.log('TRYING TO MOVE IN DIRECTION ' + str(choice))
    return choice