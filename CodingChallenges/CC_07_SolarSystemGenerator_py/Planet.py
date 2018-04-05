# Daniel Shiffman - Translated  to Python by Ali Al Saqban
# http://codingtra.in
# http://patreon.com/codingtrain

# Solar System Generator (2D)
# https://youtu.be/l8SiJ-RmeHU

class Planet(object):
    def __init__(self, r, d, o):
        self.radius = r
        self.distance = d
        self.angle = random(TWO_PI)
        self.planets = None
        self.orbitspeed = o
    
    def orbit(self):
        self.angle += self.orbitspeed
        if(self.planets):
            for i in self.planets:
                i.orbit()
    
    def spawnMoons(self,total,level):
        self.planets = []
        for i in range(total):
            r = self.radius/(level*2)
            d = random(50, 150)
            o = random(-0.1, 0.1)
            
            self.planets.append(Planet(r,d/level,o))
            
            if(level < 3):
                num = int(random(0,4))
                self.planets[i].spawnMoons(num, level + 1)
    
    def show(self):
        pushMatrix()
        
        fill(255,100)
        rotate(self.angle)
        translate(self.distance, 0)
        
        ellipse(0,0, self.radius*2, self.radius*2)
        
        if(self.planets):
            for i in self.planets:
                i.show()
        popMatrix()
        
                              