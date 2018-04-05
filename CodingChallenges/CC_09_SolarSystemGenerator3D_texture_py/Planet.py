# Daniel Shiffman
# http://codingtra.in
# http://patreon.com/codingtrain
# Code for: https://youtu.be/FGAwi7wpU8c

class Planet(object):
    def __init__(self, r, d, o, img, textures):
        self.radius  = r
        self.distance = d
        self.planets = None
        
        self.angle = random(TWO_PI);
        self.orbitspeed = o
        self.img = img
        self.textures = textures
        
        self.v = PVector.random3D()
        self.v.mult(self.distance)
        
        noStroke()
        noFill()
        self.globe = createShape(SPHERE, self.radius)
        self.globe.setTexture(self.img)
    
    def orbit(self):
        self.angle += self.orbitspeed
        if(self.planets != None):
            for i in self.planets:
                i.orbit()
    
    def spawnMoons(self, total, level):
        self.planets = []
        for i in range(total):
            
            r = self.radius/(level*2)
            d = random((self.radius+r), (self.radius+r)*2)
            o = random(-0.1,0.1)
            
            index = int(random(0,len(self.textures)))
            self.planets.append(Planet(r,d,o,self.textures[index],self.textures))
            if(level < 2):
                num = int(random(0,3))
                self.planets[i].spawnMoons(num,level+1)
    
    def show(self):
        pushMatrix()
        
        noStroke()
        v2 = PVector(1, 0, 1)
        p = self.v.cross(v2)
        rotate(self.angle, p.x, p.y, p.z)
        stroke(255)
        
        translate(self.v.x,self.v.y,self.v.z)
        noStroke()
        fill(255)
        shape(self.globe)
        
        if(self.planets != None):
            for i in self.planets:
                i.show()
        
        popMatrix()