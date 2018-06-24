// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Sandpiles
// https://youtu.be/diGjw5tghYU

let sandpiles;

function setup() {
  createCanvas(800, 800);
  pixelDensity(1);
  sandpiles = new Array(width).fill().map(i => new Array(height).fill(0));
  sandpiles[width/2][height/2] = 1000000000;
}

function topple() {
  let nextpiles = [];
  for (let x = 0; x < width; x++) {
    nextpiles[x] = new Array(height).fill(0);
    for (let y = 0; y < height; y++) {
      let num = sandpiles[x][y];
      if (num < 4) {
        nextpiles[x][y] = sandpiles[x][y];
      }
    }
  }

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let num = sandpiles[x][y];
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

function render() {
  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let num = sandpiles[x][y];
      let col = color(255, 0, 0);
      if (num == 0) {
        col = color(255, 255, 0);
      } else if (num == 1) {
        col = color(0, 185, 63);
      } else if (num == 2) {
        col = color(0, 104, 255);
      } else if (num == 3) {
        col = color(122, 0, 229);
      }

      set(x, y, col);
    }
  }

  updatePixels();
}

function draw() {
  render();
  for (let i = 0; i < 100; i++) {
    topple();
  }
}
