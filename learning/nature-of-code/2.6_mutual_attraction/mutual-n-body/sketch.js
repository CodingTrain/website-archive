// Mutual Attraction (N-Body Simulation)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/GjbKsOkN1Oc?list=PLRqwX-V7Uu6ZV4yEcW3uDwOgGXKUUsPOM
// https://thecodingtrain.com/learning/nature-of-code/2.6-mutual-attraction.html

// N-Body: https://editor.p5js.org/codingtrain/sketches/bEt7eLZ6Y
// N-Body w/ Barnes-Hut: https://editor.p5js.org/codingtrain/sketches/joXNoi9WL

let movers = [];
let sun;
let qtree;
let G = 0.05;

function setup() {
  createCanvas(1200, 1200);

  for (let i = 0; i < 800; i++) {
    let pos = p5.Vector.random2D();
    let vel = pos.copy();
    vel.setMag(random(10, 15));
    pos.setMag(random(100, 150));
    vel.rotate(PI / 2);
    let m = random(10, 15);
    movers[i] = new Mover(pos.x, pos.y, vel.x, vel.y, m);
  }
  sun = new Mover(0, 0, 0, 0, 500);
  background(0);
}

function draw() {
  background(0, 10);
  let boundary = new Rectangle(0, 0, width / 2, height / 2);
  qtree = QuadTree.create(boundary, 12);

  // Display and move all Things
  for (let m of movers) {
    let point = new Point(m.pos.x, m.pos.y, m);
    qtree.insert(point);
  }

  for (let mover of movers) {
    attract(mover, qtree);

    sun.attract(mover);
    // for (let other of movers) {
    //   if (mover !== other) {
    //     mover.attract(other);
    //     // stroke(255);
    //     // line(mover.pos.x, mover.pos.y, other.pos.x, other.pos.y);
    //   }
    // }
  }

  push();
  translate(width / 2, height / 2);

  for (let mover of movers) {
    mover.update();
    mover.show();
  }

  //show(qtree);
  pop();
  //sun.show();
}

function mousePressed() {
  save('thumb.png');
}

function attract(m, qtree) {
  let d = dist(m.pos.x, m.pos.y, qtree.boundary.x, qtree.boundary.y);
  if (d < 25) {
    if (qtree.points) {
      for (let p of qtree.points) {
        if (m != p.userData) {
          p.userData.attract(m);
        }
      }
    }
  } else {
    if (qtree.points) {
      let temp = new Mover(
        qtree.boundary.x,
        qtree.boundary.y,
        0,
        0,
        m.mass * qtree.points.length
      );
      temp.attract(m);
    }
  }

  if (qtree.divided) {
    attract(m, qtree.northeast);
    attract(m, qtree.northwest);
    attract(m, qtree.southeast);
    attract(m, qtree.southwest);
  }
}

function show(qtree) {
  stroke(255);
  noFill();
  strokeWeight(0.5);
  rectMode(CENTER);
  rect(
    qtree.boundary.x,
    qtree.boundary.y,
    qtree.boundary.w * 2,
    qtree.boundary.h * 2
  );

  if (qtree.divided) {
    show(qtree.northeast);
    show(qtree.northwest);
    show(qtree.southeast);
    show(qtree.southwest);
  }
}
