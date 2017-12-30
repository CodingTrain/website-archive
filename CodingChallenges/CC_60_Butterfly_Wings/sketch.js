// Daniel Shiffman
// http://codingtra.in
// Butterfly Wings
// Video: [coming soon]


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(51);
  translate(width / 2, height / 2);
  //rotate(PI / 2);

  stroke(255);
  noStroke();
  strokeWeight(1);

  var da = PI / 200;
  var dx = 0.05;

	var yoff = 0;
	randomSeed(noise(100)*100);
	for (var i = 10; i>0 ; i--) {
		yoff += .2;
		fill(random(255),random(255),random(255));
	  var xoff = 0;
	  beginShape();
	  for (var a = 0; a <= TWO_PI; a += da) {
	    var n = noise(xoff, yoff);
	    var r = sin(2 * a) * map(n, 0, 1, 50, 300);
			r *= i/10;
	    var x = r * cos(a);
	    var y = r * sin(a);
			x *= .51+.5*cos(frameCount/5);
	    if (a < PI){
	        xoff += dx;
	    } else{
	        xoff -= dx;
	    }
	    //point(x, y);
	    vertex(x, y);
	  }
	  endShape();
	}

}
