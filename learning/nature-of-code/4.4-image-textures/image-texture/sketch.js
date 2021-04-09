// Particle Systems with Image Textures (Image Texture)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/pUhv2CA0omA
// https://thecodingtrain.com/learning/nature-of-code/4.4-image-textures.html

// Texture Maker: https://editor.p5js.org/codingtrain/sketches/NS4rB1Yx-
// Image Texture: https://editor.p5js.org/codingtrain/sketches/TTVoNt58T
// Shader (WEBGL): https://editor.p5js.org/codingtrain/sketches/EXZmcc4m_

let emitter;
let img;

function preload() {
  img = loadImage('texture32.png');
}

function setup() {
  createCanvas(400, 400);
  emitter = new Emitter(200, 375);
}

function draw() {
  clear();
  background(0);
  blendMode(ADD);

  let force = createVector(0, -0.1);
  emitter.applyForce(force);

  let dir = map(mouseX, 0, width, -0.1, 0.1);
  let wind = createVector(dir, 0);
  emitter.applyForce(wind);

  emitter.emit(1);
  emitter.show();
  emitter.update();
}
