// Daniel Shiffman
// http://youtube.com/thecodingtrain
// http://codingtra.in

// Coding Challenge #115: Snake Game Redux
// https://youtu.be/OMoVcohRgZA

Snake snake;
int rez = 20;
PVector food;
float w;
float h;

void setup() {
  size(400, 400);
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(5);
  snake = new Snake();
  foodLocation();
}

void foodLocation() {
  float x = floor(random(w));
  float y = floor(random(h));
  food = new PVector(x, y);

}

void keyPressed() {
  if (keyCode == LEFT) {
    snake.setDir(-1, 0);
  } else if (keyCode == RIGHT) {
    snake.setDir(1, 0);
  } else if (keyCode == DOWN) {
    snake.setDir(0, 1);
  } else if (keyCode == UP) {
    snake.setDir(0, -1);
  } else if (key == ' ') {
    snake.grow();
  }

}

void draw() {
  scale(rez);
  background(220);
  if (snake.eat(food)) {
    foodLocation();
  }
  snake.update();
  snake.show();


  if (snake.endGame()) {
    print("END GAME");
    background(255, 0, 0);
    noLoop();
  }

  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);
}
