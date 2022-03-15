class Pie {
  PVector pos;
  float r;
  int digit;
  float ySpeed;
  float angle;
  Pie(float x, float y) {
    this.pos = new PVector(x, y);
    this.r = 32;
    this.digit = floor(random(10));
    this.ySpeed = 0;
    this.angle=random(TWO_PI);
  }

  void show() {
    push();
    translate(this.pos.x,this.pos.y);
    rotate(this.angle);
    stroke(255);
    strokeWeight(2);
    fill(177,176,180,200);
    circle(0, 0, this.r*2);
    fill(0);
    float d = this.r*2;
    float a = TWO_PI/9;
    for (int i = 0; i<this.digit; i++) {
      fill(255, 0, 255);
      stroke(255);
      arc(0, 0, d, d, a*i, (1+i)*a, PIE);
    }
    pop();
    //textSize(32);
    //textAlign(CENTER,CENTER);
    //text(this.digit,this.pos.x,this.pos.y-(this.r/2));
  }
  void update() {
    this.pos.y = this.pos.y + this.ySpeed;
    this.ySpeed = this.ySpeed + 0.05;
  }
}
