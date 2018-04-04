# Daniel Shiffman - Translated to Python by Ali Al Saqban
# http://codingtra.in
# http://patreon.com/codingtrain

# Depth-first search
# Recursive backtracker
# https://en.wikipedia.org/wiki/Maze_generation_algorithm

# Videos
# https://youtu.be/HyK_Q5rrcr4
# https://youtu.be/D8UgRyRnvXU
# https://youtu.be/8Ju_uxJ9v44
# https://youtu.be/_p5IH0L63wo



from cell import *

cols = 0
rows = 0
w = 20

grid = []
current = None
stack = []

def setup():
    
    size(600, 600);
    
    global cols
    global rows
    cols = floor(width/w);
    rows = floor(height/w);
    
    global grid
    grid = [Cell(i,j,w) for j in range(rows) for i in range(cols)]
    
    global current
    current = grid[0]
        

def draw():
    background(51)
    
    for i in grid:
        i.show()
    
    global current
    current.visited = True
    current.highlight()
    
    # STEP 1
    next = current.checkNeighbors(grid,index)
    
    global stack
    if(next != None):
        next.visited = True
    
        # STEP 2
        stack.append(current)
    
        # STEP 3
        removeWalls(current, next)
    
        # STEP 4
        current = next
    elif(len(stack) > 0):
        current = stack[len(stack)-1]
        del stack[len(stack)-1]

def index(i, j):
    if((i < 0) or (j < 0) or (i > cols-1) or (j > rows-1)):
        return 0
    else:
        return i + j * cols

def removeWalls(a, b):
    x = a.i - b.i
    if(x == 1):
        a.walls[3] = False
        b.walls[1] = False
    elif(x == -1):
        a.walls[1] = False
        b.walls[3] = False
    
    y = a.j-b.j
    if(y == 1):
        a.walls[0] = False
        b.walls[2] = False
    elif(y == -1):
        a.walls[2] = False
        b.walls[0] = False