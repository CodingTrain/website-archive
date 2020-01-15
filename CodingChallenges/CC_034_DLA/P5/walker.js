// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/Cl_Gjj80gPE

function Walker(x, y) {
  if (arguments.length == 2) {
    this.pos = createVector(x, y);
    this.stuck = true;
  } else {
    this.pos = randomPoint();
    this.stuck = false;
  }
  this.r = radius;

  this.walk = function() {
    var vel = p5.Vector.random2D();
    // var vel = createVector(random(-1, 1), random(-0.5, 1));
    this.pos.add(vel);
    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);
  };

  this.checkStuck = function(others) {
    for (var i = 0; i < others.length; i++) {
      var d = distSq(this.pos, others[i].pos);
      if (
        d <
        this.r * this.r + others[i].r * others[i].r + 2 * others[i].r * this.r
      ) {
        //if (random(1) < 0.1) {
        this.stuck = true;
        return true;
        // break;
        //}
      }
    }
    return false;
  };

  this.setHue = function(hu) {
    this.hu = hu;
  };

  this.show = function() {
    noStroke();
    if (this.stuck && typeof this.hu !== 'undefined') {
      fill(this.hu, 255, 100, 200);
    } else {
      fill(360, 0, 255);
    }
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
  };
}

function randomPoint() {
  var i = floor(random(4));

  if (i === 0) {
    var x = random(width);
    return createVector(x, 0);
  } else if (i === 1) {
    var x = random(width);
    return createVector(x, height);
  } else if (i === 2) {
    var y = random(height);
    return createVector(0, y);
  } else {
    var y = random(height);
    return createVector(width, y);
  }
}

function distSq(a, b) {
  var dx = b.x - a.x;
  var dy = b.y - a.y;
  return dx * dx + dy * dy;
}
