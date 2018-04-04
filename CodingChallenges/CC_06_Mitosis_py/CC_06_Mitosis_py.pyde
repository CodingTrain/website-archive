# Daniel Shiffman - Translated  to Python by Ali Al Saqban
# http://codingtra.in
# http://patreon.com/codingtrain

# Mitosis
# https://youtu.be/jxGS3fKPKJA

from Cell import *

cells = []

def setup():
    size(700,700)
    global cells
    cells.append(Cell())
    cells.append(Cell())

def draw():
    background(200)
    for c in cells:
        c.move()
        c.show()

def mousePressed():
    global cells
    for c in cells[::-1]:
        if(c.clicked(mouseX,mouseY)):
            cells.append(c.mitosis())
            cells.append(c.mitosis())
            cells.remove(c)