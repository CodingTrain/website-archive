# Daniel Shiffman - Translated  to Python by Ali Al Saqban
# http://codingtra.in
# http://patreon.com/codingtrain

# Space Invaders
# https://youtu.be/biN3v3ef-Y0

class Drop(object):
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.r = 8
        self.toDelete = False
        
    def show(self):
        noStroke()
        fill(155,0,255)
        ellipse(self.x,self.y,self.r*2,self.r*2)
    
    def evaporate(self):
        self.toDelete = True
    
    def hits(self, flower):
        d = dist(self.x,self.y,flower.x,flower.y)
        if( d < self.r + flower.r):
            return True
        else:
            return False
    
    def move(self):
        self.y = self.y - 5
        