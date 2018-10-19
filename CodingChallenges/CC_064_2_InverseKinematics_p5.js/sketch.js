// port of Daniel Shiffman's Inverse Kinematics coding challenge
// by madacoo

let tentacle;


function setup() {
  createCanvas(600, 400);

  // We set up point as a p5.Vector instead of passing Segment an x and a y
  // because JavaScript does not have function overloading.
  // See segment.js for more information.
  let point = new p5.Vector(300, 200);

  let current = new Segment(point, 10, 0);
  for (let i = 0; i < 20; i++) {
    let next = new Segment(current, 10, i);
    current.child = next;
    current = next;
  }
  tentacle = current;
}


function draw() {
  background(51);

  tentacle.follow(mouseX, mouseY);
  tentacle.update();
  tentacle.show();

  let next = tentacle.par;
  while (next) {
    next.follow();
    next.update();
    next.show();
    next = next.par;
  }
}


