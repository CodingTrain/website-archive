// Daniel Shiffman
// Snakes and Ladders
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/JrRO3OnWs5s
// Processing transcription: Chuck England

import java.util.*;

// What is the state?
final int ROLL_STATE = 0; // Rolling the die
final int MOVE_STATE = 1; // Moving to next spot
final int SNADDER_STATE = 2; // Moving along a Snake or Ladder
int state = ROLL_STATE;

// Array of tiles
List<Tile> tiles = new ArrayList<Tile>();
// One player
Player player;

// Unecessary for playing the game
// these variables or for storing all the rolls over time
IntList rolls = new IntList();
int index = 0;
float averageRolls = 0;
Label avgP;

void setup() {
  size(400, 400);
  avgP = new Label("", 15, height - 15, color(0, 0, 255), 20);

  rolls.append(0);

  // Size of tile, columns and rows
  float resolution = 40;
  float cols = width / resolution;
  float rows = height / resolution;

  // Create all the tiles from bottom to top
  float x = 0;
  float y = (rows - 1) * resolution;
  int dir = 1;
  for (int i = 0; i < cols * rows; i++) {
    Tile tile = new Tile(x, y, resolution, i, i + 1);
    tiles.add(tile);
    x = x + (resolution * dir);
    // Move along a winding path up the rows
    if (x >= width || x <= -resolution) {
      dir *= -1;
      x += resolution * dir;
      y -= resolution;
    }
  }

  // Pick random Snakes
  for (int i = 0; i < 3; i++) {
    int index = int(random(cols, tiles.size() - 1));
    // -1 makes in a Snake (drop down a number of spots)
    tiles.get(index).snadder = -1 * int(random(index % cols, index - 1));
  }

  // Pick random Ladders
  for (int i = 0; i < 3; i++) {
    int index = int(random(0, tiles.size() - cols));
    tiles.get(index).snadder = int(random(cols - (index % cols), tiles.size() - index - 1));
  }

  // A new player
  player = new Player();
}

void draw() {
  // frameRate(5);
  background(51);

  // Draw all the tiles, snakes, and ladders
  for (Tile tile : tiles) {
    tile.show();
  }
  for (Tile tile : tiles) {
    tile.showSnadders();
  }

  if (state == ROLL_STATE) {
    // Rolling the die
    player.rollDie();
    rolls.set(index, rolls.get(index) + 1);
    player.showPreview();
    state = MOVE_STATE;
  } else if (state == MOVE_STATE) {
    // Moving the player
    player.move();
    if (player.isSnadder()) {
      state = SNADDER_STATE;
    } else {
      state = ROLL_STATE;
    }
  } else if (state == SNADDER_STATE) {
    // Moving along a Snake or Ladder
    player.moveSnadder();
    state = ROLL_STATE;
  }

  // Draw the player
  player.show();

  // Is the game over?
  if (player.spot >= tiles.size() - 1) {
    state = ROLL_STATE;
    player.reset();
    index++;
    rolls.append(0);
  }

  // Compute average rolls to complete game
  float sum = 0;
  for (int i = 0; i < rolls.size() - 1; i++) {
    sum += rolls.get(i);
  }
  if (rolls.size() > 1) {
    float avg = sum / (rolls.size() - 1);
    avgP.setText(String.format("Average: %.02f", avg));
    avgP.show();
  }
}
