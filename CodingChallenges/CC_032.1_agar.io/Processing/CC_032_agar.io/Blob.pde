// Coding Train
// http://thecodingtrain.com
// http://patreon.com/codingtrain

// Code for: https://youtu.be/JXuxYMGe4KI
// Processing port by Max (https://github.com/TheLastDestroyer)

class Blob{
  PVector pos, vel;
  float r;
  Blob(float _x, float _y, float _r){
    pos = new PVector(_x, _y);
    vel = new PVector(0,0);
    r = _r;

  }

  void update() {
    PVector newvel = new PVector(mouseX-width/2, mouseY-height/2);
    newvel.setMag(3);
    vel.lerp(newvel, 0.2);
    pos.add(vel);
  }

  boolean eats(Blob other) {
    float d = PVector.dist(pos, other.pos);
    if (d < r + other.r) {
      float sum = PI * r * r + PI * other.r * other.r;
      r = sqrt(sum / PI);
      //r += other.r;
      return true;
    } else {
      return false;
    }
  }

  void show() {
    fill(255);
    ellipse(pos.x, pos.y, r*2, r*2);
  }
}
