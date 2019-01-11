def get_nearby_map(x, y, given_map, grid_size = 2):
    sub_map = []

    for i in range(grid_size * 2 + 1):
        col = []
        for j in range(grid_size * 2 + 1):
            col.append(given_map[y-grid_size+i][x-grid_size+j])
        sub_map.append(col)

    return sub_map

def get_map_ratio(x, y, given_map):
    nearby = get_nearby_map(x, y, given_map)
    full = 0
    for col in nearby:
        for cell in col:
            if cell == True:
                full += 1
    return full/25
