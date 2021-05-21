// Particle Systems with Image Textures (Shader (WEBGL))
// The Nature of Code
// The Coding Train / Daniel Shiffman / Dusk
// https://youtu.be/pUhv2CA0omA
// https://thecodingtrain.com/learning/nature-of-code/4.4-image-textures.html

// Texture Maker: https://editor.p5js.org/codingtrain/sketches/NS4rB1Yx-
// Image Texture: https://editor.p5js.org/codingtrain/sketches/TTVoNt58T
// Shader (WEBGL): https://editor.p5js.org/codingtrain/sketches/EXZmcc4m_

let emitter;

let sh;
const numParticles = 153; // must also be changed in shader
let particleData = [];

function preload() {
  sh = loadShader('shader.vert', 'shader.frag');
}

function setup() {
  createCanvas(400, 400, WEBGL);
  emitter = new Emitter(200, 375);
  for (let i = 0; i < numParticles; ++i) {
    particleData.push(createVector(0, 0, 0));
  }
}

function draw() {
  let force = createVector(0, -0.1);
  emitter.applyForce(force);

  let dir = map(mouseX, width, 0, -0.1, 0.1);
  let wind = createVector(dir, 0);
  emitter.applyForce(wind);

  emitter.emit(3);
  emitter.show(particleData);
  emitter.update();

  translate(-width / 2, -height / 2);

  shader(sh);

  arrayUniform(sh, 'particle', particleData);

  rect(0, 0, width, height);
}

function arrayUniform(shader_, uniformName, vectorArray) {
  for (let i = 0; i < vectorArray.length; ++i) {
    shader_.setUniform(uniformName + i, [
      vectorArray[i].x,
      vectorArray[i].y,
      vectorArray[i].z,
    ]);
  }
}
