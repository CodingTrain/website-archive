// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Sandpiles
// https://youtu.be/diGjw5tghYU

int[][] sandpiles;

void setup() {
  size(800, 800);
  sandpiles = new int[width][height];
  sandpiles[width/2][height/2] = 1000000000;
}

void topple() {
  int[][] nextpiles = new int[width][height];  
  for (int x = 0; x < width; x++) {
    for (int y = 0; y < height; y++) {
      int num = sandpiles[x][y];
      if (num < 4) {
        nextpiles[x][y] = sandpiles[x][y];
      }
    }
  }

  for (int x = 0; x < width; x++) {
    for (int y = 0; y < height; y++) {
      int num = sandpiles[x][y];
      if (num >= 4) {
        nextpiles[x][y] += (num - 4);
        if (x+1 < width)
          nextpiles[x+1][y]++;
        if (x-1 >= 0)
          nextpiles[x-1][y]++;
        if (y+1 < height) 
          nextpiles[x][y+1]++;
        if (y-1 >= 0) 
          nextpiles[x][y-1]++;
      }
    }
  }

  sandpiles = nextpiles;
}

void render() {
  loadPixels();
  for (int x = 0; x < width; x++) {
    for (int y = 0; y < height; y++) {
      int num = sandpiles[x][y];
      color col = color(255, 0, 0);
      if (num == 0) {
        col = color(255, 255, 0);
      } else if (num == 1) {
        col = color(0, 185, 63);
      } else if (num == 2) {
        col = color(0, 104, 255);
      } else if (num == 3) {
        col = color(122, 0, 229);
      }

      pixels[x+y*width] = col;
    }
  }

  updatePixels();
}


void draw() {
  render(); 
  for (int i = 0; i < 100; i++) {
    topple();
  }
}