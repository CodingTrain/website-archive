// port of Daniel Shiffman's pde SolarSystemGenerator by madacoo


function setup() {
    createCanvas(600, 600);
    sun = new Planet(50, 0, 0, random(TWO_PI));
    sun.spawnMoons(5, 1);
}

function draw() {
    background(51);
    translate(width/2, height/2);
    sun.show();
    sun.orbit();
}
