def get_nearby_map(x, y, given_map):
    return [[given_map[y-2][x-2], given_map[y-2][x-1], given_map[y-2][x], given_map[y-2][x+1], given_map[y-2][x+2]], [given_map[y-1][x-2], given_map[y-1][x-1], given_map[y-1][x], given_map[y-1][x+1], given_map[y-1][x+2]], [given_map[y][x-2], given_map[y][x-1], given_map[y][x], given_map[y][x+1], given_map[y][x+2]], [given_map[y+1][x-2], given_map[y+1][x-1], given_map[y+1][x], given_map[y+1][x+1], given_map[y+1][x+2]], [given_map[y+2][x+2], given_map[y+2][x-1], given_map[y+2][x], given_map[y+2][x+1], given_map[y+2][x+2]]]

def get_map_ratio(x, y, given_map):
    nearby = get_nearby_map(x, y, given_map)
    full = 0
    for col in nearby:
        for cell in col:
            if cell == True:
                full += 1
    return full/25
