# Daniel Shiffman - Translated  to Python by Ali Al Saqban
# http://codingtra.in
# http://patreon.com/codingtrain

# Space Invaders
# https://youtu.be/biN3v3ef-Y0

class Flower(object):
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.r = 30
        
        self.xdir = 1
    
    def grow(self):
        self.r = self.r + 2
    
    def shiftDown(self):
        self.xdir *= -1
        self.y += self.r
    
    def move(self):
        self.x = self.x + self.xdir
    
    def show(self):
        noStroke()
        fill(255,0,200,150)
        ellipse(self.x,self.y,self.r*2,self.r*2)
    