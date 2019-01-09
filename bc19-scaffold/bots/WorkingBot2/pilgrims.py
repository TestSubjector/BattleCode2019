import utility
import vision
from battlecode import SPECS

def pilgrim(robot):
    carry_karb = robot.me.karbonite
    carry_fuel = robot.me.fuel
    pos_x = robot.me.x
    pos_y = robot.me.y

    if carry_fuel > 50 or carry_karb > 16 :
        # robot.log("Nearing capacity")
        return pilgrim_full(robot)

    # robot.log('Position is ' + str(pos_x) + ' ' + str(pos_y))
    ab =  pilgrim_mine(robot)
    if ab !=0:
        return ab
    else:
        bc = pilgrim_move(robot)
        if bc !=0:
            return bc

def pilgrim_move(robot):
    if robot.fuel <= 2 :
        return 0
    pos_x = robot.me.x
    pos_y = robot.me.y

    passable_map = robot.get_passable_map()
    karb_map = robot.get_karbonite_map()
    fuel_map = robot.get_fuel_map()
    occupied_map = robot.get_visible_robot_map()
    directions = utility.cells_around()
    # May change for impossible resources
    for direction in directions:
        if (not utility.is_cell_occupied(occupied_map, pos_x + direction[1],  pos_y + direction[0])) and (karb_map[pos_y + direction[0]][pos_x + direction[1]] == 1 or fuel_map[pos_y + direction[0]][pos_x + direction[1]] == 1):
            return robot.move(direction[1], direction[0])
    # Just move
    for direction in directions:
        if (not utility.is_cell_occupied(occupied_map, pos_x + direction[1],  pos_y + direction[0])) and passable_map[pos_y + direction[0]][pos_x + direction[1]] == 1:
            return robot.move(direction[1], direction[0])

    return 0

def pilgrim_mine(robot):
    pos_x = robot.me.x
    pos_y = robot.me.y

    karb_map = robot.get_karbonite_map()
    fuel_map = robot.get_fuel_map()

    if karb_map[pos_y][pos_x] == 1 or fuel_map[pos_y][pos_x] == 1:
        return robot.mine()
    else:
        return 0

def pilgrim_full(robot):
    unit_church = SPECS['CHURCH']

    pos_x = robot.me.x
    pos_y = robot.me.y
    carry_karb = robot.me.karbonite
    carry_fuel = robot.me.fuel

    karb_map = robot.get_karbonite_map()
    fuel_map = robot.get_fuel_map()
    passable_map = robot.get_passable_map()
    occupied_map = robot.get_visible_robot_map()
    directions = [(-1, -1), (1, 1)]

    if karb_map[pos_y][pos_x] == 1 or fuel_map[pos_y][pos_x] == 1:
        friendly_units = vision.sort_visible_friendlies_by_distance(robot)
        if friendly_units:
            for f_unit in friendly_units:
                dx = f_unit.x - pos_x
                dy = f_unit.y - pos_y
                if f_unit.unit == unit_church: 
                    # robot.log(str((dx, dy)))
                    if abs(dx) <= 1 and abs(dy) <= 1 and (robot.get_visible_robot_map()[pos_y + dy][pos_x + dx] > 0):
                        robot.log("Giving church " + str(f_unit.id) + " " + str(carry_karb) + " karbonite and " + str(carry_fuel) + " fuel.")
                        robot.log(str(f_unit))
                        robot.log(str(robot.me))
                        robot.log(str((dx, dy)))
                        # if utility.is_cell_occupied(occupied_map, pos_x + f_unit.x - pos_x, pos_y + f_unit.y - pos_y):
                        #     robot.log("Exists")
                        return robot.give(dx, dy, carry_karb, carry_fuel)
        
        for direction in directions:
            if (not utility.is_cell_occupied(occupied_map, pos_x + direction[1],  pos_y + direction[0])) and (karb_map[pos_y + direction[0]][pos_x + direction[1]] != 1 or fuel_map[pos_y + direction[0]][pos_x + direction[1]] != 1) and passable_map[pos_y + direction[0]][pos_x + direction[1]] == 1:
                if robot.karbonite > 50 and robot.fuel > 200:
                    robot.log("Drop a church like it's hot")
                    return robot.build_unit(unit_church, direction[1], direction[0])

