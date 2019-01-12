def sort_visible_enemies_by_distance(robot):
    visible = robot.get_visible_robots()
    
    enemy_bots = []
    enemy_bots_distance = []
    for r in visible:
        if not robot.is_visible(r):
            continue
        # now all in vision range, can see x, y etc
        enemy_bots_distance.append((r['x'] - robot.me['x'])**2 + (r['y'] - robot.me['y'])**2)
        enemy_bots.append(r)
    
    return [x for _,x in sorted(zip(enemy_bots_distance, enemy_bots))]
