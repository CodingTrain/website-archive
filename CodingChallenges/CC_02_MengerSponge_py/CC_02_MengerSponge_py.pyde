# Daniel Shiffman - Translated  to Python by Ali Al Saqban
# http://codingtra.in
# http://patreon.com/codingtrain

# Menger Sponge Fractal
# https://youtu.be/LG8ZK-rRkXo

from Box import *

a = 0
sponge = []

def setup():
    size(400,400,P3D)
    
    # Start with one
    b = Box(0,0,0,200)
    sponge.append(b)

def draw():
    background(51)
    stroke(255)
    noFill()
    lights()
    translate(width/2,height/2)
    
    #Rotating
    global a
    rotateX(a)
    rotateY(a*0.4)
    rotateZ(a*0.1)
    
    #Display sponge
    for b in sponge:
        b.show()
    
    a += 0.01

def mousePressed():
    next = []
    global sponge
    for b in sponge:
        newBoxes = b.generate()
        next = next + newBoxes
    sponge = next