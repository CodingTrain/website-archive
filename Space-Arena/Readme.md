# SPACE-ARENA
<p align="center"><img src="Space Arena/game1.png"></p>

We will be basically performing this in python3 by using turtle shell/module; no by using pygames.

This is rather intermediate level of programming than beginner level; but beginners can also use it learn about turtle modules; tkinter and other shells and modules involved.

## Getting started
We will be using turtle to create all the characters and also for the borders for the game design.

```bash
import turtle
import math
import random
import time
import os
import platform #only useful for sound and other basis.
```
"math" and "random" modules belong to inbuilt python libraries and modules; which are used for calculation of collision's and positions of the characters.
Whereas time is used for the frame displaying and for the sound's and other characteristics of the game to be working.
Clearly the usage of os and plateform modules rae done for the sole purpose of distinguishing of audio settings in corresponding os's.

The Title window or the one in the image above can be created normally and the characters in it are to be defined earlier so each and every alphabet that has chnace to be used is defined and then later on the desired characters are used.

For the starting part the game window usually dissappers after the instant it appears; so we will be defining a While loop such that, giving it a condition of "True", it will stay there for time being until manually closed.

Each and every character and Borders and radar and other created by turtle using "pen()"; even the background of the game screen is black but using pen(), we can create a contineous ongoing process in while loop of creation of multiple dotes of red, orange, yellow etc; that appear as stars giving us space like atmosphere.

The key bindings can be acceseed in the turtle plateform by:
```bash
turtle.listen() #to detect the keyboard bindings
turtle.onkey(left, "Left") #reacts to the key presses
turtle.onkey(right, "Right")
turtle.onkey(fire_bullet, "space")
```
We will be needing the physics and a bit of math for collision and for the respons of the enemy;
The collision response and reaction can be done in two ways:
```bash
def is_collision(sprite1, sprite2, threshold):
        d = math.sqrt((sprite1.x-sprite2.x)**2 + (sprite1.y-sprite2.y)**2)
        if d < threshold:
            return True
        else:
            return False
```
here i used other parameters that are later on useful in the code; where as the other way is:
```bash
def is_collision(self, other):
        if self.x < other.x + other.width and\
            self.x + self.width > other.x and\
            self.y < other.y + other.height and\
            self.y + self.height > other.y:
            return True
        else:
            return False
```
This one here is the practical version , it is used in thw while loop for the enemy-player, enemy-border, player-border and other collisions that are supposed to be taking place in the game.

In the whole code the tricly part i felt is supposed ot be the camera movement with respect to the player and a bit of rader displaying,
well even if these are the extensions to the game they bring up the fun.
<p align="center"><img src="Space Arena/game2.png"></p>

And i did up the level chnages by creating the function of start_level(); as the player die in the perticular level the function end_of_level() becomes false and then the level increases simultaneously increasing the enemies and the power-up's.
```bash
end_of_level = True
        for sprite in sprites:
            # Look for an active enemy
            if isinstance(sprite, Enemy) and sprite.state == "active":
                end_of_level = False
        if end_of_level:
            game.level += 1
            game.start_level()
```
Functions such as ;
```bash
wn.update()

wn.tracer()

pen.clear()
```
are perticularly necessary cause the wn.update() and wn.tracer kind of do a simliar task of making the process considerably faster, but pen.clear() cleans up each frame and allowas the pen() to draw a new every time showing us the movement of the charcater.

The basic concept required is how the Class works and how the other characters and classes inherit the information of the parent class.
Such as:
```bash
class Sprite():
    def __init__(self, x, y, shape, color):
    
class Player(Sprite):
    def __init__(self, x, y, shape, color):
        Sprite.__init__(self, 0, 0, shape, color)
```
Here "__init__" is the constructor that hepls in contruction of the desired class.

So the code also has the commets for the reader to follow up.
