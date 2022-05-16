// Self Avoiding Walk (With Bezier)
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
  constructor(dx, dy) {
    this.dx = dx;
    this.dy = dy;
    this.tried = false;
  }
}

function allOptions() {
  return [
    new Step(1, 0),
    new Step(-1, 0),
    new Step(0, 1),
    new Step(0, -1),
    new Step(-1, -1),
    new Step(1, -1),
    new Step(1, 1),
    new Step(-1, 1)
  ];
}

class Spot {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.x = i * spacing;
    this.y = j * spacing;
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
      if (isValid(newX, newY) && !option.tried) {
        validOptions.push(option);
      }
    }

    if (validOptions.length > 0) {
      let step = random(validOptions);
      step.tried = true;
      return grid[this.i + step.dx][this.j + step.dy];
    }
    return undefined;
  }
}
