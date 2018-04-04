# Daniel Shiffman - Translated  to Python by Ali Al Saqban
# http://codingtra.in
# http://patreon.com/codingtrain

# Space Invaders
# https://youtu.be/biN3v3ef-Y0

class Ship(object):
    def __init__(self):
        self.x = width/2
        self.xdir = 0
    
    def show(self):
        fill(255)
        rectMode(CENTER)
        rect(self.x, height-20, 20, 60)
    
    def setDir(self,dir):
        self.xdir = dir
    
    def move(self):
        self.x += self.xdir*5
    