// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Langton's Ant
// Edited Video: https://youtu.be/G1EgjgMo48U

int[][] grid;
int x;
int y;
int dir;

int ANTUP = 0;
int ANTRIGHT = 1;
int ANTDOWN = 2;
int ANTLEFT = 3;

PImage ant;


void setup() {
  //size(400, 400);
  fullScreen();
  grid = new int[width][height];
  ant = createImage(width,height,RGB);
  ant.loadPixels();
  for (int i = 0; i < ant.pixels.length; i++) {
    ant.pixels[i] = color(255);
  }
  ant.updatePixels();
  x = width/2;
  y = height/2;
  dir = ANTUP;
}

void turnRight() {
  dir++;
  if (dir > ANTLEFT) {
    dir = ANTUP;
  }
}

void turnLeft() {
  dir--;
  if (dir < ANTUP) {
    dir = ANTLEFT;
  }
}

void moveForward() {
  if (dir == ANTUP) {
    y--;
  } else if (dir == ANTRIGHT) {
    x++;
  } else if (dir == ANTDOWN) {
    y++;
  } else if (dir == ANTLEFT) {
    x--;
  }

  if (x > width-1) {
    x = 0;
  } else if (x < 0) {
    x = width-1;
  }
  if (y > height-1) {
    y = 0;
  } else if (y < 0) {
    y = height-1;
  }
}


void draw() {
  background(255);

  ant.loadPixels();
  for (int n = 0; n < 100000; n++) {
    int state = grid[x][y];
    if (state == 0) {
      turnRight();
      grid[x][y] = 1;
    } else if (state == 1) {
      turnLeft();
      grid[x][y] = 0;
    }

    color col = color(255);
    if (grid[x][y] == 1) {
      col = color(0);
    }
    int pix = x + y * ant.width;
    ant.pixels[pix] = col;
    moveForward();
  }
  ant.updatePixels();


  image(ant,0,0);
  //loadPixels();
  //for (int i = 0; i < width; i++) {
  //  for (int j = 0; j < height; j++) {
  //    int pix = i + width * j;
  //    if (grid[i][j] == 0) {
  //      pixels[pix] = color(255);
  //    } else {
  //      pixels[pix] = color(0);
  //    }
  //  }
  //}
  //updatePixels();
}
