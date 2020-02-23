// Solar System in Processing - Part 3 (3D textures)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/009-solarsystemgenerator3d-texture.html
// https://youtu.be/FGAwi7wpU8c
// https://editor.p5js.org/codingtrain/sketches/SD8a6k6A

// Since PeasyCam is only for Java, this instead uses p5.EasyCam,
// which is based on PeasyCam but is made for p5.js.
// It can be found here: https://github.com/freshfork/p5.EasyCam

// A significant difference from the Processing version is that p5.js
// does not have the PShape object, so we cannot use that to store the
// geometry along with its texture and so on. Instead, we have to apply
// the texture image every time through draw(), right before drawing
// the sphere that the texture should be applied to.
//
// Luckily, this is not difficult - we simply have to make the Planet
// store the chosen texture image instead of the shape that uses it,
// and instead of replacing the call to sphere() with a call to shape()
// we add a call to texture() right before the sphere() call.

let sun;
let cam;

let sunTexture;
const textures = [];

// Because of the asynchronous nature of file loading in JavaScript, we
// have to load the images in p5.js' preload() instead of in setup().
function preload() {
  sunTexture = loadImage('data/sun.jpg');
  textures[0] = loadImage('data/mars.jpg');
  textures[1] = loadImage('data/earth.jpg');
  textures[2] = loadImage('data/mercury.jpg');
}

function setup() {
  let canvas = createCanvas(600, 600, WEBGL);
  // Disable the context menu on the canvas so the camera can use the right mouse button
  canvas.elt.oncontextmenu = () => false;

  cam = createEasyCam({ distance: 500 });

  sun = new Planet(50, 0, 0, sunTexture);
  sun.spawnMoons(4, 1);
}

function draw() {
  background(0);
  ambientLight(255, 255, 255);
  pointLight(255, 255, 255, 0, 0, 0);
  sun.show();
  sun.orbit();
}
