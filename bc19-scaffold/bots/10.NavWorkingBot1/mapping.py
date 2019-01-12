def get_nearby_map(x, y, given_map, grid_radius = 2):
    sub_side = grid_radius * 2 + 1
    sub_map = []

    for i in range(sub_side):
        for j in range(sub_side):
            try:
                sub_map.append(given_map[y-grid_radius+i][x-grid_radius+j] == True)
            except:
                sub_map.append(False)

    return sub_map

def get_map_ratio(x, y, given_map, grid_radius = 2):
    nearby = get_nearby_map(x, y, given_map, grid_radius)
    full = 0

    for cell in nearby:
        if cell == True:
            full += 1

    return full/((grid_radius * 2 + 1)**2)

def analyze_map(given_map, grid_radius = 2):
    sub_side = grid_radius * 2 + 1
    results = []

    y = grid_radius + 1
    while y < len(given_map):
        x = grid_radius + 1
        while x < len(given_map):
            results.append((x, y, get_map_ratio(x, y, given_map, grid_radius)))
            x += sub_side
        y += sub_side

    return results

def check_hoz_symmetry(given_map):
    start = 0
    end = len(given_map) - 1

    while start < end:
        for i in range(len(given_map[start])):
            if given_map[start][i] != given_map[end][i]:
                return False
        start += 1
        end -= 1

    return True

def find_chokepoints(passable_map, grid_size = 2):
    sub_side = grid_radius * 2 + 1
    results = []

    y = grid_radius + 1
    while y < len(given_map):
        x = grid_radius + 1
        while x < len(given_map):
            ratio = get_map_ratio(x, y, given_map, grid_radius)
            if (ratio > .6):
                results.append((x, y, ratio))
            x += sub_side
        y += sub_side

    return results