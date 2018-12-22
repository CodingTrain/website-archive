// Daniel Shiffman
// Snakes and Ladders

// A player
class Player {
  
  // Call a reset function to initialize
  constructor() {
    this.reset();
  }

  // Reset variables
  reset() {
    this.spot = -1; // Where I am now
    this.next = -1; // Where I'm going
    this.roll = -1; // What was my latest roll
  }  
  
  // random die roll 1 - 6
  rollDie() {
    this.roll = floor(random(1, 7));
    this.next = this.spot + this.roll;
  }
  
  // Update spot to next
  move() {
    this.spot = this.next;
  }
  
  // Highlight the tiles ahead
  showPreview() {
    let start = max(0, this.spot);
    let end = min(this.next, tiles.length - 1);
    for (let i = start; i <= end; i++) {
      tiles[i].highlight();
    }

  }
  
  // Is player on a Snake or Ladder?
  isSnadder() {
    let tile = tiles[this.spot];
    return (tile && tile.snadder !== 0);
  }
  
  // Move according to the Snake or Ladder
  moveSnadder() {
    let tile = tiles[this.spot];
    this.spot += tile.snadder;
  }

  
  // Display on the current tile
  show() {
    let current = tiles[this.spot];
    // Just get out of here if it's not a valid tile
    if (!current) return;
    fill(255);
    stroke(0);
    let center = current.getCenter();
    ellipse(center[0], center[1], 16);
  }
}
