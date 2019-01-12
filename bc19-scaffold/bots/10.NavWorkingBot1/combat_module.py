import constants

def give_military_command(robot, recieved_message = 0, self_signal = 0):
    if recieved_message == 0 and self_signal == 0:
        return default_military_behaviour(robot)

def default_military_behaviour(robot):
    unit_type = robot.me.unit
    if unit_type == constants.unit_crusader:
        return None
    elif unit_type == constants.unit_preacher:
        return None
    elif unit_type == constants.unit_prophet:
        return None