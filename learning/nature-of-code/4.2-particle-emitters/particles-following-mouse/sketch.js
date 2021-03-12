// Many Particle Systems (Emitters!)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/wDYD3JVtOys
// https://thecodingtrain.com/learning/nature-of-code/4.1-particle-emitters.html

// Particle Emitters: https://editor.p5js.org/codingtrain/sketches/YqAxA5CYy
// Particle Emitters with Movers Exercise: https://editor.p5js.org/codingtrain/sketches/UXmqwcpRL
// Particles Following Mouse Exercise: https://editor.p5js.org/codingtrain/sketches/1zTN6PYJg
// Particle Emitters Color Exercise: https://editor.p5js.org/codingtrain/sketches/IYisp9xmJ

let emitter;

function setup() {
  createCanvas(windowWidth, windowHeight);
  emitter = new Emitter(width / 2, height / 2);
}

function draw() {
  background(0);
  emitter.updatePosition(mouseX, mouseY);
  emitter.emit(4);
  emitter.show();
  emitter.update();
}
