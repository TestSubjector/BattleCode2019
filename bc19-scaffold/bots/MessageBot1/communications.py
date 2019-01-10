def message_to_castles(robot, mesg_type):
    robot.castleTalk(mesg_type)
    # # Position requesting for pilgrims
    # if mesg_type == 0:
    #     temp_store = ((robot.me.x * 1000) + robot.me.y) * 1000 + 0
    #     robot.castleTalk(temp_store)
    # # Position requesting for combat units
    # if mesg_type == 1:
    #     temp_store = ((robot.me.x * 1000) + robot.me.y) * 1000 + 1
    #     robot.castleTalk(temp_store)

def self_communicate_loop(robot):
    robot.signal(robot.me.signal, 0)
