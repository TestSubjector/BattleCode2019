from battlecode import BCAbstractRobot, SPECS
import battlecode as bc
import utility

import castles
import churches
import crusaders
import pilgrims
import preachers
import prophets

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

# TODO - Add condition that team has fuel before making it move
# TODO - Before final turn, make sure that as much resources has been consumed
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
        # self.log("Running pathfinding")

        if self.step % 200 == 3 and unit_type == unit_castle:
            # robot.log(str(self.me))
            self.log("Total current karbonite is " + str(self.karbonite) + " turn " + (str(self.step)))

        if unit_type == unit_castle:
            return castles.castle(self)
        # elif unit_type == unit_church:
        #     return churches.church(self)
        elif unit_type == unit_crusader:
            return crusaders.crusader(self)
        elif unit_type == unit_preacher:
            return preachers.preacher(self)
        elif unit_type == unit_prophet:
            return prophets.prophet(self)
        elif unit_type == unit_pilgrim:
            return pilgrims.pilgrim(self)

robot = MyRobot()
