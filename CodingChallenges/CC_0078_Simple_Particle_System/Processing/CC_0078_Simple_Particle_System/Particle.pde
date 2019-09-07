class Particle {
  float x;
  float y;
  float vx;
  float vy;
  float alpha;
  
  Particle() {
    x = 300;
    y = 380;
    vx = random(-1, 1);
    vy = random(-5, -1);
    alpha = 255;
  }

  boolean finished() {
    return alpha < 0;
  }

  void update() {
    x += vx;
    y += vy;
    alpha -= 5;
  }

  void show() {
    noStroke();
    //stroke(255);
    fill(255, alpha);
    ellipse(this.x, this.y, 16, 16);
  }

}