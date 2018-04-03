# Daniel Shiffman - Translated to Python by Ali Al Saqban
# http://codingtra.in
# http://patreon.com/codingtrain
# Code for: https://youtu.be/FGAwi7wpU8c

add_library('peasycam')
from Planet import *

sun = None
cam = None

sunTexture = None
textures = []


def setup():
    
    size(600, 600, P3D)
    sunTexture = loadImage("sun.jpg")
    textures.append(loadImage("mars.jpg"))
    textures.append(loadImage("earth.jpg"))
    textures.append(loadImage("mercury.jpg"))
    
    global sun
    cam = PeasyCam(this, 500)
    sun = Planet(50, 0, 0, sunTexture, textures)
    
    sun.spawnMoons(4, 1)


def draw():
    background(0)
    ambientLight(255,255,255)
    pointLight(255, 255, 255, 0, 0, 0)
    sun.show()
    sun.orbit()