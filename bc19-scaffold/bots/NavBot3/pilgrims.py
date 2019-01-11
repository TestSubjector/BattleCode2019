import utility
import vision
import communications
import pathfinding
from battlecode import SPECS

def pilgrim(robot):
    communications.self_communicate_loop(robot)

    if robot.me.signal == 0:
        for friendly_unit in vision.sort_visible_friendlies_by_distance(robot):
            if friendly_unit.unit == 0 and friendly_unit.signal > -1:
                robot.signal(friendly_unit.signal, 0)
                break

    unit_signal = robot.me.signal

    carry_karb = robot.me.karbonite
    carry_fuel = robot.me.fuel
    pos_x = robot.me.x
    pos_y = robot.me.y

    if carry_fuel > 80 or carry_karb > 18 :
        # robot.log("Nearing capacity")
        return pilgrim_full(robot)

    # robot.log('Position is ' + str(pos_x) + ' ' + str(pos_y))
    ab =  pilgrim_mine(robot)
    if ab !=0:
        return ab
    else:
        bc = pilgrim_move(robot, unit_signal)
        if bc !=0:
            return bc
    
def move_to_specified_mine(robot, unit_signal):
    nearest_mine_list = utility.get_relative_mine_positions(robot)
    if robot.step != 0:
        unit_signal -= 1
    if unit_signal < len(nearest_mine_list):
        # robot.log(nearest_mine_list)
        # robot.log(nearest_mine_list[unit_signal])
        tile_to_move_to = pathfinding.astar_search(robot, (robot.me.x, robot.me.y), nearest_mine_list[unit_signal])
    else:
        unit_signal = unit_signal % len(nearest_mine_list)
        tile_to_move_to = pathfinding.astar_search(robot, (robot.me.x, robot.me.y), nearest_mine_list[unit_signal])
    if tile_to_move_to == None:
        return None
    else:
        return tile_to_move_to[0]

def pilgrim_move(robot, unit_signal):
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
    move_to = move_to_specified_mine(robot, unit_signal)
    if move_to != None:
        # robot.log("check")
        new_pos_x, new_pos_y = move_to
        return robot.move(new_pos_x - pos_x, new_pos_y - pos_y)
    
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
    unit_castle = SPECS['CASTLE']
    unit_church = SPECS['CHURCH']

    pos_x = robot.me.x
    pos_y = robot.me.y
    carry_karb = robot.me.karbonite
    carry_fuel = robot.me.fuel

    karb_map = robot.get_karbonite_map()
    fuel_map = robot.get_fuel_map()
    passable_map = robot.get_passable_map()
    occupied_map = robot.get_visible_robot_map()
    directions = utility.cells_around()

    if karb_map[pos_y][pos_x] == 1 or fuel_map[pos_y][pos_x] == 1:
        friendly_units = vision.sort_visible_friendlies_by_distance(robot)
        if friendly_units:
            for f_unit in friendly_units:
                dx = f_unit.x - pos_x
                dy = f_unit.y - pos_y
                if f_unit.unit == unit_church or f_unit.unit == unit_castle:
                    if (dy, dx in directions) and abs(dx) <= 1 and abs(dy) <= 1 and (robot.get_visible_robot_map()[pos_y + dy][pos_x + dx] > 0):
                        return robot.give(dx, dy, carry_karb, carry_fuel)

        for direction in directions:
            if (not utility.is_cell_occupied(occupied_map, pos_x + direction[1],  pos_y + direction[0])) and (karb_map[pos_y + direction[0]][pos_x + direction[1]] != 1 or fuel_map[pos_y + direction[0]][pos_x + direction[1]] != 1) and passable_map[pos_y + direction[0]][pos_x + direction[1]] == 1:
                if robot.karbonite > 50 and robot.fuel > 200:
                    robot.log("Drop a church like it's hot")
                    return robot.build_unit(unit_church, direction[1], direction[0])

