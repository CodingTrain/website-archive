// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/flQgnCUxHlw

var r = 4;
var k = 30;
var grid = [];
var w = r / Math.sqrt(2);
var active = [];
var cols, rows;
var ordered = [];

function setup() {
  createCanvas(400, 400);
  background(0);
  strokeWeight(4);
  colorMode(HSB);

  // STEP 0
  cols = floor(width / w);
  rows = floor(height / w);
  for (var i = 0; i < cols * rows; i++) {
    grid[i] = undefined;
  }

  // STEP 1
  var x = width / 2;
  var y = height / 2;
  var i = floor(x / w);
  var j = floor(y / w);
  var pos = createVector(x, y);
  grid[i + j * cols] = pos;
  active.push(pos);
  //frameRate(1);
}

function draw() {
  background(0);
  //noLoop();

  for (var total = 0; total < 25; total++) {
    if (active.length > 0) {
      var randIndex = floor(random(active.length));
      var pos = active[randIndex];
      var found = false;
      for (var n = 0; n < k; n++) {
        var sample = p5.Vector.random2D();
        var m = random(r, 2 * r);
        sample.setMag(m);
        sample.add(pos);

        var col = floor(sample.x / w);
        var row = floor(sample.y / w);

        if (
          col > -1 &&
          row > -1 &&
          col < cols &&
          row < rows &&
          !grid[col + row * cols]
        ) {
          var ok = true;
          for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
              var index = col + i + (row + j) * cols;
              var neighbor = grid[index];
              if (neighbor) {
                var d = p5.Vector.dist(sample, neighbor);
                if (d < r) {
                  ok = false;
                }
              }
            }
          }
          if (ok) {
            found = true;
            grid[col + row * cols] = sample;
            active.push(sample);
            ordered.push(sample);
            // Should we break?
            break;
          }
        }
      }

      if (!found) {
        active.splice(randIndex, 1);
      }
    }
  }

  for (var i = 0; i < ordered.length; i++) {
    if (ordered[i]) {
      stroke(i % 360, 100, 100);
      strokeWeight(r * 0.5);
      point(ordered[i].x, ordered[i].y);
    }
  }

  // for (var i = 0; i < active.length; i++) {
  //   stroke(255, 0, 255);
  //   strokeWeight(1);
  //   point(active[i].x, active[i].y);
  // }
  //console.log(active.length);
}
