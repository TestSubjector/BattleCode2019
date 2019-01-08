from battlecode import BCAbstractRobot, SPECS
import battlecode as bc
import random


__pragma__('iconv')
__pragma__('tconv')
#__pragma__('opov')

# don't try to use global variables!!

# Helper Function

def go_home(self):
    unit_map = self.getVisibleRobotMap()
    unit_type  = SPECS['CASTLE']


def find_unit_type(self, map):
    None

# Pilgrims

class Pilgrim():
    def __init__(self, robot):
        self.pos_x = robot.me.x
        self.pos_y = robot.me.y
        self.passable_map = robot.get_passable_map()
        self.karb_map = robot.get_karbonite_map()
        self.fuel_map = robot.get_fuel_map()

        self.pilgrim(robot)


    def pilgrim_move(self, robot):

        if self.karb_map[self.pos_x + 1][self.pos_y + 1] == 1 or self.fuel_map[self.pos_x + 1][self.pos_y + 1] == 1:
            robot.move(1, 1)
        elif self.karb_map[self.pos_x + 1][self.pos_y + 0] == 1 or self.fuel_map[self.pos_x + 1][self.pos_y + 0] == 1:
            robot.move(1, 0)
        elif self.karb_map[self.pos_x + 1][self.pos_y - 1] == 1 or self.fuel_map[self.pos_x + 1][self.pos_y - 1] == 1:
            robot.move(1, -1)
        elif self.karb_map[self.pos_x + 0][self.pos_y - 1] == 1 or self.fuel_map[self.pos_x + 0][self.pos_y - 1] == 1:
            robot.move(0, -1)
        elif self.karb_map[self.pos_x - 1][self.pos_y - 1] == 1 or self.fuel_map[self.pos_x - 1][self.pos_y - 1] == 1:
            robot.move(-1, -1)
        elif self.karb_map[self.pos_x - 1][self.pos_y - 1] == 1 or self.fuel_map[self.pos_x - 1][self.pos_y - 1] == 1:
            robot.move(-1, -1)
        elif self.karb_map[self.pos_x - 1][self.pos_y - 1] == 1 or self.fuel_map[self.pos_x - 1][self.pos_y - 1] == 1:
            robot.move(-1, -1)

        # if passable_map[pos_x + 1][pos_y + 1] == 1:

    def pilgrim_mine(self, robot):

        if self.karb_map[self.pos_x][self.pos_y] == 1 or self.fuel_map[self.pos_x][self.pos_y] == 1:
            robot.mine()

    def pilgrim(self, robot):

        self.full_karb = robot.me.karbonite
        self.full_fuel = robot.me.fuel

        if self.full_fuel > 69 or self.full_karb > 17:
            go_home(robot)
        elif self.pilgrim_mine(robot):
            return 1
        elif self.pilgrim_move(robot):
            return 2



# Crusaders
def crusaders_move(self):
    # self.log("Crusader health: " + str(self.me['health']))
    # The directions: North, NorthEast, East, SouthEast, South, SouthWest, West, NorthWest
    choices = [(0,-1), (1, -1), (1, 0), (1, 1), (0, 1), (-1, 1), (-1, 0), (-1, -1)]
    choice = random.choice(choices)
    # self.log('TRYING TO MOVE IN DIRECTION ' + str(choice))
    return choice


class MyRobot(BCAbstractRobot):

    step = -1

    def turn(self):
        self.step += 1

        unit_type = self.me['unit']
        unit_castle = SPECS['CASTLE']
        unit_church = SPECS['CHURCH']
        unit_crusader = SPECS['CRUSADER']
        unit_pilgrim = SPECS['PILGRIM']
        unit_preacher = SPECS['PREACHER']
        unit_prophet = SPECS['PROPHET']

        # self.log("START TURN " + self.step)

        if self.step % 250 == 0:
            self.log("Total current karbonite is " + str(self.karbonite))

        if unit_type == unit_crusader:
            None
            # return self.move(crusaders_move(self))

        elif unit_type == unit_castle:
            if self.step < 2:
                # self.log("Building a crusader at " + str(self.me['x']+1) + ", " + str(self.me['y']+1))
                return self.build_unit(unit_pilgrim, 1, 1)
            else:
                None
                # self.log("Castle health: " + self.me['health'])
        elif unit_type == unit_pilgrim:
            Pilgrim(self)

robot = MyRobot()
