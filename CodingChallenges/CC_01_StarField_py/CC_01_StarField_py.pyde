# Daniel Shiffman - Translated  to Python by Ali Al Saqban
# http://codingtra.in
# http://patreon.com/codingtrain

# Starfield in Processing
# https://youtu.be/17WoOqgXsRM


from Star import *

def setup():
    size(600,600)
    global stars
    stars = [Star() for i in range(800)]

def draw():
    
    background(0)
    translate(width/2,height/2)
    for i in stars:
        i.update()
        i.show()