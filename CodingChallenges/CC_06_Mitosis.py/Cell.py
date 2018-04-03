# Daniel Shiffman - Translated  to Python by Ali Al Saqban
# http://codingtra.in
# http://patreon.com/codingtrain

# Mitosis
# https://youtu.be/jxGS3fKPKJA

class Cell(object):
    def __init__(self, pos=None,r=None, c=None):
        self.pos = pos.copy() if pos else PVector(random(width),random(height))
        self.r = r if r else 60
        self.c = c if c else color(random(100,255),0,random(100,255),100)
    
    def clicked(self, x, y):
        d = dist(self.pos.x, self.pos.y, x, y)
        return d < self.r
    
    def mitosis(self):
        return Cell(self.pos,self.r*0.8,self.c)
    
    def move(self):
        vel = PVector.random2D()
        self.pos.add(vel)
    
    def show(self):
        noStroke()
        fill(self.c)
        ellipse(self.pos.x,self.pos.y,self.r,self.r)