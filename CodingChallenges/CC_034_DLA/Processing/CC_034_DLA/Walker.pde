// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/Cl_Gjj80gPE
// Processing transcription: Chuck England

class Walker {
  PVector pos;
  boolean stuck;
  float r;
  float hu;
  
  Walker() {
    pos = randomPoint();
    stuck = false; 
    r = radius;
}
  
  Walker(float x, float y) {
    pos = new PVector(x, y);
    stuck = true;
    r = radius;
  }

  void walk() {
    PVector vel = PVector.random2D();
    // PVector vel = createVector(random(-1, 1), random(-0.5, 1));
    pos.add(vel);
    pos.x = constrain(pos.x, 0, width);
    pos.y = constrain(pos.y, 0, height);
  }

  boolean checkStuck(List<Walker> others) {
    for (int i = 0; i < others.size(); i++) {
      float d = distSq(pos, others.get(i).pos);
      Walker other = others.get(i);
      if (d < (r * r + other.r * other.r +  2 * other.r * r)) {
        //if (random(1) < 0.1) {
        stuck = true;
        return true;
        //break;
        //}
      }
    }
    return false;
  }

  void setHue(float hu_) {
    hu = hu_;
  }

  void show() {
    noStroke();
    if (stuck) {
      fill(hu, 100, 100, 200);
    } else {
      fill(360, 0, 100);
    }
    ellipse(pos.x, pos.y, r * 2, r * 2);
  }
}

PVector randomPoint() {
  int i = floor(random(4));

  if (i == 0) {
    float x = random(width);
    return new PVector(x, 0);
  } else if (i == 1) {
    float x = random(width);
    return new PVector(x, height);
  } else if (i == 2) {
    float y = random(height);
    return new PVector(0, y);
  } else {
    float y = random(height);
    return new PVector(width, y);
  }
}

float distSq(PVector a, PVector b) {
  float dx = b.x - a.x;
  float dy = b.y - a.y;
  return dx * dx + dy * dy;
}
