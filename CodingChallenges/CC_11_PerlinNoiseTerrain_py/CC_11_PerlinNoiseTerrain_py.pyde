# Daniel Shiffman - Translated to Python by Ali Al Saqban
# http://codingtra.in
# http://patreon.com/codingtrain

# 3D Terrain Generation with Perlin Noise in Processing
# Code for: https://youtu.be/IKB1hWWedMk

cols,rows = 0,0
scl = 20
w = 2000
h = 1600

flying = 0
terrain = None

def setup():
    size(600,600,P3D)
    
    global cols,rows,terrain
    cols = w // scl
    rows = h // scl
    terrain = [[0 for j in range(cols)] for i in range(rows)]

def draw():
    global flying
    flying -= 0.1
    
    yoff = flying
    for yindex,y in enumerate(terrain):
        xoff = 0
        for xindex,x in enumerate(y):
            terrain[yindex][xindex] = map(noise(xoff,yoff), 0, 1, -100, 100)
            xoff += 0.2
        yoff += 0.2
    
    background(0)
    stroke(255)
    noFill()
    
    translate(width/2,height/2+5)
    rotateX(PI/3)
    translate(-w/2, -h/2)
    
    for y in range(rows-1):
        beginShape(TRIANGLE_STRIP)
        for x in range(cols):
            vertex(x*scl, y*scl, terrain[y][x])
            vertex(x*scl, (y+1)*scl, terrain[y+1][x])
        endShape()