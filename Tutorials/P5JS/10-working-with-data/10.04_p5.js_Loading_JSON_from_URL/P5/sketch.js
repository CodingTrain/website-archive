var x = 0;

var spaceData;

function setup() {
  createCanvas(200, 200);
  loadJSON("http://api.open-notify.org/astros.json", gotData, 'jsonp');
}

function gotData(data) {
  spaceData = data;
}

function draw() {
  background(0);
  
  if (spaceData) {
    randomSeed(4);
    for (var i = 0; i < spaceData.number; i++) {
      fill(255);
      ellipse(random(width), random(height), 16, 16);
    }
  }

  stroke(255);
  line(x, 0, x, height);
  x = x + 1;
  if (x > width) {
    x = 0;
  }
}