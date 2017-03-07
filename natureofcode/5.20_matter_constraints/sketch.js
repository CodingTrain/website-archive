// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/szztTszPp-8

// module aliases
var Engine = Matter.Engine,
  // Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Constraint = Matter.Constraint;

var engine;
var world;
var particles = [];
var boundaries = [];

var ground;

function setup() {
  createCanvas(400, 400);
  engine = Engine.create();
  world = engine.world;
  //Engine.run(engine);

  var prev = null;
  for (var x = 200; x < 400; x += 20) {

    var fixed = false;
    if (!prev) {
      fixed = true;
    }
    var p = new Particle(x, 100, 5, fixed);
    // var p2 = new Particle(200, 150, 10);
    particles.push(p);

    if (prev) {
      var options = {
        bodyA: p.body,
        bodyB: prev.body,
        length: 20,
        stiffness: 0.4
      }
      var constraint = Constraint.create(options);
      World.add(world, constraint);
    }

    prev = p;
  }


  boundaries.push(new Boundary(200, height, width, 50, 0));
}

// function keyPressed() {
//   if (key == ' ') {
//   }
// }

// function mouseDragged() {
//   circles.push(new Circle(mouseX, mouseY, random(5, 10)));
// }

function draw() {
  background(51);
  Engine.update(engine);
  for (var i = 0; i < boundaries.length; i++) {
    boundaries[i].show();
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].show();
  }

  //line(particles[0].body.position.x, particles[0].body.position.y, particles[1].body.position.x, particles[1].body.position.y);

}
