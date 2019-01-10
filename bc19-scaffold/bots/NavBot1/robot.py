from battlecode import BCAbstractRobot, SPECS
import battlecode as bc
import pathfinding

from castle import *
from crusaders import *
from pilgrims import *

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

        # DEBUG
        # self.log("START TURN " + self.step)

        if self.step % 750 == 1:
            self.log("Running pathfinding")
            pathfinding.astar_search(robot, (robot.me.x, robot.me.y), (robot.me.x - 4, robot.me.y - 4))

        if self.step % 250 == 0:
            # robot.log(str(self.me))
            self.log("Total current karbonite is " + str(self.karbonite))

        if unit_type == unit_crusader:
            return self.move(crusaders_move(self))

        if unit_type == unit_castle:
            return castle(self)
        elif unit_type == unit_pilgrim:
            return pilgrim(self)

robot = MyRobot()
