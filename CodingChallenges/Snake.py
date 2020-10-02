import pygame, random, time
pygame.init()
screen_height = 720
screen_width = 1280
gameDisplay = pygame.display.set_mode((screen_width, screen_height))
pygame.display.set_caption('Snake')
clock = pygame.time.Clock()
global snake
finish = True
back = pygame.image.load('snake.jpg')


def increaseSnakeLength():
        global snake
        snake.append([0, 0])
        
def appearObject(x, y):
        img = pygame.Surface((15, 15))
        img.fill((0, 0, 255))
        gameDisplay.blit(img, (x, y))
        

def isEaten(snake, food):
        if abs(snake[0] - food[0]) <= 15 and abs(snake[1] - food[1])<= 15:     
                return True
        else:
                return False

def score(count):
    font = pygame.font.SysFont(None, 25)
    text = font.render("Score "+str(count), True, (255, 255, 255))
    gameDisplay.blit(text,(0,0))

def isOut(snake):
        if snake[1:].count(snake[0]) > 0:
                return True
        else:
                return False
        
def text_objects(text, font):
    textSurface = font.render(text, True, (0, 0, 0))
    return textSurface, textSurface.get_rect()

def message(text):
    largeText = pygame.font.Font(None,70)
    TextSurf, TextRect = text_objects(str(text), largeText)
    TextRect.center = ((screen_width/2),(screen_height/2))
    gameDisplay.blit(TextSurf, TextRect)
    pygame.display.update()
    pygame.mixer.music.load('nagin_mix_best.mp3')
    pygame.mixer.music.play()    
    time.sleep(5)

    game()

def game():
        global snake
        snake = [[250, 250]]
        snakeImg = pygame.Surface((15, 15))
        snakeImg.fill((255, 255, 255))
        finish = False
        x_change = 0
        y_change = 0

        foodx, foody = 100, 200
        objects_eaten = 0
        direction = None
        speed = 3
        pygame.mixer.music.load('nagin_music.mp3')
        pygame.mixer.music.play(-1)
        while not finish:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    finish = True
                    
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_LEFT and direction != 'Right':
                        x_change = -2 - speed
                        y_change = 0
                        direction = 'Left'
                        
                        
                    if event.key == pygame.K_RIGHT and direction != 'Left':
                        x_change = 2 + speed
                        y_change = 0
                        direction = 'Right'
                        
                    if event.key == pygame.K_UP and direction != 'Down':
                        x_change = 0
                        y_change = -2 - speed
                        direction = 'UP'
                        
                    if event.key == pygame.K_DOWN and direction != 'UP':
                        x_change = 0
                        y_change = 2 + speed
                        direction = 'Down'

                    if event.key == pygame.K_TAB:       #Cheat for programmer
                            increaseSnakeLength()
                            objects_eaten+=1
                            

                    if event.key == pygame.K_ESCAPE:
                            finish = True
                

            
            gameDisplay.blit(back, (0,0))
            snakeLength = len(snake)-1    
            while snakeLength > 0:
                snake[snakeLength] = snake[snakeLength-1].copy()
                snakeLength -= 1
                
            snake[0][0] = (snake[0][0]+x_change)%screen_width
            snake[0][1] = (snake[0][1]+y_change)%screen_height
            
            appearObject(foodx, foody)
            
            if isEaten(snake[0], [foodx, foody]):
                    objects_eaten += 1    
                    increaseSnakeLength()
                    foodx, foody = random.randint(5, screen_width-5), random.randint(5, screen_height-5)

            
                

            for i in snake:
                    gameDisplay.blit(snakeImg, i)

            if objects_eaten != 0 and objects_eaten%10 == 0:
                    speed += 1
                    objects_eaten += 1
                    print(speed)
            score(objects_eaten)

            if isOut(snake):
                    message("OOps!!! OUT Try Again Score is "+str(objects_eaten))
                    
            pygame.display.update()
            gameDisplay.fill((0, 0, 0))    
            clock.tick(600)
if finish!= False:
        game()
pygame.quit()

