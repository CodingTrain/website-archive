// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/jxGS3fKPKJAvar cells = [];

var cells = [];

function setup() {
  createCanvas(700, 700);
  cells.push(new Cell());
  cells.push(new Cell());
}

function draw() {
 background(200);
 for (var i = 0; i < cells.length; i++) {
   cells[i].move();
   cells[i].show();
 }
}

function mousePressed() {
  for (var i = cells.length-1; i >= 0; i--) {
    if (cells[i].clicked(mouseX, mouseY)) {
      cells.push(cells[i].mitosis());
      cells.push(cells[i].mitosis());
      cells.splice(i, 1);
    }
  }
}
