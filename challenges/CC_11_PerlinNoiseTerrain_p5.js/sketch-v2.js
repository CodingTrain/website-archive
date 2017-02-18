// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/IKB1hWWedMk

// Edited by SacrificeProductions
// Instruction: To use this version rename to sketch.js
// Information: Adds an ocean plane, colors various parts of the terrain based of the Z value.

var cols, rows;
var scl = 20;
var w = 1000;
var h = 1000;

var Ocean = 0; //the ocean level
var flySpeed = 0.2

var terrain = [];

function setup() {
  createCanvas(600, 600, WEBGL);
  cols = w / scl;
  rows = h/ scl;

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < cols; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
}

function draw() {
  var yoff = -frameCount*flySpeed;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var z = map(noise(xoff, yoff), 0, 1, -100, 100);
      var c = { r: 150, g: 150, b: 150 };
      if(z > Ocean-5 && z <= Ocean+5)
        c = { r: 190, g: 153, b: 120 }; //sand
      if(z > Ocean+5 && z <= Ocean+30)
        c = { r: 100, g: 125, b: 88 }; // grass
      if(z > Ocean+60)
        c = { r: 255, g: 255, b: 255 }; //snow
        
      terrain[x][y] = { z: z, clr: c }
      xoff += 0.1;
    }
    yoff += 0.1;
  }
  
  background(200);
  translate(0, 50);
  rotateX(-PI/3);
  translate(-w/2, -h/2);
  
  //Ocean
  fill(90,137,161);
  beginShape();
  vertex(0, 0, Ocean);
  vertex(w, 0, Ocean);
  vertex(w, h, Ocean);
  vertex(0, h, Ocean);
  endShape(CLOSE);
  
  //terrain
  for (var y = 0; y < rows-1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) { 
      fill(terrain[x][y].clr.r,terrain[x][y].clr.g,terrain[x][y].clr.b, 255);
      vertex(x*scl, y*scl, terrain[x][y].z);
      vertex(x*scl, (y+1)*scl, terrain[x][y+1].z);
    }
    endShape();
  }
  
}
