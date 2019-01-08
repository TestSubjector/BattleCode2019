def castle(robot)
    if self.step < 5:
        # self.log("Building a crusader at " + str(self.me['x']+1) + ", " + str(self.me['y']+1))
        return robot.build_unit(unit_pilgrim, 1, 1)
    else:
        None
        # self.log("Castle health: " + self.me['health'])