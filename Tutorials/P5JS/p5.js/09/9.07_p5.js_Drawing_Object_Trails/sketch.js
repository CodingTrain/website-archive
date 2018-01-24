// Daniel Shiffman
// code for https://youtu.be/vqE8DMfOajk

var particles = [];

function setup() {
  createCanvas(600, 600);
}

function mousePressed() {
  particles.push(new Particle(mouseX, mouseY));
}

function draw() {
  background(200);
  for (var i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].show();
  }
  
  //line(frameCount, 0, frameCount, height);
}