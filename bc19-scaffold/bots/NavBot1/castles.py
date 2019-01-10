import utility
import communications
from battlecode import SPECS

# Add code for locked castles

def castle(robot):

    # If nothing else, replicate your own last message
    communications.self_communicate_loop(robot)
    
    if robot.step < 2:
        # self.log("Building a crusader at " + str(self.me['x']+1) + ", " + str(self.me['y']+1))
        robot.signal(robot.me.signal + 1, 0)
        return castle_build(robot, SPECS['PILGRIM'])
    elif robot.step > 500 and robot.karbonite > 100 and robot.fuel > 200:
        return castle_build(robot, SPECS['PILGRIM'])
    else:
        None
        # self.log("Castle health: " + self.me['health'])
    robot.log(str(robot.me.signal))

def castle_build(robot, unit_type):
    pos_x = robot.me.x
    pos_y = robot.me.y
    occupied_map = robot.get_visible_robot_map()
    passable_map = robot.get_passable_map()
    directions = utility.cells_around()
    for direction in directions:
        if (not utility.is_cell_occupied(occupied_map, pos_x + direction[1],  pos_y + direction[0])) and passable_map[pos_y + direction[0]][pos_x + direction[1]] == 1:
            return robot.build_unit(unit_type, direction[1], direction[0])
