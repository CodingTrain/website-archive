var sketch1 = function(p) {
  p.x = 100;
  p.y = 100;
  p.setup = function() {
    p.createCanvas(200, 200);
    p.background(51);
  }
  p.draw = function() {
    p.fill(255, 0, 200, 25);
    p.noStroke();
    p.ellipse(p.x, p.y, 48, 48);

    p.x = p.x + p.random(-10, 10);
    p.y = p.y + p.random(-10, 10);
  }
}

var sketch2 = function(p) {
  p.x = 100;
  p.y = 100;
  p.setup = function() {
    p.createCanvas(200, 200);
    p.background(51);
  }
  p.draw = function() {
    p.fill(255, 200, 0, 25);
    p.noStroke();
    p.ellipse(p.x, p.y, 48, 48);

    p.x = p.x + p.random(-10, 10);
    p.y = p.y + p.random(-10, 10);
  }
}

var myp5_3 = new p5();

var myp5_1 = new p5(sketch1);
var myp5_2 = new p5(sketch2);

function resetBackground() {
  myp5_1.x = myp5_1.width/2;
  myp5_1.y = myp5_1.height/2;
  myp5_1.background(51);
}

setInterval(resetBackground, 3000);

