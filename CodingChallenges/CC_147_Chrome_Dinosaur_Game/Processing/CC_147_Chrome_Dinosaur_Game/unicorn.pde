// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/147-chrome-dinosaur.html
// https://youtu.be/l0HoJHc-63Q

// Google Chrome Dinosaur Game (Unicorn, run!)
// https://editor.p5js.org/codingtrain/sketches/v3thq2uhk

class Unicorn {
  int r;
  float x, y, vy, gravity;
  Unicorn() {
    this.r = 100;
    this.x = 50;
    this.y = height - this.r;
    this.vy = 0;
    this.gravity = 3;
  }

  void jump() {
    if (this.y == height - this.r) {
      this.vy = -35;
    }
  }

  boolean hits(Train train) {
    float x1 = this.x + this.r * 0.5;
    float y1 = this.y + this.r * 0.5;
    float x2 = train.x + train.r * 0.5;
    float y2 = train.y + train.r * 0.5;
    return collideCircleCircle(x1, y1, this.r, x2, y2, train.r);
  }

  void move() {
    this.y += this.vy;
    this.vy += this.gravity;
    this.y = constrain(this.y, 0, height - this.r);
  }

  void show() {
    image(uImg, this.x, this.y, this.r, this.r);

    // fill(255, 50);
    // ellipseMode(CORNER);
    // ellipse(this.x, this.y, this.r, this.r);
  }
}

//Ported from p5.collide2D
//https://github.com/bmoren/p5.collide2D/blob/e13a6c80e3fccdd0c3cbfed7a99b514d1097f46d/p5.collide2d.js#L53-L59
boolean collideCircleCircle (float x, float y, float d, float x2, float y2, float d2) {
  //2d
  if ( dist(x, y, x2, y2) <= (d/2)+(d2/2) ) {
    return true;
  }
  return false;
};
