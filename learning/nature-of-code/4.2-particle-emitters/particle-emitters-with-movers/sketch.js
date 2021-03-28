// Many Particle Systems (Emitters!)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/wDYD3JVtOys
// https://thecodingtrain.com/learning/nature-of-code/4.1-particle-emitters.html

// Particle Emitters: https://editor.p5js.org/codingtrain/sketches/YqAxA5CYy
// Particle Emitters with Movers Exercise: https://editor.p5js.org/codingtrain/sketches/UXmqwcpRL
// Particles Following Mouse Exercise: https://editor.p5js.org/codingtrain/sketches/1zTN6PYJg
// Particle Emitters Color Exercise: https://editor.p5js.org/codingtrain/sketches/IYisp9xmJ

let movers = [];
let attractor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 4; i++) {
    let x = random(width);
    let y = random(height);
    let m = random(50, 150);
    movers[i] = new Mover(x, y, m);
  }
  attractor = new Attractor(width / 2, height / 2, 100);
  background(0);
}

function draw() {
  clear();
  //blendMode(ADD);
  background(0);
  for (let mover of movers) {
    mover.update();
    mover.show();
    attractor.attract(mover);
  }
  if (mouseIsPressed) {
    attractor.pos.x = mouseX;
    attractor.pos.y = mouseY;
  }
  attractor.show();
}
