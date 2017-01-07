// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/IKB1hWWedMk
// edits by: Perry Taga

var w = 720;  // dimensions
var h = 500;
var scl = 10; // size of triangles, increasing scl gnerally speeds up performance.
var cols = w/scl;
var rows = h/scl;
var terrain;
var flying = 0;

function setup() {  // create the canvas, and create a 2D array for mesh z values
  createCanvas(w, h, WEBGL);
  terrain = [];
  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
  }
}

function draw() {

  flying -= 0.1;  // movement rate
  var yoff = flying;  // move z values along th y axis
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -75, 75);  // set z values for each (x,y) on the mesh
      xoff += 0.1;
    }
    yoff += 0.1;
  }

  background(255);  // background: at the moment should not be 0, since line color cannot be changed
  
  translate(-(w/2), -(h/3), 0); // WEBGL sets (0,0) in the center of the canvas.
  rotateX(-PI/3.25);  // creates 3D perspective, try different constants.
  for(var y = 0; y < (rows-1); y++){  // x+1 and y+1 are indexed below, so both loops have offset.
    for(var x = 0; x < (cols-1); x++){
      beginShape(LINES);  
      vertex((x*scl), (y*scl), terrain[x][y]);  // begin first side of triangle
      vertex((x*scl), ((y+1)*scl), terrain[x][(y+1)]); // end first side of triangle, etc
      vertex((x*scl), ((y+1)*scl), terrain[x][(y+1)]);
      vertex(((x+1)*scl), ((y+1)*scl), terrain[(x+1)][(y+1)]);
      vertex(((x+1)*scl), ((y+1)*scl), terrain[(x+1)][(y+1)]);
      vertex((x*scl), (y*scl), terrain[x][y]);
      endShape();
      if(y == 0){  // draws the horizon line on the initial sawtooth
        beginShape(LINES);
        vertex((x*scl), (y*scl), terrain[x][y]);
        vertex(((x+1)*scl), (y*scl), terrain[(x+1)][y]);
        endShape();
      }
    }
  }
}
