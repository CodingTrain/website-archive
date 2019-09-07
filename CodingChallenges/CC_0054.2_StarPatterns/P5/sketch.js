// Daniel Shiffman
// http://codingtra.in
// Islamic Star Patterns
// Video Part 1: https://youtu.be/sJ6pMLp_IaI
// Video Part 2: [coming soon]
// Based on: http://www.cgl.uwaterloo.ca/csk/projects/starpatterns/

// Repo with more tiling patterns and features
// https://github.com/CodingTrain/StarPatterns

var polys = [];

var angle = 75;
var delta = 10;

var deltaSlider;
var angleSlider;

function setup() {
  createCanvas(400, 400);
  //angleMode(DEGREES);
  background(51);
  deltaSlider = createSlider(0, 25, 10);
  angleSlider = createSlider(0, 90, 75);

  var inc = 100;
  for (var x = 0; x < width; x += inc) {
    for (var y = 0; y < height; y += inc) {
      var poly = new Polygon(4);
      poly.addVertex(x, y);
      poly.addVertex(x + inc, y);
      poly.addVertex(x + inc, y + inc);
      poly.addVertex(x, y + inc);
      poly.close();
      polys.push(poly);
    }
  }
}

function draw() {
  background(51);
  angle = angleSlider.value();
  delta = deltaSlider.value();
  //console.log(angle, delta);
  for (var i = 0; i < polys.length; i++) {
    polys[i].hankin();
    polys[i].show();
  }
  //noLoop();
}
