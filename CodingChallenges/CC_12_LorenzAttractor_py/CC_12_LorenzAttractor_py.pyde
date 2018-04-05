# Daniel Shiffman - Translated to Python by Ali Al Saqban
# http://codingtra.in
# http://patreon.com/codingtrain

# The Lorenz Attractor in Processing
# https://youtu.be/f0lkz2gSsIk

add_library('peasycam')

x = 0.01
y = 0
z = 0

a = 10;
b = 28;
c = 8/3;

points = []
cam = None

def setup():
    size(800,600,P3D)
    colorMode(HSB)
    cam = PeasyCam(this, 500)

def draw():
    background(0)
    dt = 0.01
    
    global x,y,z,a,b,c
    dx = (a * (y - x)) * dt
    dy = (x * (b - z) - y) * dt
    dz = (x * y - c * z) * dt
    
    x = x + dx
    y = y + dy
    z = z + dz
    
    points.append(PVector(x,y,z))
    
    translate(0,0,-80)
    scale(5)
    stroke(255)
    noFill()
    
    hu = 0
    beginShape()
    for v in points:
        stroke(hu, 255, 255)
        vertex(v.x, v.y, v.z)
        
        # offset = PVector.random3D();
        # offset.mult(0.1);
        # v.add(offset);
        
        hu += 0.1
        if(hu > 255):
            hu = 0
    endShape()