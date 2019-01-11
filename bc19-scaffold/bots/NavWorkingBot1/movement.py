import communications
import pathfinding

def calculate_dir(start, target):
    dx = target[0] - start[0]
    dy = target[1] - start[1]
    if dx < 0:
        dx = -1
    elif dx > 0:
        dx = 1
    
    if dy < 0:
        dy = -1
    elif dy > 0: 
        dy = 1
    
    return (dx, dy)

def move_to_specified_position(robot, unit_signal):
    nearest_mine = communications.convert_message_to_position(unit_signal)
    if nearest_mine:
        tile_to_move_to = pathfinding.astar_search(robot, (robot.me.x, robot.me.y), nearest_mine)
    if tile_to_move_to == None:
        return None
    else:
        return tile_to_move_to[0]

