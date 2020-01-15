// Toothpicks
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/126-toothpicks.html
// https://youtu.be/-OL_sw2MiYw
// https://editor.p5js.org/codingtrain/sketches/SJMl3u5xN

let picks = [];

let len = 63;

let minX;
let maxX;

function setup() {
  createCanvas(600, 600);
  minX = -width / 2;
  maxX = width / 2;
  picks.push(new Toothpick(0, 0, 1));
}

function draw() {
  background(255);
  translate(width / 2, height / 2);
  let factor = float(width) / (maxX - minX);
  scale(factor);
  for (let t of picks) {
    t.show(factor);
    minX = min(t.ax, minX);
    maxX = max(t.ax, maxX);
  }

  let next = [];
  for (let t of picks) {
    if (t.newPick) {
      let nextA = t.createA(picks);
      let nextB = t.createB(picks);
      if (nextA != null) {
        next.push(nextA);
      }
      if (nextB != null) {
        next.push(nextB);
      }
      t.newPick = false;
    }
  }

  picks = picks.concat(next);
}
