// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Minesweeper
// Video: https://youtu.be/LFU5ZlrR21E

// Originally written using p5.js

Cell[][] grid;
int cols;
int rows;
int w = 20;

int totalBees = 30;

void setup() {
  size(401, 401);
  cols = floor(width / w);
  rows = floor(height / w);
  grid = new Cell[cols][rows];
  for (int i = 0; i < cols; i++) {
    for (int j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }

  // Pick totalBees spots
  ArrayList<int[]> options = new ArrayList<int[]>();

  for (int i = 0; i < cols; i++) {
    for (int j = 0; j < rows; j++) {
      int[] option = new int[2];
      option[0] = i;
      option[1] = j;
      options.add(option);
    }
  }


  for (int n = 0; n < totalBees; n++) {
    int index = floor(random(options.size()));
    int[] choice = options.get(index);
    int i = choice[0];
    int j = choice[1];
    // Deletes that spot so it's no longer an option
    options.remove(index);
    grid[i][j].bee = true;
  }


  for (int i = 0; i < cols; i++) {
    for (int j = 0; j < rows; j++) {
      grid[i][j].countBees();
    }
  }

}

void gameOver() {
  for (int i = 0; i < cols; i++) {
    for (int j = 0; j < rows; j++) {
      grid[i][j].revealed = true;
    }
  }
}

void mousePressed() {
  for (int i = 0; i < cols; i++) {
    for (int j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
        grid[i][j].reveal();

        if (grid[i][j].bee) {
          gameOver();
        }

      }
    }
  }
}

void draw() {
  background(255);
  for (int i = 0; i < cols; i++) {
    for (int j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}