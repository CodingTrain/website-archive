// Daniel Shiffman
// code for https://youtu.be/vqE8DMfOajk

class Particle {
  float x;
  float y;
  ArrayList<PVector> history;

  Particle(float x, float y) {
    this.x = x;
    this.y = y;
    this.history = new ArrayList<PVector>();
  }

  void update() {
    this.x += random(-10, 10);
    this.y += random(-10, 10);
    for (PVector v : this.history) {
      v.x += random(-2, 2);
      v.y += random(-2, 2);
    }

    PVector v = new PVector(this.x, this.y);
    this.history.add(v); 
    if (this.history.size() > 100) {
      this.history.remove(0);
    }
  }

  void show() {
    stroke(0);
    fill(0, 150);
    ellipse(this.x, this.y, 24, 24);

    noFill();
    beginShape();
    for (PVector pos : history) {
      //fill(random(255));
      //ellipse(pos.x, pos.y, i, i);
      vertex(pos.x, pos.y);
    }
    endShape();
  }
}