# Daniel Shiffman - Translated  to Python by Ali Al Saqban
# http://codingtra.in
# http://patreon.com/codingtrain

# Starfield in Processing
# https://youtu.be/17WoOqgXsRM

class Star(object):
    def __init__(self):
        self.x = random(-width/2,width/2)
        self.y = random(-height/2,height/2)
        self.z = random(width/2)
        
        self.px = self.x
        self.py = self.y
        self.pz = self.z
    
    def update(self):
        speed = map(mouseX, 0, width, 0, 50)
        self.z = self.z - speed
        
        if(self.z < 1):
            self.x = random(-width/2,width/2)
            self.y = random(-height/2,height/2)
            self.z = width/2
            self.pz = self.z

    def show(self):
        fill(255)
        noStroke()
        
        sx = map(self.x / self.z, 0, 1, 0, width/2)
        sy = map(self.y / self.z, 0, 1, 0, height/2)
        
        r = map(self.z, 0, width/2, 16, 0)
        ellipse(sx, sy, r, r)
        
        px = map(self.x/self.pz, 0, 1, 0, width/2)
        py = map(self.y/self.pz, 0, 1, 0, height/2)
        
        self.pz = self.z
        
        stroke(255)
        line(px, py, sx, sy)