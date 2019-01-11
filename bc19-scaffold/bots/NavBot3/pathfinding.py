import math
from itertools import islice, repeat, count, tee, chain
import utility

# Since no collection
def _is_higher_than(a, b):
    if a == None or b == None:
        return True
    return b[1] < a[1] or (a[1] == b[1] and a[2] < b[2])

# Move a node up until the parent is bigger

def heappush(heap, item):
    """Push item onto heap, maintaining the heap invariant."""
    heap.append(item)
    _siftdown(heap, 0, len(heap)-1)

def heappop(heap):
    """Pop the smallest item off the heap, maintaining the heap invariant."""
    lastelt = heap.pop()    # raises appropriate IndexError if heap is empty
    if heap:
        returnitem = heap[0]
        heap[0] = lastelt
        _siftup(heap, 0)
    else:
        returnitem = lastelt
    return returnitem

def heappushpop(heap, item):
    """Fast version of a heappush followed by a heappop."""
    if heap and heap[0] < item:
        item, heap[0] = heap[0], item
        _siftup(heap, 0)
    return item

def heapify(x):
    """Transform list into a heap, in-place, in O(len(heap)) time."""
    n = len(x)
    for i in reversed(xrange(n//2)):
        _siftup(x, i)

def _siftdown(heap, startpos, pos):
    newitem = heap[pos]
    # Follow the path to the root, moving parents down until finding a place
    # newitem fits.
    while pos > startpos:
        parentpos = (pos - 1) >> 1
        parent = heap[parentpos]
        if newitem < parent:
            heap[pos] = parent
            pos = parentpos
            continue
        break
    heap[pos] = newitem

def _siftup(heap, pos):
    endpos = len(heap)
    startpos = pos
    newitem = heap[pos]
    # Bubble up the smaller child until hitting a leaf.
    childpos = 2*pos + 1    # leftmost child position
    while childpos < endpos:
        # Set childpos to index of smaller child.
        rightpos = childpos + 1
        if rightpos < endpos and not heap[childpos] < heap[rightpos]:
            childpos = rightpos
        # Move the smaller child up.
        heap[pos] = heap[childpos]
        pos = childpos
        childpos = 2*pos + 1
    # The leaf at pos is empty now.  Put newitem there, and bubble it up
    # to its final resting place (by sifting its parents down).
    heap[pos] = newitem
    _siftdown(heap, startpos, pos)



def astar_search(robot, pos_initial, pos_final):
    robot.log(robot.me.time)
    dirs = [(-1, 1), (1, 1), (1, -1), (-1, -1), (0, 1), (0, -1), (1, 0), (-1, 0)]

    nodes = [None]
    insert_counter = 0
    block_kicker = 0

    came_from = {}
    cost_so_far = {}
    came_from[pos_initial] = None
    cost_so_far[pos_initial] = 0
    occupied_map = robot.get_visible_robot_map()
    passable_map = robot.get_passable_map()

    if utility.is_out_of_bounds(occupied_map, pos_final[0], pos_final[1]) or not passable_map[pos_final[1]][pos_final[0]]:
        return ()

    def retrace_path(pos_initial, pos_final, came_from):
        current = pos_final 
        path = []
        while current != pos_initial: 
           path.append(current)
           current = came_from[current]
        # path.append(pos_initial) 
        path.reverse()
        return path

    def neighbours(pos_intermediate):
        pos_x, pos_y = pos_intermediate
        result = []
        for dirc in dirs:
            new_pos_x = pos_x + dirc[1]
            new_pos_y = pos_y + dirc[0]
            if not utility.is_cell_occupied(occupied_map, new_pos_x, new_pos_y) and passable_map[new_pos_y][new_pos_x]:
                result.append((new_pos_x , new_pos_y))
        return result

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
    def astar_heuristic(pos_intermediate, pos_final):
        (x1, y1) = pos_intermediate
        (x2, y2) = pos_final
        dx = abs(x1 - x2) 
        dy = abs(y1 - y2)
        heuristic = (dx + dy) - min(dx, dy)
        return heuristic * (1.001)

    insert_counter = add(nodes, pos_initial, 0, insert_counter)

    while len(nodes) > 1:
        current = pop(nodes)

        if robot.me.time < 70:
            return retrace_path(pos_initial, current, came_from)
        elif robot.me.time < 50:
            robot.log("=> + " + str(len(nodes)))
            return ()
        elif str(current) == str(pos_final) or block_kicker > 100:
            robot.log("=> * " + str(len(nodes)))
            return retrace_path(pos_initial, current, came_from)

        for iter_a in neighbours(current):
            if iter_a:
                new_cost = cost_so_far[current] + 1
                if iter_a not in cost_so_far or new_cost < cost_so_far[iter_a]:
                    cost_so_far[iter_a] = new_cost
                    priority = new_cost + astar_heuristic(iter_a, pos_final)
                    # robot.log(str(priority))
                    insert_counter =  add(nodes, iter_a, -priority, insert_counter)
                    came_from[iter_a] = current
        block_kicker += 1
        
    # robot.log(came_from)

    return retrace_path(pos_initial, pos_final, came_from)


# def AStarSearch(robot, pos_initial, pos_final):

#     dirs = [(-1, 0), (-1, 1), (0, 1), (1, 1), (1, 0), (1, -1), (0, -1), (-1, -1)]
#     occupied_map = robot.get_visible_robot_map()
#     passable_map = robot.get_passable_map()

#     if utility.is_out_of_bounds(occupied_map, pos_final[0], pos_final[1]) or not passable_map[pos_final[1]][pos_final[0]]:
#         return ()

#     def neighbours(pos_intermediate):
#         pos_x, pos_y = pos_intermediate
#         result = []
#         for dirc in dirs:
#             new_pos_x = pos_x + dirc[1]
#             new_pos_y = pos_y + dirc[0]
#             if not utility.is_cell_occupied(occupied_map, new_pos_x, new_pos_y) and passable_map[new_pos_y][new_pos_x]:
#                 result.append((new_pos_x , new_pos_y))
#         return result

#     G = {} #Actual movement cost to each position from the start position
#     F = {} #Estimated movement cost of start to end going via this position

#     #Initialize starting values
#     G[pos_initial] = 0 
#     F[pos_initial] = astar_heuristic(pos_initial, pos_final)
#     closedVertices = set()
#     openVertices = set([pos_initial])
#     cameFrom = {}
#     block_kicker = 0

#     while len(openVertices) > 0:
#         #Get the vertex in the open list with the lowest F score
#         current = None
#         currentFscore = None
#         for pos in openVertices:
#             if current is None or F[pos] < currentFscore:
#                 currentFscore = F[pos]
#                 current = pos
#         #Check if we have reached the goal
#         if str(current) == str(pos_final) or block_kicker > 3:
#             #Retrace our route backward
#             path = [current]
#             while current in cameFrom:
#             	current = cameFrom[current]
#             	path.append(current)
#             path.reverse()
#             return path

#         block_kicker += 1
#         if block_kicker > 3:
#             return ()
# 	    #Mark the current vertex as closed
#         openVertices.remove(current)
#         closedVertices.add(current)

#         #Update scores for vertices near the current position
#         for neighbour in neighbours(current):
#             if neighbour in closedVertices: 
#                 continue #We have already processed this node exhaustively
#             candidateG = G[current] + 1

#             if neighbour not in openVertices:
#                 openVertices.add(neighbour) #Discovered a new vertex
#             elif candidateG >= G[neighbour]:
#                 continue #This G score is worse than previously found

#             #Adopt this G score
#             cameFrom[neighbour] = current
#             G[neighbour] = candidateG
#             H = astar_heuristic(neighbour, pos_final)
#             F[neighbour] = G[neighbour] + H
#         robot.log(openVertices)
#         robot.log(closedVertices)
#         robot.log(G)
#         robot.log(F)
        

