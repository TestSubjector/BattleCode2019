import constants
import vision

def give_military_command(robot, recieved_message = 0, self_signal = 0):
    if recieved_message == 0 and self_signal == 0:
        return default_military_behaviour(robot)

def default_military_behaviour(robot):
    unit_type = robot.me.unit

    if unit_type == constants.unit_crusader:
        visible_enemy_distance, visible_enemy_list = vision.sort_visible_enemies_by_distance(robot)
        if not visible_enemy_list:
            return None
        else:
            unit_attackrange_max = constants.crusader_max_attack_range
            unit_pos = (robot.me.x, robot.me.y)
            unit_will_attack_list = []
            unit_will_kill_list = []
            for enemy in visible_enemy_list:
                None
    elif unit_type == constants.unit_preacher:
        return None
    elif unit_type == constants.unit_prophet:
        return None