int[][] grid = new int[4][4];

boolean isGameOver() {
  for (int i = 0; i < 4; i++) {
    for (int j = 0; j < 4; j++) {
      if (grid[i][j] == 0) {
        return false;
      }
      if (i != 3 && grid[i][j] == grid[i + 1][j]) {
        return false;
      }
      if (j != 3 && grid[i][j] == grid[i][j + 1]) {
        return false;
      }
    }
  }
  return true;
}

boolean got2048(){
  for (int i = 0; i < 4; i++) {
    for (int j = 0; j < 4; j++) {
      if (grid[i][j] == 2048) {
        return true;
      }
    }
  }
  return false;
}

int[][] blankGrid() {
    int[][] a = {
    {0, 0, 0, 0},
    {0, 0, 0, 0},
    {0, 0, 0, 0},
    {0, 0, 0, 0}
  };
  return a;
}

void setup() {
  size(400, 400);
  grid = blankGrid();
  addNumber(2);
}

void addNumber(int num) {
  int startingspots = 0;
  while(startingspots < num){
    int x = (int)random(4);
    int y = (int)random(4);
    if(grid[x][y] == 0)
    {
      float r = random(1);
      grid[x][y] = r > 0.5 ? 4 : 2;
      startingspots++;
    }
    
  }
  
}

boolean compare(int[][] a, int[][] b) {
  for (int i = 0; i < 4; i++) {
    for (int j = 0; j < 4; j++) {
      if ( a[i][j] != b[i][j]) {
        return true;
      }
    }
  }
  return false;
}

int[][] copyGrid(int[][] grid) {
  int[][] extra = blankGrid();
  for (int i = 0; i < 4; i++) {
    for (int j = 0; j < 4; j++) {
      extra[i][j] = grid[i][j];
    }
  }
  return extra;


}

void reverse(int arr[], int start, int end)
{
   int temp;
   if (start >= end)
     return;
   temp = arr[start];   
   arr[start] = arr[end];
   arr[end] = temp;
   reverse(arr, start+1, end-1);
   
} 

int[][] flipGrid(int[][] grid) {
  for (int i = 0; i < 4; i++) {
    reverse(grid[i],0,3);
}
  return grid;
}

int[][] rotateGrid(int grid[][]) {
  int[][] newGrid = blankGrid();
  for (int i = 0; i < 4; i++) {
    for (int j = 0; j < 4; j++) {
      newGrid[i][j] = grid[j][i];
    }
  }
  return newGrid;
}
// One "move"
void keyPressed() {
  boolean flipped = false;
  boolean rotated = false;
  boolean played = true;
  
  if (keyCode == DOWN) {
    
  } else if (keyCode == UP) {
    grid = flipGrid(grid);
    flipped = true;
  } else if (keyCode == RIGHT) {
    grid = rotateGrid(grid);
    rotated = true;
  } else if (keyCode == LEFT) {
    grid = rotateGrid(grid);
    grid = flipGrid(grid);
    rotated = true;
    flipped = true;
  } else {
    played = false;
  }


  if (played) {
    int[][] past = copyGrid(grid);
    for (int i = 0; i < 4; i++) {
      grid[i] = operate(grid[i]);
    }
    boolean changed = compare(past, grid);

    if (flipped) {
      grid = flipGrid(grid);
    }
    if (rotated) {
      grid = rotateGrid(grid);
      grid = rotateGrid(grid);
      grid = rotateGrid(grid);
    }

    if (changed) {
      addNumber(1);
    }
    

    boolean gameover = isGameOver();
    boolean wingame = got2048();
    if (gameover) {
      print("GAME OVER");
    }
    
    if(wingame) {
      print("You have reached 2048!!!");
    }
  }


}

int[] operate(int[] row) {
  row = slide(row);
  row = combine(row);
  row = slide(row);
  return row;
}


void draw() {
  background(255);
  drawGrid();
}

int[] slide(int[] row) {
  int[] arr = new int[4];
  int index=3;
  for(int i = 3 ; i >= 0 ;i--)
  {
    if(row[i] != 0)
    {
      arr[index] = row[i];
      index--;
    }
  }
  
  return arr;
}


int[] combine(int[] row) {
  for (int i = 3; i >= 1; i--) {
    int a = row[i];
    int b = row[i - 1];
    if (a == b) {
      row[i] = a + b;
      //score += row[i];
      row[i - 1] = 0;
    }
  }
  return row;
}

void drawGrid() {
  int w = 100;
  
  for (int i = 0; i < 4; i++) {
    for (int j = 0; j < 4; j++) {
      noFill();
      strokeWeight(2);
      stroke(0);
      rect(i * w, j * w, w, w);
      int val = grid[i][j];
      if (grid[i][j] != 0) {
        textAlign(CENTER,CENTER);
        String s = "" + val;
        int len = s.length() - 1;
        int[] sizes = {64, 64, 32, 16};
        fill(0);
        noStroke();
        textSize(sizes[len]);
        text(val, i * w + w / 2, j * w + w / 2);
      }
    }
  }
  
}
