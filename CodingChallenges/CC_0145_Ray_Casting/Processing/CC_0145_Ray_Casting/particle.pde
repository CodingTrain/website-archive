// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/145-2d-ray-casting.html
// https://youtu.be/TOEi6T2mtHo

// 2D Ray Casting
// https://editor.p5js.org/codingtrain/sketches/Nqsq3DFv-

class Particle {
  PVector pos;
  Ray[] rays;
  Particle() {
    this.pos = new PVector(width / 2, height / 2);
    this.rays = new Ray[360];
    for (int a = 0; a < this.rays.length; a += 1) {
      this.rays[a] = new Ray(this.pos, radians(a));
    }
  }

  void update(float x, float y) {
    this.pos.set(x, y);
  }

  void look(Boundary[] walls) {
    for (int i = 0; i < this.rays.length; i++) {
      Ray ray = this.rays[i];
      PVector closest = null;
      float record = 500000000;
      for (Boundary wall : walls) {
        PVector pt = ray.cast(wall);
        if (pt != null) {
          float d = PVector.dist(this.pos, pt);
          if (d < record) {
            record = d;
            closest = pt;
          }
        }
      }
      if (closest != null) {
        // colorMode(HSB);
        // stroke((i + frameCount * 2) % 360, 255, 255, 50);
        stroke(255, 100);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
    }
  }

  void show() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, 4, 4);
    for (Ray ray : this.rays) {
      ray.show();
    }
  }
}
