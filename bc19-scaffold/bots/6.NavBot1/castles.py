import utility
import communications
import vision
from battlecode import SPECS

# Add code for locked castles

def castle(robot):
    unit_castle = SPECS['CASTLE']
    unit_church = SPECS['CHURCH']
    unit_crusader = SPECS['CRUSADER']
    unit_pilgrim = SPECS['PILGRIM']
    unit_preacher = SPECS['PREACHER']
    unit_prophet = SPECS['PROPHET']

    castle_count = 0
    church_count = 0
    crusader_count = 0
    pilgrim_count = 0
    preacher_count = 0
    prophet_count = 0
    friendly_units = castle_all_friendly_units(robot)
    total_karbonite = vision.all_karbonite(robot)
    total_fuel = vision.all_fuel(robot)

    for f_unit in friendly_units:
        if f_unit.unit == unit_castle:
            castle_count+=1
        elif f_unit.unit == unit_church:
            church_count+=1
        elif f_unit.unit == unit_crusader:
            crusader_count+=1
        elif f_unit.unit == unit_pilgrim:
            pilgrim_count+=1
        elif f_unit.unit == unit_preacher:
            preacher_count+=1
        elif f_unit.unit == unit_prophet:
            prophet_count+=1

    # robot.log(str([unit.id for unit in vision.sort_visible_friendlies_by_distance(robot)]))

    # If nothing else, replicate your own last message
    communications.self_communicate_loop(robot)

    if robot.step < 2:
        # self.log("Building a crusader at " + str(self.me['x']+1) + ", " + str(self.me['y']+1))
        robot.signal(robot.me.signal + 1, 2)
        return castle_build(robot, unit_pilgrim)
    elif robot.step > 500 and robot.karbonite > 100 and robot.fuel > 200:
        robot.signal(robot.me.signal + 1, 2)
        return castle_build(robot, unit_pilgrim)
    elif (total_fuel + total_karbonite) * .55 < pilgrim_count and robot.karbonite > 100 and robot.fuel > 200:
        return castle_build(robot, unit_pilgrim)
    else:
        None
        # self.log("Castle health: " + self.me['health'])
    # robot.log(str(robot.me.signal))

def castle_build(robot, unit_type):
    pos_x = robot.me.x
    pos_y = robot.me.y
    occupied_map = robot.get_visible_robot_map()
    passable_map = robot.get_passable_map()
    directions = utility.cells_around()
    for direction in directions:
        if (not utility.is_cell_occupied(occupied_map, pos_x + direction[1],  pos_y + direction[0])) and passable_map[pos_y + direction[0]][pos_x + direction[1]] == 1:
            return robot.build_unit(unit_type, direction[1], direction[0])

def castle_all_friendly_units(robot):
    all_units = robot.get_visible_robots()

    friendly_units = []
    for unit in all_units:
        if unit.team == None:
            friendly_units.append(unit)
        elif robot.me.team == unit.team:
            friendly_units.append(unit)

    return friendly_units