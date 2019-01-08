from battlecode import SPECS

def castle(robot):
    if robot.step < 2:
        # self.log("Building a crusader at " + str(self.me['x']+1) + ", " + str(self.me['y']+1))
        return robot.build_unit(SPECS['PILGRIM'], 1, 1)
    else:
        None
        # self.log("Castle health: " + self.me['health'])