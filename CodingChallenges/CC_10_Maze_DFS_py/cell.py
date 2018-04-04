# Daniel Shiffman
# http://codingtra.in
# http://patreon.com/codingtrain

# Videos
# https://youtu.be/HyK_Q5rrcr4
# https://youtu.be/D8UgRyRnvXU
# https://youtu.be/8Ju_uxJ9v44
# https://youtu.be/_p5IH0L63wo

# Depth-first search
# Recursive backtracker
# https://en.wikipedia.org/wiki/Maze_generation_algorithm

class Cell(object):
    def __init__(self, i, j, w):
        self.i = i
        self.j = j
        self.w = w
        
        self.walls = [True, True, True, True]
        self.visited = False
    
    def checkNeighbors(self,grid,func):
        neighbors = []
        
        top =    grid[func(self.i, self.j-1)]
        right =  grid[func(self.i+1, self.j)]
        bottom = grid[func(self.i, self.j+1)]
        left =   grid[func(self.i-1, self.j)]
        
        if(top != None and not top.visited): neighbors.append(top);
        
        if (right != None and not right.visited): neighbors.append(right)
        
        if (bottom != None and not bottom.visited): neighbors.append(bottom)
        
        if (left != None and not left.visited): neighbors.append(left)
        
        if(len(neighbors) > 0):
            r = floor(random(0, len(neighbors)))
            return neighbors[r]
        else:
            return None
        
    def highlight(self):
        x = self.i*self.w
        y = self.j*self.w
        
        noStroke()
        fill(0, 0, 255, 100)
        rect(x, y, self.w, self.w)
    
    def show(self):
        x = self.i*self.w
        y = self.j*self.w
        
        stroke(255)
        if(self.walls[0]): line(x, y, x+self.w, y)
        if(self.walls[1]): line(x+self.w, y, x+self.w, y+self.w)
        if(self.walls[2]): line(x+self.w, y+self.w, x, y+self.w)
        if(self.walls[3]): line(x, y+self.w, x, y)
        
        if(self.visited):
            noStroke()
            fill(255, 0, 255, 100)
            rect(x, y, self.w, self.w)            