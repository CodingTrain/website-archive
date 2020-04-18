// 2D Cloth with toxiclibs
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/020-cloth3d.html
// https://youtu.be/jrk_lOg_pVA
// https://editor.p5js.org/codingtrain/sketches/U6n24GfsD

let cols = 20;
let rows = 20;

let particles = make2DArray(cols, rows);
let springs = [];

let w = 10;

let physics;

function setup() {
  createCanvas(400, 300);
  physics = new VerletPhysics2D();
  let gravity = new Vec2D(0, 1);
  let gb = new GravityBehavior(gravity);
  physics.addBehavior(gb);

  let x = 100;
  for (let i = 0; i < cols; i++) {
    let y = 10;
    for (let j = 0; j < rows; j++) {
      let p = new Particle(x, y);
      particles[i][j] = p;
      physics.addParticle(p);
      y = y + w;
    }
    x = x + w;
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let a = particles[i][j];
      if (i != cols - 1) {
        let b1 = particles[i + 1][j];
        let s1 = new Spring(a, b1);
        springs.push(s1);
        physics.addSpring(s1);
      }
      if (j != rows - 1) {
        let b2 = particles[i][j + 1];
        let s2 = new Spring(a, b2);
        springs.push(s2);
        physics.addSpring(s2);
      }
    }
  }

  particles[0][0].lock();
  particles[cols - 1][0].lock();
}

function draw() {
  background(0);
  physics.update();

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      //particles[i][j].display();
    }
  }

  for (let s of springs) {
    s.display();
  }
}

function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}
