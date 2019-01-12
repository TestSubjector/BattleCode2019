import utility
# TODO - Function such that if a combat unit sees enemy, call combat_module

def sort_visible_units_by_distance(robot):
    visible = robot.get_visible_robots()

    bots = []
    bots_distance = []
    if visible == None:
        return []
    for r in visible:
        if not robot.is_visible(r):
            continue
        # now all in vision range, can see x, y etc
        bots_distance.append((r['x'] - robot.me['x'])**2 + (r['y'] - robot.me['y'])**2)
        bots.append(r)

    store1, store2 = utility.insertionSort(bots_distance, bots)
    return store2

def sort_visible_friendlies_by_distance(robot):
    visible = robot.get_visible_robots()

    friendly_bots = []
    friendly_bots_distance = []
    if visible == None:
        return []
    for r in visible:
        if not robot.is_visible(r):
            continue
        # now all in vision range, can see x, y etc
        if r['team'] == robot.me['team']:
            friendly_bots_distance.append((r['x'] - robot.me['x'])**2 + (r['y'] - robot.me['y'])**2)
            friendly_bots.append(r)

    store1, store2 = utility.insertionSort(friendly_bots_distance, friendly_bots)
    return store2

def sort_visible_enemies_by_distance(robot):
    visible = robot.get_visible_robots()

    enemy_bots = []
    enemy_bots_distance = []
    if visible == None:
        return []
    for r in visible:
        if not robot.is_visible(r):
            continue
        # now all in vision range, can see x, y etc
        if r['team'] != robot.me['team']:
            enemy_bots_distance.append((r['x'] - robot.me['x'])**2 + (r['y'] - robot.me['y'])**2)
            enemy_bots.append(r)

    store1, store2 = utility.insertionSort(enemy_bots_distance, enemy_bots)
    return store2

def all_karbonite(robot):
    karb_count = 0
    for row in robot.karbonite_map:
        for cell in row:
            if cell == True:
                karb_count+=1
    return karb_count

def all_fuel(robot):
    fuel_count = 0
    for row in robot.fuel_map:
        for cell in row:
            if cell == True:
                fuel_count+=1
    return fuel_count