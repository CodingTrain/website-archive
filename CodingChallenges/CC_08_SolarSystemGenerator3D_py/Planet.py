# Daniel Shiffman - Translated  to Python by Ali Al Saqban
# http://codingtra.in
# http://patreon.com/codingtrain

# Solar System in Processing - Part 2 (3D)
# https://youtu.be/dncudkelNxw

class Planet(object):
    def __init__(self, r, d, o):
        self.radius = r
        self.distance = d
        self.planets = []
        
        self.v = PVector.random3D()
        self.v.mult(self.distance)
        
        self.angle = random(TWO_PI)
        self.orbitspeed = o
    
    def orbit(self):
        self.angle = self.angle + self.orbitspeed
        if(self.planets != None):
            for i in self.planets:
                i.orbit()
    
    def spawnMoons(self, total, level):
        for i in range(total):
            
            r = self.radius/(level*2)
            d = random((self.radius+r), (self.radius+r)*2)
            o = random(-0.1,0.1)
            
            self.planets.append(Planet(r, d, o))
            
            if(level < 2):
                num = int(random(0,3))
                self.planets[i].spawnMoons(num, level+1)
    
    def show(self):
        pushMatrix()
        
        noStroke()
        v2 = PVector(1, 0, 1)
        p = self.v.cross(v2)
        rotate(self.angle, p.x, p.y, p.z)
        stroke(255)
        
        translate(self.v.x, self.v.y, self.v.z)
        noStroke()
        fill(255)
        sphere(self.radius)
        
        if(self.planets != None):
            for i in self.planets:
                i.show()
        
        popMatrix()