// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Part 1: https://youtu.be/aKYlikFAV4k
// Part 2: https://youtu.be/EaZxUCWAjb0
// Part 3: https://youtu.be/jwRT4PCT6RU
// Processing transcription: Chuck England

// An educated guess of how far it is between two points
float heuristic(Spot a, Spot b) {
  float d = dist(a.i, a.j, b.i, b.j);
  // float d = abs(a.i - b.i) + abs(a.j - b.j);
  return d;
}

// How many columns and rows?
int cols = 50;
int rows = 50;

// This will be the 2D array
Spot[][] grid = new Spot[cols][rows];

// Open and closed set
List<Spot> openSet = new ArrayList<Spot>();
List<Spot> closedSet = new ArrayList<Spot>();

// Start and end
Spot start;
Spot end;
Spot current;

// Width and height of each cell of grid
float w, h;

// The road taken
List<Spot> path = new ArrayList<Spot>();

void setup() {
  size(400, 400);
  println("A*");

  // Grid cell size
  w = float(width) / cols;
  h = float(height) / rows;

  for (int i = 0; i < cols; i++) {
    for (int j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  // All the neighbors
  for (int i = 0; i < cols; i++) {
    for (int j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }

  // Start and end
  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  start.wall = false;
  end.wall = false;

  // openSet starts with beginning only
  openSet.add(start);
}

void draw() {
  // Am I still searching?
  if (openSet.size() > 0) {

    // Best next option
    int winner = 0;
    for (int i = 0; i < openSet.size(); i++) {
      if (openSet.get(i).f < openSet.get(winner).f) {
        winner = i;
      }
    }
    current = openSet.get(winner);

    // Did I finish?
    if (current == end) {
      noLoop();
      println("DONE!");
    }

    // Best option moves from openSet to closedSet
    //openSet = removeFromArray(openSet, current);
    openSet.remove(current);
    closedSet.add(current);

    // Check all the neighbors
    List<Spot> neighbors = current.neighbors;
    for (int i = 0; i < neighbors.size(); i++) {
      Spot neighbor = neighbors.get(i);

      // Valid next spot?
      if (!closedSet.contains(neighbor) && !neighbor.wall) {
        float tempG = current.g + heuristic(neighbor, current);

        // Is this a better path than before?
        boolean newPath = false;
        if (openSet.contains(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else {
          neighbor.g = tempG;
          newPath = true;
          openSet.add(neighbor);
        }

        // Yes, it's a better path
        if (newPath) {
          neighbor.heuristic = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.heuristic;
          neighbor.previous = current;
        }
      }
    }
  } else {
    // Uh oh, no solution
    println("no solution");
    noLoop();
    return;
  }

  // Draw current state of everything
  background(255);

  for (int i = 0; i < cols; i++) {
    for (int j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }

  for (int i = 0; i < closedSet.size(); i++) {
    closedSet.get(i).show(color(255, 0, 0, 50));
  }

  for (int i = 0; i < openSet.size(); i++) {
    openSet.get(i).show(color(0, 255, 0, 50));
  }

  // Find the path by working backwards
  List<Spot> path = new ArrayList<Spot>();
  Spot temp = current;
  path.add(temp);
  while (temp.previous != null) {
    path.add(temp.previous);
    temp = temp.previous;
  }

  // for (var i = 0; i < path.length; i++) {
    // path[i].show(color(0, 0, 255));
  //}

  // Drawing path as continuous line
  noFill();
  stroke(255, 0, 200);
  strokeWeight(w / 2);
  beginShape();
  for (int i = 0; i < path.size(); i++) {
    vertex(path.get(i).i * w + w / 2, path.get(i).j * h + h / 2);
  }
  endShape();
}
