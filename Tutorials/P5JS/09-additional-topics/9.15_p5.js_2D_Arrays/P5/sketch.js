var cols = 10;
var rows = 10;

var colors = [];

function make2Darray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function setup() {
  createCanvas(300, 300);
  colors = make2Darray(cols, rows);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      colors[i][j] = random(255);
    }
  }
}

function draw() {
  background(51);

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      var x = i * 30;
      var y = j * 30;
      fill(colors[i][j]);
      stroke(0);
      rect(x, y, 30, 30);
    }
  }
}
