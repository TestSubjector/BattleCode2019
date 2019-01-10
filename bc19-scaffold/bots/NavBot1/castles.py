import utility
from battlecode import SPECS

# Add code for locked castles

def castle(robot):
    friendly_units = all_friendly_units(robot)

    robot.log(str([unit.id for unit in vision.sort_visible_friendlies_by_distance(robot)]))
    if robot.step < 2:
        # self.log("Building a crusader at " + str(self.me['x']+1) + ", " + str(self.me['y']+1))
        return castle_build(robot, SPECS['PILGRIM'])
    # elif robot.step > 500 and robot.karbonite > 100 and robot.fuel > 200:
    #     return castle_build(robot, SPECS['PILGRIM'])
    else:
        None
        # self.log("Castle health: " + self.me['health'])

def castle_build(robot, unit_type):
    pos_x = robot.me.x
    pos_y = robot.me.y
    occupied_map = robot.get_visible_robot_map()
    passable_map = robot.get_passable_map()
    directions = utility.cells_around()
    for direction in directions:
        if (not utility.is_cell_occupied(occupied_map, pos_x + direction[1],  pos_y + direction[0])) and passable_map[pos_y + direction[0]][pos_x + direction[1]] == 1:
            return robot.build_unit(unit_type, direction[1], direction[0])

def all_friendly_units(robot):
    all_units = robot.get_visible_robots()

    friendly_units = []
    visible = []
    for unit in all_units:
        if unit.team == None:
            friendly_units.append(unit)
        elif robot.me.team == unit.team:
            friendly_units.append(unit)

    return friendly_units