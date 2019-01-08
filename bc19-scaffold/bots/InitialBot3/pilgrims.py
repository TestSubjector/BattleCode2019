from battlecode import SPECS

def pilgrim(robot):
    carry_karb = robot.me.karbonite
    carry_fuel = robot.me.fuel
    pos_x = robot.me.x
    pos_y = robot.me.y

    if carry_fuel > 90 or carry_karb > 18 :
        robot.log("Nearing capacity")
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
    pos_x = robot.me.x
    pos_y = robot.me.y
    passable_map = robot.get_passable_map()
    karb_map = robot.get_karbonite_map()
    fuel_map = robot.get_fuel_map()
    bounds_map = len(robot.map)

    # May change for impossible resources
    # SE
    if (pos_x + 1 < bounds_map and pos_y + 1 <bounds_map) and (karb_map[pos_x + 1][pos_y + 1] == 1 or fuel_map[pos_x + 1][pos_y + 1] == 1):
        return robot.move(1, 1)
    # E
    elif (pos_x + 1 < bounds_map) and (karb_map[pos_x + 1][pos_y + 0] == 1 or fuel_map[pos_x + 1][pos_y + 0] == 1):
        return robot.move(0, 1)
    # NE
    elif (pos_x + 1 < bounds_map and pos_y - 1 >= 0) and (karb_map[pos_x + 1][pos_y - 1] == 1 or fuel_map[pos_x + 1][pos_y - 1] == 1):
        return robot.move(-1, 1)
    # N
    elif (pos_y - 1 >= 0) and (karb_map[pos_x + 0][pos_y - 1] == 1 or fuel_map[pos_x + 0][pos_y - 1] == 1):
        return robot.move(-1, 0)
    # NW
    elif (pos_x - 1 >= 0 and pos_y - 1 >= 0) and (karb_map[pos_x - 1][pos_y - 1] == 1 or fuel_map[pos_x - 1][pos_y - 1] == 1):
        return robot.move(-1, -1)
    # W
    elif (pos_x - 1 >= 0) and (karb_map[pos_x - 1][pos_y + 0] == 1 or fuel_map[pos_x - 1][pos_y + 0] == 1):
        return robot.move(0, -1)
    # SW
    elif (pos_x - 1 >= 0 and pos_y + 1 < bounds_map) and (karb_map[pos_x - 1][pos_y + 1] == 1 or fuel_map[pos_x - 1][pos_y + 1] == 1):
        return robot.move(1, -1)
    # S
    elif (pos_x >= 0 and pos_y + 1 < bounds_map) and (karb_map[pos_x + 0][pos_y + 1] == 1 or fuel_map[pos_x + 0][pos_y + 1] == 1):
        return robot.move(1, 0)
    else:
        # Just move
        if pos_x + 1 < bounds_map and pos_y + 1 <bounds_map and passable_map[pos_x + 1][pos_y + 1] == 1:
            return robot.move(1, 1)
        # E
        elif pos_x + 1 < bounds_map and passable_map[pos_x + 1][pos_y + 0] == 1:
            return robot.move(0, 1)
        # SE
        elif pos_x + 1 < bounds_map and pos_y - 1 >= 0 and passable_map[pos_x + 1][pos_y - 1] == 1:
            return robot.move(-1, 1)
        # S
        elif pos_y - 1 >= 0 and passable_map[pos_x + 0][pos_y - 1] == 1:
            return robot.move(-1, 1)
        # SW
        elif pos_x - 1 >= 0 and pos_y - 1 >= 0 and passable_map[pos_x - 1][pos_y - 1] == 1:
            return robot.move(-1, -1)
        # W
        elif pos_x - 1 >= 0 and passable_map[pos_x - 1][pos_y + 0] == 1:
            return robot.move(0, -1)
        # NW
        elif pos_x - 1 >= 0 and passable_map[pos_x - 1][pos_y + 1] == 1:
            return robot.move(-1, 1)
        # N
        elif pos_x >= 0 and pos_y + 1 < bounds_map and passable_map[pos_x + 0][pos_y + 1] == 1:
            return robot.move(1, 0)
        else:
            return 0

def pilgrim_mine(robot):
    pos_x = robot.me.x
    pos_y = robot.me.y

    karb_map = robot.get_karbonite_map()
    fuel_map = robot.get_fuel_map()
    if karb_map[pos_x][pos_y] == 1 or fuel_map[pos_x][pos_y] == 1:
        return robot.mine()
    else:
        return 0

def pilgrim_full(robot):
    unit_church = SPECS['CHURCH']

    pos_x = robot.me.x
    pos_y = robot.me.y

    karb_map = robot.get_karbonite_map()
    fuel_map = robot.get_fuel_map()

    if karb_map[pos_x][pos_y] == 1 or fuel_map[pos_x][pos_y] == 1:
        # SE
        if (pos_x + 1 < bounds_map and pos_y + 1 < bounds_map) and (karb_map[pos_x + 1][pos_y + 1] != 1 or fuel_map[pos_x + 1][pos_y + 1] != 1):
            return robot.move(1, 1)
        # E
        elif (pos_x + 1 < bounds_map) and (karb_map[pos_x + 1][pos_y + 0] != 1 or fuel_map[pos_x + 1][pos_y + 0] != 1):
            return robot.move(0, 1)
        # NE
        elif (pos_x + 1 < bounds_map and pos_y - 1 >= 0) and (karb_map[pos_x + 1][pos_y - 1] != 1 or fuel_map[pos_x + 1][pos_y - 1] != 1):
            return robot.move(-1, 1)
        # N
        elif (pos_y - 1 >= 0) and (karb_map[pos_x + 0][pos_y - 1] != 1 or fuel_map[pos_x + 0][pos_y - 1] != 1):
            return robot.move(-1, 0)
        # NW
        elif (pos_x - 1 >= 0 and pos_y - 1 >= 0) and (karb_map[pos_x - 1][pos_y - 1] != 1 or fuel_map[pos_x - 1][pos_y - 1] != 1):
            return robot.move(-1, -1)
        # W
        elif (pos_x - 1 >= 0) and (karb_map[pos_x - 1][pos_y + 0] != 1 or fuel_map[pos_x - 1][pos_y + 0] != 1):
            return robot.move(0, -1)
        # SW
        elif (pos_x - 1 >= 0 and pos_y + 1 < bounds_map) and (karb_map[pos_x - 1][pos_y + 1] != 1 or fuel_map[pos_x - 1][pos_y + 1] != 1):
            return robot.move(1, -1)
        # S
        elif (pos_x >= 0 and pos_y + 1 < bounds_map) and (karb_map[pos_x + 0][pos_y + 1] != 1 or fuel_map[pos_x + 0][pos_y + 1] != 1):
            return robot.move(1, 0)
    else:
        robot.log("Drop a church like it's hot")
        return robot.build_unit(unit_church)