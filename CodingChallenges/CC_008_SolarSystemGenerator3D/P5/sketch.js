// Solar System in Processing - Part 2 (3D)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/008-solarsystemgenerator3d.html
// https://youtu.be/dncudkelNxw
// https://editor.p5js.org/codingtrain/sketches/QIB-sT10

// Since PeasyCam is only for Java, this instead uses p5.EasyCam,
// which is based on PeasyCam but is made for p5.js.
// It can be found here: https://github.com/freshfork/p5.EasyCam

let sun;
let cam;

function setup() {
  let canvas = createCanvas(600, 600, WEBGL);
  // Disable the context menu on the canvas so the camera can use the right mouse button
  canvas.elt.oncontextmenu = () => false;

  cam = createEasyCam({ distance: 500 });

  sun = new Planet(50, 0, 0);
  sun.spawnMoons(4, 1);
}

function draw() {
  background(0);
  lights();
  sun.show();
  sun.orbit();
}
