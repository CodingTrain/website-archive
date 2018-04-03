# Daniel Shiffman - Translated  to Python by Ali Al Saqban
# http://codingtra.in
# http://patreon.com/codingtrain

# Purple Rain
# https://youtu.be/KkyIDI6rQJI

from Drop import *

drops = []

def setup():
    size(640, 360)
    global drops
    drops = [Drop() for i in range(500)]

def draw():
    background(230, 230, 250)
    for i in drops:
        i.fall()
        i.show()