// Coding Train
// http://thecodingtrain.com

// Poisson Disc Sampling: https://youtu.be/flQgnCUxHl
// Processing port by Max: https://github.com/TheLastDestroyer

float r = 4;
int k = 30;
PVector[] grid;
float w = r / sqrt(2);
ArrayList<PVector> active;
int cols, rows;
ArrayList<PVector> ordered;

void setup() {
  size(400, 400);
  background(0);
  strokeWeight(4);
  colorMode(HSB);

  // STEP 0
  cols = floor(width / w);
  rows = floor(height / w);
  grid = new PVector[cols*rows];
  active = new ArrayList<PVector>();
  ordered = new ArrayList<PVector>();
  for (int i = 0; i < cols * rows; i++) {
    grid[i] = null;
  }

  // STEP 1
  float x = width / 2;
  float y = height / 2;
  int i = floor(x / w);
  int j = floor(y / w);
  PVector pos = new PVector(x, y);
  grid[i + j * cols] = pos;
  active.add(pos);
  println(active);
  //frameRate(1);
}

void draw() {
  background(0);

  //noLoop();

  for (int total = 0; total < 25; total++) {
    if (active.size() > 0) {
      int randIndex = floor(random(active.size()));
      PVector pos = active.get(randIndex);
      boolean found = false;
      for (int n = 0; n < k; n++) {
        PVector sample = PVector.random2D();
        float m = random(r, 2 * r);
        sample.setMag(m);
        sample.add(pos);

        int col = floor(sample.x / w);
        int row = floor(sample.y / w);
        //println(col, row, cols, rows, grid[col + row * cols]);
        if (col > -1 && row > -1 && col < cols && row < rows && grid[col + row * cols] == null) {
          boolean ok = true;
          for (int i = -1; i <= 1; i++) {
            for (int j = -1; j <= 1; j++) {
              int index = (col + i) + (row + j) * cols;
              PVector neighbor = grid[index];
              if (neighbor != null) {
                float d = PVector.dist(sample, neighbor);
                if (d < r) {
                  ok = false;
                }
              }
            }
          }
          if (ok) {
            found = true;
            grid[col + row * cols] = sample;
            active.add(sample);
            ordered.add(sample);
            // Should we break?
            break;
          }
        }
      }

      if (!found) {
        //active.remove(randIndex);
      }

    }
  }

  for (int i = 0; i < ordered.size(); i++) {
      stroke(i % 360, 100, 100);
      strokeWeight(r * 0.5);
      point(ordered.get(i).x, ordered.get(i).y);
  }
  //println(active);

  // for (var i = 0; i < active.length; i++) {
  //   stroke(255, 0, 255);
  //   strokeWeight(1);
  //   point(active[i].x, active[i].y);
  // }
  //console.log(active.length);
}
