import math

# Since no collection
def _is_higher_than(a, b):
    if a == None or b == None:
        return True
    return b[1] < a[1] or (a[1] == b[1] and a[2] < b[2])

# Move a node up until the parent is bigger
def _heapify(nodes, new_node_index):
    while 1 < new_node_index:
        new_node = nodes[new_node_index]
        parent_index = new_node_index / 2
        parent_node = nodes[parent_index]
        # Parent too big?
        if _is_higher_than(parent_node, new_node):
            break
        # Swap with parent
        tmp_node = parent_node
        nodes[parent_index] = new_node
        nodes[new_node_index] = tmp_node
        # Continue further up
        new_node_index = parent_index
    return nodes

# Add a new node with a given priority
def add(nodes, value, priority, insert_counter):
    new_node_index = len(nodes)
    insert_counter += 1
    nodes.append((value, priority, insert_counter))
    # Move the new node up in the hierarchy
    _heapify(nodes, new_node_index)
    return insert_counter

# Return the top element
def peek(nodes):
    if len(nodes) == 1:
        return None
    else:
        return nodes[1][0]

# Remove the top element and return it
def pop(nodes):
    if len(nodes) == 1:
        raise LookupError("Heap is empty")
    result = nodes[1][0]
    # Move empty space down
    empty_space_index = 1
    while empty_space_index * 2 < len(nodes):
        left_child_index = empty_space_index * 2
        right_child_index = empty_space_index * 2 + 1
        # Left child wins
        if (len(nodes) <= right_child_index or _is_higher_than(nodes[left_child_index], nodes[right_child_index])):
            nodes[empty_space_index] = nodes[left_child_index]
            empty_space_index = left_child_index
        # Right child wins
        else:
            nodes[empty_space_index] = nodes[right_child_index]
            empty_space_index = right_child_index
    # Swap empty space with the last element and heapify
    last_node_index = len(nodes) - 1
    nodes[empty_space_index] = nodes[last_node_index]
    _heapify(nodes, empty_space_index)
    # Throw out the last element
    nodes.pop()
    return result

# Will be really important later
def astar_heuristic(pos_initial, pos_final):
    (x1, y1) = pos_initial
    (x2, y2) = pos_final
    dx = abs(x1 - x2) 
    dy = abs(y1 - y2)
    return (dx + dy) - min(dx, dy)

def neighbours(robot, pos_intermediate):
    pos_x, pos_y = pos_intermediate
    passable_map = robot.get_passable_map()

    dirs = [(-1, 0), (-1, 1), (0, 1), (1, 1), (1, 0), (1, -1), (0, -1), (-1, -1)]
    result = []

    for dirc in dirs:
        new_pos_x = pos_x + dirc[1]
        new_pos_y = pos_y + dirc[0]
        if not (new_pos_x < 0 or new_pos_y < 0 or new_pos_x >= len(passable_map) or new_pos_y >= len(passable_map)) and passable_map[new_pos_y][new_pos_x]:
            result.append((new_pos_x , new_pos_y))
    return result

def astar_search(robot, pos_initial, pos_final):

    nodes = [None]
    insert_counter = 0
    
    passable_map = robot.get_passable_map()
    if not passable_map[pos_final[1]][pos_final[0]]:
        return

    insert_counter = add(nodes, pos_initial, 0, insert_counter)

    came_from = {}
    cost_so_far = {}
    came_from[pos_initial] = None
    cost_so_far[pos_initial] = 0


    while len(nodes) > 1:
        current = pop(nodes)

        if str(current) == str(pos_final):
            break
        
        for iter_a in neighbours(robot, current):
            new_cost = cost_so_far[current] + 1
            if iter_a not in cost_so_far or new_cost < cost_so_far[iter_a]:
                cost_so_far[iter_a] = new_cost
                priority = new_cost + astar_heuristic(pos_final, iter_a)
                # robot.log(str(priority))
                insert_counter =  add(nodes, iter_a, -priority, insert_counter)
                came_from[iter_a] = current
    
    # robot.log(str(came_from) + " " + str(cost_so_far))
