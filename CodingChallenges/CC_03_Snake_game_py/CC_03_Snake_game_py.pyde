# Daniel Shiffman - Translated  to Python by Ali Al Saqban
# http://codingtra.in
# http://patreon.com/codingtrain

# The Snake Game
# https://youtu.be/AaGK-fj-BAM

from Snake import *

s = None
scl = 20
food = None

def setup():
    size(600,600)
    global s
    s = Snake(scl)
    frameRate(10)
    pickLocation()

def pickLocation():
    cols = width/scl
    rows = height/scl
    
    global food
    food = PVector(floor(random(cols)),floor(random(rows)))
    food.mult(scl)

def mousePressed():
    s.total+=1

def draw():
    background(51)
    
    global s
    if(s.eat(food)):
        pickLocation()
    
    s.death()
    s.update()
    s.show()
    
    fill(255,0,100)
    rect(food.x,food.y,scl,scl)

def keyPressed():
    if(keyCode == UP and s.yspeed != 1):
        s.dir(0,-1)
    elif(keyCode == DOWN and s.yspeed != -1):
        s.dir(0,1)
    elif(keyCode == RIGHT and s.xspeed != -1):
        s.dir(1,0)
    elif(keyCode == LEFT and s.xspeed != 1):
        s.dir(-1,0)