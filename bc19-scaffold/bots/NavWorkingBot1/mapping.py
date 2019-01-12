def get_nearby_map(x, y, given_map, grid_radius = 2):
    sub_map = []

    for i in range(grid_radius * 2 + 1):
        row = []
        for j in range(grid_radius * 2 + 1):
            try:
                row.append(given_map[y-grid_radius+i][x-grid_radius+j] == True)
            except:
                row.append(False)
        sub_map.append(row)

    return sub_map

def get_map_ratio(x, y, given_map, grid_radius = 2):
    nearby = get_nearby_map(x, y, given_map, grid_radius)
    full = 0

    for row in nearby:
        for cell in row:
            if cell == True:
                full += 1

    return full/((grid_radius * 2 + 1)**2)

def analyze_map(given_map, grid_radius = 2):
    x = grid_radius + 1
    y = grid_radius + 1

    results = []

    y = 0
    while y < len(given_map):
        x = 0
        result_row = []
        while x < len(given_map):
            result = []
            result.append((x,y))
            result.append(get_map_ratio(x, y, given_map, grid_radius))
            result_row.append(result)
            x += grid_radius * 2 + 1
        results.append(result_row)
        y += grid_radius * 2 + 1

    return results