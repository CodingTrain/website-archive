# Daniel Shiffman - Translated  to Python by Ali Al Saqban
# http://codingtra.in
# http://patreon.com/codingtrain

# Menger Sponge Fractal
# https://youtu.be/LG8ZK-rRkXo

class Box(object):
    def __init__(self,x,y,z,r):
        self.pos = PVector(x,y,z)
        self.r = r
    
    def generate(self):
        
        newR = self.r/3
        
        boxes = [ Box(self.pos.x+x*newR, self.pos.y+y*newR, self.pos.z+z*newR,newR) 
                  for x in range(-1,2)
                  for y in range(-1,2)
                  for z in range(-1,2)
                  if sum(map(abs,[x,y,z])) > 1 ]

        return boxes
    
    def show(self):
        pushMatrix()
        
        translate(self.pos.x,self.pos.y,self.pos.z)
        noStroke()
        fill(255)
        box(self.r)
        
        popMatrix()