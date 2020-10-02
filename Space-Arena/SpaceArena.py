import turtle
import math
import random
import time
import os
import platform #only useful for sound and other basis.

# If on Windows, import winsound .
if platform.system() == "Windows":
    try:
        import winsound
    except:
        print ("Winsound module not available.")
        
def play_sound(sound_file, time = 0):
    # Windows
    if platform.system() == 'Windows':
        winsound.PlaySound(sound_file, winsound.SND_ASYNC)
    # Linux
    elif platform.system() == "Linux":
        os.system("aplay -q {}&".format(sound_file))
    # Mac
    else:
        os.system("afplay {}&".format(sound_file))

    if time > 0:
        turtle.ontimer(lambda: play_sound(sound_file, time), t=int(time * 1000))
        


SCREEN_WIDTH = 800  
SCREEN_HEIGHT = 600

wn = turtle.Screen()
wn.setup(width = SCREEN_WIDTH + 220, height = SCREEN_HEIGHT + 20)
wn.title("Space Arena!")
wn.bgcolor("black")

# Start the BGM when the game starts...
play_sound("bgm.wav", 120)

images = ["hunter.gif", "surveillance.gif", "mine.gif", "powerup.gif"]
for image in images:
    wn.register_shape(image)

pen = turtle.Turtle()
pen.speed(0)
pen.shape("square")
pen.color("white")
pen.penup()
pen.hideturtle()

class CharacterPen:
    def __init__(self, color = "white", scale = 1.0):
        self.color = color
        self.scale = scale
        # Characters to be displayed above radar and ither are to be defined here.

        self.characters = {}
        self.characters["1"] = ((-5, 10),(0, 10),(0, -10),(-5, -10), (5, -10))
        self.characters["2"] = ((-5, 10),(5, 10),(5, 0), (-5, 0), (-5, -10), (5, -10))
        self.characters["3"] = ((-5, 10),(5, 10),(5, 0), (0, 0), (5, 0), (5,-10), (-5, -10))
        self.characters["4"] = ((-5, 10), (-5, 0), (5, 0), (2,0), (2, 5), (2, -10))
        self.characters["5"] = ((5, 10), (-5, 10), (-5, 0), (5,0), (5,-10), (-5, -10))
        self.characters["6"] = ((5, 10), (-5, 10), (-5, -10), (5, -10), (5, 0), (-5, 0))
        self.characters["7"] = ((-5, 10), (5, 10), (0, -10))
        self.characters["8"] = ((-5, 0), (5, 0), (5, 10), (-5, 10), (-5, -10), (5, -10), (5, 0))
        self.characters["9"] = ((5, -10), (5, 10), (-5, 10), (-5, 0), (5, 0))
        self.characters["0"] = ((-5, 10), (5, 10), (5, -10), (-5, -10), (-5, 10))

        self.characters["A"] = ((-5, -10), (-5, 10), (5, 10), (5, -10), (5, 0), (-5, 0))
        self.characters["B"] = ((-5, -10), (-5, 10), (3, 10), (3, 0), (-5, 0), (5,0), (5, -10), (-5, -10))
        self.characters["C"] = ((5, 10), (-5, 10), (-5, -10), (5, -10))
        self.characters["D"] = ((-5, 10), (-5, -10), (5, -8), (5, 8), (-5, 10))
        self.characters["E"] = ((5, 10), (-5, 10), (-5, 0), (0, 0), (-5, 0), (-5, -10), (5, -10))
        self.characters["F"] = ((5, 10), (-5, 10), (-5, 0), (5, 0), (-5, 0), (-5, -10))
        self.characters["G"] = ((5, 10), (-5, 10), (-5, -10), (5, -10), (5, 0), (0, 0))
        self.characters["H"] = ((-5, 10), (-5, -10), (-5, 0), (5, 0), (5, 10), (5, -10))
        self.characters["I"] = ((-5, 10), (5, 10), (0, 10), (0, -10), (-5, -10), (5, -10))
        self.characters["J"] = ((5, 10), (5, -10), (-5, -10), (-5, 0))   
        self.characters["K"] = ((-5, 10), (-5, -10), (-5, 0), (5, 10), (-5, 0), (5, -10))
        self.characters["L"] = ((-5, 10), (-5, -10), (5, -10))
        self.characters["M"] = ((-5, -10), (-3, 10), (0, 0), (3, 10), (5, -10))
        self.characters["N"] = ((-5, -10), (-5, 10), (5, -10), (5, 10))
        self.characters["O"] = ((-5, 10), (5, 10), (5, -10), (-5, -10), (-5, 10))
        self.characters["P"] = ((-5, -10), (-5, 10), (5, 10), (5, 0), (-5, 0))
        self.characters["Q"] = ((5, -10), (-5, -10), (-5, 10), (5, 10), (5, -10), (2, -7), (6, -11))
        self.characters["R"] = ((-5, -10), (-5, 10), (5, 10), (5, 0), (-5, 0), (5, -10))
        self.characters["S"] = ((5, 8), (5, 10), (-5, 10), (-5, 0), (5, 0), (5, -10), (-5, -10), (-5, -8))
        self.characters["T"] = ((-5, 10), (5, 10), (0, 10), (0, -10)) 
        self.characters["V"] = ((-5, 10), (0, -10), (5, 10)) 
        self.characters["U"] = ((-5, 10), (-5, -10), (5, -10), (5, 10)) 
        self.characters["W"] = ((-5, 10), (-3, -10), (0, 0), (3, -10), (5, 10))   
        self.characters["X"] = ((-5, 10), (5, -10), (0, 0), (-5, -10), (5, 10))   
        self.characters["Y"] = ((-5, 10), (0, 0), (5, 10), (0,0), (0, -10))   
        self.characters["Z"] = ((-5, 10), (5, 10), (-5, -10), (5, -10))   
        
        self.characters["-"] = ((-3, 0), (3, 0)) 
         
        
    def draw_string(self, pen, str, x, y):
        pen.width(2)
        pen.color(self.color)
        
        # Center text
        x -= 15 * self.scale * ((len(str) - 1) / 2)
        
        for character in str:
            self.draw_character(pen, character, x, y)
            x += 15 * self.scale

    def draw_character(self, pen, character, x, y):
        
        scale = self.scale
        
        if character in "abcdefghijklmnopqrstuvwxyz": # size to whatever that is considered to be an alaphabet. 
            scale *= 0.8
            y -= 10 * (1 - scale)

        # Lowercase letters
        character = character.upper()
            
        if character in self.characters:
            pen.penup()
            xy = self.characters[character][0]
            pen.goto(x + xy[0] * scale, y + xy[1] * scale)
            pen.pendown()
            for i in range(1, len(self.characters[character])):
                xy = self.characters[character][i]
                pen.goto(x + xy[0] * scale, y + xy[1] * scale)
            pen.penup()

# Splash screen
character_pen = CharacterPen("red", 3.0)
character_pen.draw_string(pen, "SPACE ARENA", 0, 160)

character_pen.scale = 1.0
character_pen.draw_string(pen, "BY MADMAN", 0, 100)

pen.color("white")
pen.shape("triangle")

pen.goto(-150, 20)
pen.stamp()

character_pen.scale = 1.0
character_pen.draw_string(pen, "Player", -150, -20)

pen.shape("hunter.gif")
pen.goto(0, 20)
pen.stamp()
character_pen.draw_string(pen, "Enemy", 0, -20)

pen.shape("powerup.gif")
pen.goto(150, 20)
pen.stamp()
character_pen.draw_string(pen, "Powerup", 150, -20)

character_pen.draw_string(pen, "Up Arrow", -100, -60)
character_pen.draw_string(pen, "Accelerate", 100, -60)

character_pen.draw_string(pen, "Left Arrow", -100, -100)
character_pen.draw_string(pen, "Rotate Left", 100, -100)

character_pen.draw_string(pen, "Right Arrow", -100, -140)
character_pen.draw_string(pen, "Rotate Right", 100, -140)

character_pen.draw_string(pen, "Space", -100, -180)
character_pen.draw_string(pen, "Fire", 100, -180)


character_pen.scale = 1.0
character_pen.draw_string(pen, "PRESS S TO START", 0, -240)



wn.tracer(0)
wn.update()
# till here everything was to create the first main screen to display the tiltle and the controls and other stuff.
#update() and tracer() are used such that after this point the all the previous functions will stop and refresh to the game screen. Just to make it work faster.

class Game():
    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.frame = 0
        self.level = 0
        self.state = "splash"
        
    def start_game(self):
        self.state = "playing"
        
    def toggle_pause(self):
        if self.state == "paused":
            self.state = "playing"
        
        else:
            self.state = "paused"
        
    def render_info(self, pen, score, active_enemies):
        pen.color("#222255")
        pen.penup()
        pen.goto(400, 0)
        pen.shape("square")
        pen.setheading(90) # everything to be facing upwards.. rather for the player to be facing upwards.
        pen.shapesize(stretch_wid=10, stretch_len=32, outline=None)
        pen.stamp()
        
        pen.color("white")
        pen.width(3)
        pen.goto(300, 400)
        pen.pendown()
        pen.goto(300, -400)
        
        pen.penup() 
        pen.color("white")
        pen.goto(400, 250)
        pen.goto(400, 230)
        character_pen.scale = 1.0
        character_pen.draw_string(pen, "SPACE ARENA".format(score), 400, 270) # all the stuff that is diplayed above the radar...
        character_pen.draw_string(pen, "Score {}".format(score), 400, 240)
        character_pen.draw_string(pen, "Enemies {}".format(active_enemies), 400, 210)
        character_pen.draw_string(pen, "Lives {}".format(player.lives), 400, 180)
        character_pen.draw_string(pen, "Level {}".format(game.level), 400, 150)

    def start_level(self):
        sprites.clear()

        sprites.append(player)

        for missile in missiles:
            sprites.append(missile)

        for _ in range(self.level):
            for _ in range(5):
                enemies.append(Enemy(0.0, 0.0))
                
            for enemy in enemies:
                x = random.randint(-game.width/2.0, game.width/2.0)
                y = random.randint(-game.height/2.0, game.height/2.0)
                dx = random.randint(0, 10) / 20.0
                dy = random.randint(0, 10) / 20.0
                enemy.x = x
                enemy.y = y
                enemy.dx = dx
                enemy.dy = dy

            for enemy in enemies:
                sprites.append(enemy)

            for powerup in powerups:
                sprites.append(powerup)
        
        
    def render_border(self, pen, x_offset, y_offset, screen_width, screen_height): # offset is used as per the usage of the camera function... 
        pen.color("white")
        pen.width(3)
        pen.penup()
        left = -self.width/2.0 - x_offset # As for the camera moving.. the border should also be moved with respect to it.
        right = self.width/2.0 - x_offset
        top = self.height/2.0 - y_offset
        bottom = -self.height/2.0 - y_offset
        
        pen.goto(left, top)
        pen.pendown()
        pen.goto(right, top)
        pen.goto(right, bottom)
        pen.goto(left, bottom)
        pen.goto(left, top)
        pen.penup()

class Sprite(): # Sprite class contributes of everything that is present everywhere in the game... all the enemy, powerup, player are part of the sprite class
          #they inherit the charectristics from this class.. the charactrestics that are similar to all of them are created in here.
    @staticmethod
    def is_collision(sprite1, sprite2, threshold):
        d = math.sqrt((sprite1.x-sprite2.x)**2 + (sprite1.y-sprite2.y)**2)
        if d < threshold:
            return True
        else:
            return False
    
    @staticmethod # here the purpose of 'staticmethod' is unkown to me.. even without it the game seems to be working similar as earlier.
    def is_on_screen(sprite, screen_width, screen_height, x_offset, y_offset): 
        if sprite.x - x_offset < screen_width / 2 and sprite.x - x_offset > -screen_width / 2\
            and sprite.y - y_offset < screen_height /2 and sprite.y - y_offset > - screen_height / 2:    
            return True
        else:
            return False
            
    def __init__(self, x, y, shape="square", color = "white"):
        self.shape = shape
        self.color = color
        self.width = 20.0
        self.height = 20.0
        self.heading = 0.0
        self.dx = 0.0 #here d is delta.. or the change. so dx is the change in x direction.. 
        self.dy = 0.0 #intially everything must be '0', later on with increase in thrust and accleration they will change.
        self.da = 0.0 # da is the change in angle.. this corresponds to rotation.
        self.thrust = 0.0
        self.max_d = 2.0
        self.x = x
        self.y = y
        self.state = "active"
        
    def bounce(self, other):
        temp_dx = self.dx
        temp_dy = self.dy
        
        self.dx = other.dx
        self.dy = other.dy
        
        other.dx = temp_dx
        other.dy = temp_dy 

    def update(self):        
        self.heading += self.da
        self.heading %= 360.0
        
        self.dx += math.cos(math.radians(self.heading)) * self.thrust #this is for rotating respectively.
        self.dy += math.sin(math.radians(self.heading)) * self.thrust
        
        self.x += self.dx #by this it moves.. 
        self.y += self.dy
        
        self.border_check()
            
    def border_check(self):
        if self.x > game.width / 2.0 - 10.0: # border check is giev to all four borders such that when it touches
            self.x = game.width / 2.0 - 10.0
            self.dx *= -1.0
        elif self.x < -game.width / 2.0 + 10.0: #  the border then it will bounce back in opposite direction.
            self.x = -game.width / 2.0 + 10.0
            self.dx *= -1.0
            
        if self.y > game.height / 2.0 - 10.0:
            self.y = game.height / 2.0 - 10.0
            self.dy *= -1.0
        elif self.y < -game.height / 2.0 + 10.0:
            self.y = -game.height / 2.0 + 10.0
            self.dy *= -1.0       
        
    def render(self, pen, x_offset = 0, y_offset = 0):
        # Check if active
        if self.state == "active":
            # Check if it is on the screen
            screen_x = self.x - x_offset
            screen_y = self.y - y_offset
            
            if(screen_x > -game.width/2.0 and screen_x < game.width/2.0 and screen_y > -game.height/2.0 and screen_y < game.width/2.0):
                pen.goto(self.x - x_offset, self.y - y_offset)
                pen.shape(self.shape)
                pen.color(self.color)
                pen.shapesize(stretch_wid=1, stretch_len=1, outline=None)
                pen.setheading(self.heading)
                pen.stamp()
        
class Player(Sprite):
    def __init__(self):
        Sprite.__init__(self, 0.0, 0.0, "triangle")
        self.da = 0.0
        self.heading = 90.0
        self.score = 0
        self.max_health = 40
        self.health = self.max_health
        self.sensor_range = 500
        self.thrust = 0.0
        self.acceleration = 0.2
        self.lives = 3
        
    def rotate_left(self):
        self.da = 10.0
        
    def rotate_right(self):
        self.da = -10.0
        
    def stop_rotation(self):
        self.da = 0.0
        
    def accelerate(self):
        play_sound("thruster.wav")
        self.thrust += self.acceleration
        
        dx = math.cos(math.radians(self.heading + 180)) * 2 
        dy = math.sin(math.radians(self.heading + 180)) * 2
        
        exhaust.explode(self.x - 100, self.y, dx, dy)
        
    def decelerate(self):
        self.thrust = 0.0
        
    def fire(self):
        play_sound("missile_fire.wav")
        
        directions = [0, 5, -5]
        
        for missile in missiles:  # for the missiles to be having the same speed and direction as the player.
            # print(directions)
            if missile.state == "ready":
                missile.x = player.x
                missile.y = player.y
                missile.heading = player.heading + directions[0]
                missile.dx = math.cos(math.radians(missile.heading)) * missile.thrust
                missile.dy = math.sin(math.radians(missile.heading)) * missile.thrust
                missile.dx += player.dx
                missile.dy += player.dy
                missile.state = "active"
                
                self.dx -= missile.dx * 0.01
                self.dy -= missile.dy * 0.01
                
                directions.pop(0)
                
                if len(directions) == 0:
                    break
                
    def reset(self):
        self.x = 0.0
        self.y = 0.0
        self.dx = 0.0
        self.dy = 0.0
        self.da = 0.0
        self.heading = 90.0
        self.health = self.max_health
        
    def render(self, pen, x_offset = 0, y_offset = 0):
        pen.shapesize(stretch_wid=0.5, stretch_len=1, outline=None) 
        pen.goto(self.x - x_offset, self.y - y_offset)
        pen.shape(self.shape)
        pen.color(self.color)
        pen.setheading(self.heading)
        pen.stamp()
        
        # Draw health
        pen.goto(self.x - x_offset - 10.0, self.y - y_offset + 20.0)
        pen.width(3.0)
        pen.pendown()
        pen.setheading(0.0)
        try:
            if self.health/self.max_health < 0.3:
                pen.color("red")
            elif self.health/self.max_health < 0.7:
                pen.color("yellow")
            else:
                pen.color("green")
            pen.fd(20.0 * (self.health/self.max_health))
            pen.color("grey")
            pen.fd(20.0 * ((self.max_health-self.health)/self.max_health))
        except:
            pass
            
        pen.penup()
            
class Enemy(Sprite):
    def __init__(self, x, y, shape = "square", color = "red"):
        Sprite.__init__(self, x, y, shape, color)
        self.max_health = random.randint(10, 30)
        self.health = self.max_health
        self.type = random.choice(["hunter", "mine", "surveillance"])
        self.max_dx = 3.0
        self.max_dy = 3.0
        self.sensor_range = random.randint(40, 60)
        
        if self.type == "hunter":
            self.color = "red"
            self.shape = "hunter.gif"
            self.sensor_range = random.randint(100, 200)
            
        elif self.type == "mine":
            self.color = "orange"
            self.shape = "mine.gif"
            self.sensor_range = random.randint(100, 200)

        elif self.type == "surveillance":
            self.color = "pink"
            self.shape = "surveillance.gif"
            self.sensor_range = random.randint(200, 400)

    def update(self):
        
        if self.health <= 0:
            self.state = "inactive"
                    
        self.heading += self.da
        self.heading %= 360.0
        
        self.dx += math.cos(math.radians(self.heading)) * self.thrust
        self.dy += math.sin(math.radians(self.heading)) * self.thrust
        
        self.x += self.dx
        self.y += self.dy
        
        # Change movement based on type
        if self.type == "hunter":
            if Sprite.is_collision(player, self, self.sensor_range):
                if self.x < player.x:
                    self.dx += 0.05
                else: 
                    self.dx -= 0.05

                if self.y < player.y:
                    self.dy += 0.05
                else: 
                    self.dy -= 0.05
            
        elif self.type == "mine":
            self.dx = 0.0
            self.dy = 0.0
            
            if Sprite.is_collision(player, self, self.sensor_range):
                self.type = "hunter"
                self.color = "red"
            
        elif self.type == "surveillance":
            if Sprite.is_collision(player, self, self.sensor_range):
                if self.x > player.x:
                    self.dx += 0.03
                else: 
                    self.dx -= 0.03

                if self.y > player.y:
                    self.dy += 0.03
                else: 
                    self.dy -= 0.03
        
        # Check max velocity
        if self.dx > self.max_dx:
            self.dx = self.max_dx
        elif self.dx < -self.max_dx:
            self.dx = -self.max_dx
            
        if self.dy > self.max_dy:
            self.dy = self.max_dy
        elif self.dy < -self.max_dy:
            self.dy = -self.max_dy
        
        self.border_check()

    def render(self, pen, x_offset, y_offset):
        if self.state == "active":
            pen.shapesize(stretch_wid=1, stretch_len=1, outline=None) 
            pen.goto(self.x - x_offset, self.y - y_offset)
            pen.shape(self.shape)
            pen.color(self.color)
            pen.setheading(self.heading)
            pen.stamp()
            
            # Draw health
            pen.goto(self.x - x_offset - 10.0, self.y - y_offset + 20.0)
            pen.width(2)
            pen.pendown()
            pen.setheading(0.0)
            try:
                if self.health/self.max_health < 0.3:
                    pen.color("red")
                elif self.health/self.max_health < 0.7:
                    pen.color("yellow")
                else:
                    pen.color("green")
                pen.fd(20.0 * (self.health/self.max_health))
                pen.color("grey")
                pen.fd(20.0 * ((self.max_health-self.health)/self.max_health))
            except:
                pass
                
            pen.penup()

class Missile(Sprite):
    def __init__(self, x, y, shape = "triangle", color = "yellow"):
        Sprite.__init__(self, x, y, shape, color)
        self.state = "ready"
        self.thrust = 8.0
        self.max_fuel = 200.0
        self.fuel = 200.0
        self.damage = 5.0

    def update(self):        
        self.heading += self.da
        self.heading %= 360.0
        
        self.x += self.dx
        self.y += self.dy
        
        self.border_check()
        
        self.fuel -= self.thrust
        if self.fuel < 0:
            self.state = "ready"
            self.fuel = self.max_fuel

            
    def reset(self):
        self.state = "ready"
        self.fuel = self.max_fuel

    def render(self, pen, x_offset, y_offset):
        if self.state == "active":
            pen.shapesize(stretch_wid=0.2, stretch_len=0.2, outline=None) 
            pen.goto(self.x - x_offset, self.y - y_offset)
            pen.shape(self.shape)
            pen.color(self.color)
            pen.setheading(self.heading)
            pen.stamp()  # stamp() is the function that actually prints it onto the screen.

class Star(Sprite):  # randomly some stars are to be printed to create a space view.
    def __init__(self, x, y, shape = "circle", color = "yellow"):
        Sprite.__init__(self, x, y, shape, color)
        self.distance = random.randint(2, 6)
        self.color = random.choice(["white", "yellow", "orange", "red"])
        self.width = 0.5 / self.distance

    def render(self, pen, x_offset = 0, y_offset = 0):
        if self.state == "active":
            pen.shapesize(stretch_wid=0.5/self.distance, stretch_len=0.5/self.distance, outline=None) 
            pen.goto(self.x - x_offset/self.distance, self.y - y_offset/self.distance)
            pen.shape(self.shape)
            pen.color(self.color)
            pen.setheading(self.heading)
            pen.stamp()

class Powerup(Sprite):
    def __init__(self, x, y, shape = "circle", color = "blue"):
        Sprite.__init__(self, x, y, shape, color)
        self.dx = random.randint(-30, 30) / 10.0
        self.dy = random.randint(-30, 30) / 10.0
        self.shape = "powerup.gif"

class Particle(Sprite):
    def __init__(self, x, y, shape = "triangle", color = "red"):
        Sprite.__init__(self, x, y, shape, color)
        self.dx = random.randint(-6, 6)
        self.dy = random.randint(-6, 6)
        self.frame = random.randint(10, 20)
        self.color = random.choice(["red", "orange", "yellow"])
        self.shape = "triangle"
        self.state = "inactive"
        
    def render(self, pen, x_offset = 0, y_offset = 0):
        self.frame -= 1
        self.dx *= 0.85
        self.dy *= 0.85
        if self.frame <= 0:
            self.frame = random.randint(10, 20)
            self.state = "inactive"
        pen.shapesize(stretch_wid=0.05, stretch_len=0.05, outline=None) 
        pen.goto(self.x - x_offset, self.y - y_offset)
        pen.shape(self.shape)
        pen.color(self.color)
        pen.stamp()       

class Explosion():
    def __init__(self, number_of_particles):
        self.particles = []
        for _ in range(number_of_particles):
            self.particles.append(Particle(0,0))
            
    def explode(self, x, y, dx_offset = 0, dy_offset = 0):
        play_sound("explosion.wav")
        for particle in self.particles:
            if particle.state == "inactive":
                particle.x = x
                particle.y = y
                particle.dx = random.randint(-12, 12)
                particle.dy = random.randint(-12, 12)
                particle.dx += dx_offset * 2
                particle.dy += dy_offset * 2
                particle.state = "active"
                
    def render(self, pen, x_offset = 0, y_offset = 0):
        for particle in self.particles:
            if particle.state == "active":
                particle.update()
                particle.render(pen, x_offset, y_offset) 
                
class Exhaust():
    def __init__(self, number_of_particles):
        self.particles = []
        for _ in range(number_of_particles):
            self.particles.append(Particle(0,0))
            
    def explode(self, x, y, dx_offset = 0, dy_offset = 0):
        for particle in self.particles:
            if particle.state == "inactive":
                particle.color = random.choice(["red", "yellow"])
                particle.x = x
                particle.y = y
                particle.dx = random.randint(-1, 1)
                particle.dy = random.randint(-1, 1)
                particle.dx += dx_offset * 2
                particle.dy += dy_offset * 2
                particle.state = "active"
                
    def render(self, pen, x_offset = 0, y_offset = 0):
        for particle in self.particles:
            if particle.state == "active":
                particle.update()
                pen.width(2)
                particle.render(pen, x_offset, y_offset) 

class Radar():
    def __init__(self, x, y, width, height):
        self.x = x
        self.y = y
        self.width = width
        self.height = height
        
    def render(self, pen, sprites):         
        # Draw radar border         
        character_pen.draw_string(pen, "Radar", self.x, self.y + 130)
        
        pen.color("white")
        pen.penup()

        # Draw sprite radar images
        for sprite in sprites:
            if sprite.state == "active" and Sprite.is_collision(player, sprite, player.sensor_range):
                radar_x = self.x + (sprite.x - player.x) * (self.width / game.width)
                radar_y = self.y + (sprite.y - player.y) * (self.height / game.height)
                pen.goto(radar_x, radar_y)
                pen.color(sprite.color)
                pen.shape(sprite.shape)
                pen.setheading(sprite.heading)
                if isinstance(sprite, Player):
                    pen.shapesize(stretch_wid=0.1, stretch_len=0.2, outline=None) 
                elif isinstance(sprite, Missile):
                    pen.shapesize(stretch_wid=0.05, stretch_len=0.5, outline=None)
                elif isinstance(sprite, Enemy):
                    pen.shapesize(stretch_wid=0.2, stretch_len=0.2, outline=None)
                elif isinstance(sprite, Powerup):
                    pen.shapesize(stretch_wid=0.2, stretch_len=0.2, outline=None)
                    
                pen.stamp()
        pen.setheading(90)
        pen.goto(self.x + 100, self.y)
        pen.pendown()
        pen.circle(100)
        pen.penup()

class Camera(): # the game view is with respect to the player.. the screen moves as the player moves.. 
                #so it is asif player is stationary and the rest are moving toward him.
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.dx = 0
        self.dy = 0
        self.heading = 90
        
        self.visible = False
        
    def toggle_visibility(self):
        if self.visible:
            self.visible = False
        else:
            self.visible = True
                    
    def update(self, player):
        dy = player.y - self.y
        dx = player.x - self.x
        if dx != 0:
            self.heading = math.degrees(math.atan2(dy,dx)) #The Math.atan2() function returns the angle in the plane (in radians) between
                                                           # the positive x-axis and the ray from (0,0) to the point (x,y), for Math.atan2(y,x).
        else:
            self.heading = 90
        
        distance = math.sqrt(((self.x-player.x)**2) + ((self.y-player.y)**2))
        
        self.dx = math.cos(math.radians(self.heading)) * distance / 8
        self.dy = math.sin(math.radians(self.heading)) * distance / 8
        
        self.x += self.dx
        self.y += self.dy
        
    def render(self, pen):
        if self.visible:
            pen.shapesize(stretch_wid=0.3, stretch_len=0.3, outline=None) 
            pen.goto(self.x - player.x - 100, self.y - player.y)
            pen.shape("triangle")
            pen.color("red")
            pen.setheading(self.heading)
            pen.stamp()

# Set up the game
game = Game(1600, 1200)

radar = Radar(400, -200, 200, 200)

# Create the player
player = Player()

# Create the camera
camera = Camera(player.x, player.y)

missiles = []
for _ in range(30):
    missiles.append(Missile(0.0, 0.0))

# Create enemies
enemies = []


stars = []    
for _ in range(20):
    x = random.randint(int(-game.width/4.0), int(game.width/4.0))
    y = random.randint(int(-game.height/4.0), int(game.height/4.0))
    stars.append(Star(x, y))

powerups = []
for _ in range(5):
    x = random.randint(-game.width/2.0, game.width/2.0)
    y = random.randint(-game.height/2.0, game.height/2.0)
    powerups.append(Powerup(x, y))

explosion = Explosion(30)

exhaust = Exhaust(20)

# Create sprites list

background_sprites = []
for star in stars:
    background_sprites.append(star)

sprites = []


# Keyboard binding
wn.listen()

wn.onkeypress(player.rotate_left, "Left")
wn.onkeyrelease(player.stop_rotation, "Left")

wn.onkeypress(player.rotate_right, "Right")
wn.onkeyrelease(player.stop_rotation, "Right")

wn.onkeypress(player.accelerate, "Up")
wn.onkeyrelease(player.decelerate, "Up")

wn.onkeypress(player.fire, "space")

# Game settings
wn.onkeypress(camera.toggle_visibility, "c")
wn.onkeypress(camera.toggle_visibility, "C")

# Start game (from splash screen)
wn.onkeypress(game.start_game, "s")
wn.onkeypress(game.start_game, "S")

# Pause game
wn.onkeypress(game.toggle_pause, "p")
wn.onkeypress(game.toggle_pause, "P")

def timer(game=game):
    os.system("clear")
    print("FPS: {}".format(game.frame))
    game.frame = 0
    turtle.ontimer(timer, 1000)
    

turtle.ontimer(timer, 1000)

while True:
    
    if game.state == "splash":
        wn.update()
        continue
        
    if game.state == "playing":
    
        game.frame += 1
        
        # Render explosions
        explosion.render(pen, camera.x, camera.y)
        
        # Render exhaust
        exhaust.render(pen, camera.x, camera.y)
        
        for sprite in background_sprites:
            sprite.update()
            if Sprite.is_on_screen(sprite, SCREEN_WIDTH, SCREEN_HEIGHT, player.x, player.y):
                sprite.render(pen, camera.x+100, camera.y)
        
        # Move and render the sprites
        for sprite in sprites:
            if sprite.state == "active":
                sprite.update()
                if Sprite.is_on_screen(sprite, SCREEN_WIDTH, SCREEN_HEIGHT, player.x, player.y):
                    sprite.render(pen, camera.x+100, camera.y)
        
        active_enemies = 0
            
        # Check for collisions
        for sprite in sprites:
            # Check if sprite is active
            if sprite.state == "active":
                # Check if it is an enemy
                if isinstance(sprite, Enemy):
                    # Count as active
                    active_enemies += 1
                    # Player collides with enemy
                    if Sprite.is_collision(player, sprite, 18.0):
                        center_x = (player.x + sprite.x) / 2.0
                        center_y = (player.y + sprite.y) / 2.0
                        explosion.explode(center_x-100, center_y) 
                        
                        # Swap momentum for bounce                           
                        player.bounce(sprite)
                        
                        # Check for player death
                        if player.health <= 0:
                            player.reset()
                            player.lives -= 1
                            if player.lives == 0:
                                print("GAME OVER")
                                
                        else:
                            if sprite.health > 0:
                                player.health -= random.randint(int(sprite.health / 2.0), int(sprite.health))
                            if player.health > 0:
                                sprite.health -= random.randint(int(player.health / 2.0), int(player.health))
                            if sprite.health <= 0:
                                sprite.state = "inactive"

                    # Missile collides with enemy
                    for missile in missiles:
                        if missile.state == "active":
                            if Sprite.is_collision(missile, sprite, 13.0):
                                sprite.health -= missile.damage
                                sprite.dx += missile.dx / 3.0
                                sprite.dy += missile.dy / 3.0
                                if sprite.health <= 0:
                                    sprite.state = "inactive"
                                    player.score += 10
                                
                                explosion.explode(missile.x-100, missile.y, -missile.dx, -missile.dy) 
                                
                                missile.reset()

                # Powerup collides with missile
                if isinstance(sprite, Powerup):
                # Missile collides with enemy
                    for missile in missiles:
                        if missile.state == "active":
                            if Sprite.is_collision(missile, sprite, 13):
                                play_sound("explosion.wav")
                                sprite.state = "inactive"
                                player.score -= 50
                                
                                explosion.explode(missile.x-100, missile.y, -missile.dx, -missile.dy)
                                
                                missile.reset()
                            
                # Check if it is a powerup and collides with player
                if isinstance(sprite, Powerup):
                    if Sprite.is_collision(player, sprite, 18):
                        play_sound("powerup.wav")
                        sprite.state = "inactive"
                        missiles.append(Missile(0, 0))
                        missiles[-1].max_fuel = missiles[0].max_fuel
                        missiles[-1].thrust = missiles[0].thrust
                        sprites.append(missiles[-1])
                        for missile in missiles:
                            missile.max_fuel *= 1.1
                            missile.thrust *= 1.05
                            missile.damage *= 1.1
        
        # Render the game border
        game.render_border(pen, camera.x+100, camera.y, SCREEN_WIDTH, SCREEN_HEIGHT)
        
        # Render the score and game attributes
        game.render_info(pen, player.score, active_enemies)
        
        # Render the radar
        radar.render(pen, sprites)

        # Check for end of level
        end_of_level = True
        for sprite in sprites:
            # Look for an active enemy
            if isinstance(sprite, Enemy) and sprite.state == "active":
                end_of_level = False
        if end_of_level:
            game.level += 1
            game.start_level()
        
        # Update the camera
        camera.update(player)
        camera.render(pen)
        
        # Update the screen
        wn.update()
        
        # Clear everything
        pen.clear()