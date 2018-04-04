# Daniel Shiffman - Translated  to Python by Ali Al Saqban
# http://codingtra.in
# http://patreon.com/codingtrain

# Solar System Generator (2D)
# https://youtu.be/l8SiJ-RmeHU

from Planet import *

sun = None

def setup():
    size(600,600)
    global sun
    sun = Planet(50, 0, 0)
    sun.spawnMoons(15, 1)
    
def draw():
    background(0)
    translate(width/2,height/2)
    sun.show()
    sun.orbit()