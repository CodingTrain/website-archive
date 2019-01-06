// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Part 1: https://youtu.be/aKYlikFAV4k
// Part 2: https://youtu.be/EaZxUCWAjb0
// Part 3: https://youtu.be/jwRT4PCT6RU
// Processing transcription: Chuck England

import java.util.*;

// An object to describe a spot in the grid
class Spot {
  int i;
  int j;
  // f, g, and h values for A*
  float f = 0;
  float g = 0;
  float heuristic = 0;
  
  // Neighbors
  List<Spot> neighbors = new ArrayList<Spot>();

  // Where did I come from?
  Spot previous = null;

  boolean wall = false;
  
  Spot(int i_, int j_) {

    // Location
    i = i_;
    j = j_;

    // Am I a wall?
    wall = false;
    if (random(1) < 0.4) {
      wall = true;
    }
  }
  
  // Display me
  void show() {
    if (wall) {
      fill(0);
      noStroke();
      ellipse(i * w + w / 2.0, j * h + h / 2.0, w / 2.0, h / 2.0);
    }
  }
  
  void show(color col) {
    if (wall) {
      fill(0);
      noStroke();
      ellipse(i * w + w / 2.0, j * h + h / 2.0, w / 2.0, h / 2.0);
    } else {
      fill(col);
      rect(i * w, j * h, w, h);
    }
  }

  // Figure out who my neighbors are
  void addNeighbors(Spot[][] grid) {
    if (i < cols - 1) {
      neighbors.add(grid[i + 1][j]);
    }
    if (i > 0) {
      neighbors.add(grid[i - 1][j]);
    }
    if (j < rows - 1) {
      neighbors.add(grid[i][j + 1]);
    }
    if (j > 0) {
      neighbors.add(grid[i][j - 1]);
    }
    if (i > 0 && j > 0) {
      neighbors.add(grid[i - 1][j - 1]);
    }
    if (i < cols - 1 && j > 0) {
      neighbors.add(grid[i + 1][j - 1]);
    }
    if (i > 0 && j < rows - 1) {
      neighbors.add(grid[i - 1][j + 1]);
    }
    if (i < cols - 1 && j < rows - 1) {
      neighbors.add(grid[i + 1][j + 1]);
    }
  }
};
