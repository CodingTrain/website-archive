# Daniel Shiffman - Translated  to Python by Ali Al Saqban
# http://codingtra.in
# http://patreon.com/codingtrain

# Solar System in Processing - Part 2 (3D)
# https://youtu.be/dncudkelNxw

add_library('peasycam')
from Planet import *

sun = None
cam = None

def setup():
    size(600,600,P3D)
    
    global sun
    
    cam = PeasyCam(this,500)
    sun = Planet(50,0,0)
    sun.spawnMoons(4,1)

def draw():
    background(0)
    lights()
    
    sun.show()
    sun.orbit()