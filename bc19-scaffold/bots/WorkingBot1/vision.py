def sort_visible_enemies_by_distance(robot):
    occupied_map = robot.get_visible_robot_map()
    for iter_i in occupied_map:
        robot.log(str(iter_i))
