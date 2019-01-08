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

def pilgrim_mine(robot):
    pos_x = robot.me.x
    pos_y = robot.me.y

    karb_map = robot.get_karbonite_map()
    fuel_map = robot.get_fuel_map()
    if karb_map[pos_x][pos_y] == 1 or fuel_map[pos_x][pos_y] == 1:
        return robot.mine()
    else:
        return 0        
        
def pilgrim_move(robot):
    pos_x = robot.me.x
    pos_y = robot.me.y
    passable_map = robot.get_passable_map()
    karb_map = robot.get_karbonite_map()
    fuel_map = robot.get_fuel_map()
    # May change for impossible resources
    # NE
    if karb_map[pos_x + 1][pos_y + 1] == 1 or fuel_map[pos_x + 1][pos_y + 1] == 1:
        return robot.move(1, 1)
    # E
    elif karb_map[pos_x + 1][pos_y + 0] == 1 or fuel_map[pos_x + 1][pos_y + 0] == 1:
        return robot.move(0, 1)
    # SE
    elif karb_map[pos_x + 1][pos_y - 1] == 1 or fuel_map[pos_x + 1][pos_y - 1] == 1:
        return robot.move(-1, 1)
    # S
    elif karb_map[pos_x + 0][pos_y - 1] == 1 or fuel_map[pos_x + 0][pos_y - 1] == 1:
        return robot.move(-1, 0)
    # SW
    elif karb_map[pos_x - 1][pos_y - 1] == 1 or fuel_map[pos_x - 1][pos_y - 1] == 1:
        return robot.move(-1, -1)
    # W
    elif karb_map[pos_x - 1][pos_y + 0] == 1 or fuel_map[pos_x - 1][pos_y + 0] == 1:
        return robot.move(0, -1)
    # NW
    elif karb_map[pos_x - 1][pos_y + 1] == 1 or fuel_map[pos_x - 1][pos_y + 1] == 1:
        return robot.move(1, -1)
    # N
    elif karb_map[pos_x + 0][pos_y + 1] == 1 or fuel_map[pos_x + 0][pos_y + 1] == 1:
        return robot.move(1, 0)
    else:
        # Just move
        if passable_map[pos_x + 1][pos_y + 1] == 1:
            return robot.move(1, 1)
        # E
        elif passable_map[pos_x + 1][pos_y + 0] == 1:
            return robot.move(0, 1)
        # SE
        elif passable_map[pos_x + 1][pos_y - 1] == 1:
            return robot.move(-1, 1)
        # S
        elif passable_map[pos_x + 0][pos_y - 1] == 1:
            return robot.move(-1, 1)
        # SW
        elif passable_map[pos_x - 1][pos_y - 1] == 1:
            return robot.move(-1, -1)
        # W
        elif passable_map[pos_x - 1][pos_y + 0] == 1:
            return robot.move(0, -1)
        # NW
        elif passable_map[pos_x - 1][pos_y + 1] == 1:
            return robot.move(-1, 1)
        # N
        elif passable_map[pos_x + 0][pos_y + 1] == 1:
            return robot.move(1, 0)
        else: 
            return 0

def pilgrim(robot):
    carry_karb = robot.me.karbonite 
    carry_fuel = robot.me.fuel
    pos_x = robot.me.x
    pos_y = robot.me.y
    
    # if carry_fuel > 69 or carry_karb > 17:
    #     go_home(robot)
    
    robot.log('Position is ' + str(pos_x) + ' ' + str(pos_y))
    ab =  pilgrim_mine(robot)
    if ab !=0:
        return ab
    else:
        bc = pilgrim_move(robot)
        if bc !=0:
            return bc
    


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
        
        # if unit_type == unit_crusader:
        #     return self.move(crusaders_move(self))

        elif unit_type == unit_castle:
            if self.step < 5:
                # self.log("Building a crusader at " + str(self.me['x']+1) + ", " + str(self.me['y']+1))
                return self.build_unit(unit_pilgrim, 1, 1)
            else:
                None
                # self.log("Castle health: " + self.me['health'])
        elif unit_type == unit_pilgrim:
            return pilgrim(self)

robot = MyRobot()
