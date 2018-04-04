# Daniel Shiffman - Translated  to Python by Ali Al Saqban
# http://codingtra.in
# http://patreon.com/codingtrain

# Space Invaders
# https://youtu.be/biN3v3ef-Y0

from Drop import *
from Flower import *
from Ship import *

ship = None
flowers = []
drops = []

def setup():
    size(600,400)
    
    global ship
    global flowers
    
    ship = Ship()
    flowers = [Flower(i*80+80,60) for i in range(6)]

def draw():
    background(51)
    
    ship.show()
    ship.move()
    
    for d in drops:
        d.show()
        d.move()
        for j in flowers:
            if(d.hits(j)):
                j.grow()
                d.evaporate()
    
    edge = False
    
    for i in flowers:
        i.show()
        i.move()
        if(i.x > width or i.x < 0):
            edge = True
    
    if(edge):
        for i in flowers:
            i.shiftDown()
    
    for d in drops[::-1]:
        if(d.toDelete):
            drops.remove(d)

def keyReleased():
    if(key != ' '):
        ship.setDir(0)

def keyPressed():
    if(key == ' '):
        drop = Drop(ship.x,height)
        drops.append(drop)
    if(keyCode == RIGHT):
        ship.setDir(1)
    elif(keyCode == LEFT):
        ship.setDir(-1)