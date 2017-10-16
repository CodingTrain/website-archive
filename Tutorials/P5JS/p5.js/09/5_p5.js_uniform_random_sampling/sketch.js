// Daniel Shiffman
// Code for: https://youtu.be/XATr_jdh-44

var circles = [];

function setup() {
  createCanvas(640, 360);
  
  // Lets make sure we don't get stuck in infinite loop
  var protection = 0;
  
  // Try to get to 500
  while (circles.length < 500) {
    // Pick a random circle
    var circle = {
      x: random(width),
      y: random(height),
      r: random(6, 36)
    }

    // Does it overlap any previous circles?
    var overlapping = false;
    for (var j = 0; j < circles.length; j++) {
      var other = circles[j];
      var d = dist(circle.x, circle.y, other.x, other.y);
      if (d < circle.r + other.r) {
        overlapping = true;
      }
    }
  
    // If not keep it!
    if (!overlapping) {
      circles.push(circle);
    }
    
    // Are we stuck?
    protection++;
    if (protection > 10000) {
      break;
    }
  }

  // Draw all the circles
  for (var i = 0; i < circles.length; i++) {
    fill(255, 0, 175, 100);
    noStroke();
    ellipse(circles[i].x, circles[i].y, circles[i].r * 2, circles[i].r * 2);
  }

}