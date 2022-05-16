// Self Avoiding Walk (3D)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/162-self-avoiding-walk.html
// https://youtu.be/

// Basic: https://editor.p5js.org/codingtrain/sketches/2_4gyDD_9
// With Backtracking: https://editor.p5js.org/codingtrain/sketches/dRWS3A9nq
// 3D: https://editor.p5js.org/codingtrain/sketches/D0ONOlCDT
// With Bezier: https://editor.p5js.org/codingtrain/sketches/KFbX0NWgh
// With Recursion: https://editor.p5js.org/codingtrain/sketches/UPxBk1YiB
// Random Walk with Alpha: https://editor.p5js.org/codingtrain/sketches/IEw2RkDnJ

class Step {
  constructor(dx, dy, dz) {
    this.dx = dx;
    this.dy = dy;
    this.dz = dz;
    this.tried = false;
  }
}

function allOptions() {
  return [
    new Step(1, 0, 0),
    new Step(-1, 0, 0),
    new Step(0, 1, 0),
    new Step(0, -1, 0),
    new Step(0, 0, 1),
    new Step(0, 0, -1)
  ];
}

class Spot {
  constructor(i, j, k) {
    this.i = i;
    this.j = j;
    this.k = k;
    this.x = i * spacing; // + 0.1*random(-spacing,spacing);
    this.y = j * spacing; // + 0.1*random(-spacing,spacing);;
    this.z = k * spacing; // + 0.1*random(-spacing,spacing);;
    this.options = allOptions();
    this.visited = false;
  }

  clear() {
    this.visited = false;
    this.options = allOptions();
  }

  nextSpot() {
    let validOptions = [];
    for (let option of this.options) {
      let newX = this.i + option.dx;
      let newY = this.j + option.dy;
      let newZ = this.k + option.dz;
      if (isValid(newX, newY, newZ) && !option.tried) {
        validOptions.push(option);
      }
    }

    if (validOptions.length > 0) {
      let step = random(validOptions);
      step.tried = true;
      return grid[this.i + step.dx][this.j + step.dy][this.k + step.dz];
    }
    return undefined;
  }
}
