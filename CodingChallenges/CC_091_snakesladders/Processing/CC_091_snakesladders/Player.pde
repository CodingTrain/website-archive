// Daniel Shiffman
// Snakes and Ladders
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/JrRO3OnWs5s
// Processing transcription: Chuck England

// A player
class Player {
  int spot; // Where I am now
  int next; // Where I'm going
  int roll; // What was my latest roll

  // Call a reset function to initialize
  Player() {
    reset();
  }

  // Reset variables
  void reset() {
    spot = -1; // Where I am now
    next = -1; // Where I'm going
    roll = -1; // What was my latest roll
  }  

  // random die roll 1 - 6
  void rollDie() {
    roll = int(random(1, 7));
    next = spot + roll;
  }

  // Update spot to next
  void move() {
    spot = next;
  }

  // Highlight the tiles ahead
  void showPreview() {
    int start = max(0, spot);
    int end = min(next, tiles.size() - 1);
    for (int i = start; i <= end; i++) {
      tiles.get(i).highlight();
    }
  }

  // Is player on a Snake or Ladder?
  boolean isSnadder() {
    if (spot >= 0 && spot < tiles.size()) {
      Tile tile = tiles.get(spot);
      return tile.snadder != 0;
    }
    return false;
  }

  // Move according to the Snake or Ladder
  void moveSnadder() {
    Tile tile = tiles.get(spot);
    spot += tile.snadder;
  }

  // Display on the current tile
  void show() {
    if (spot >= 0 && spot < tiles.size()) {
      Tile current = tiles.get(spot);
      // Just get out of here if it's not a valid tile
      fill(255);
      stroke(0);
      PVector center = current.getCenter();
      ellipse(center.x, center.y, 16, 16);
    }
  }
}
