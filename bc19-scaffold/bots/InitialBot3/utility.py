def is_cell_occupied(occupied_map, pos_x, pos_y):
    bounds_map = len(occupied_map)
    if pos_x < 0 or pos_y < 0 or pos_x >= bounds_map or pos_y >= occupied_map:
        return True 
    elif occupied_map[pos_y][pos_x] == 0 or occupied_map[pos_y][pos_x] == -1:
        return False
    else:
        return True

