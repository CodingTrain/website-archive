// Basile Pesin
// http://vertmo.github.io

// MetaBalls : p5.js implementation

var blobs = []

function setup() {
    createCanvas(640, 380);
    colorMode(HSB);
    for(i=0; i<10; i++) blobs.push(new Blob(random(0, width), random(0, height)));
}

function draw() {
    background(51);
}
