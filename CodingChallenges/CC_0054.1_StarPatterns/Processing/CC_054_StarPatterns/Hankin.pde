// Daniel Shiffman
// http://codingtra.in
// Islamic Star Patterns
// Video Part 1: https://youtu.be/sJ6pMLp_IaI
// Video Part 2: [coming soon]
// Based on: http://www.cgl.uwaterloo.ca/csk/projects/starpatterns/
// Processing transcription: Chuck England

// Repo with more tiling patterns and features
// https://github.com/CodingTrain/StarPatterns

class Hankin {
    PVector a;
    PVector v;
    PVector b;
    PVector end = null;
    float prevD;

  Hankin(PVector a_, PVector v_) {
      a = a_;
      v = v_;
      b = PVector.add(a, v);
    }

  void show() {
    stroke(255, 0, 255);
    line(a.x, a.y, end.x, end.y);
    // fill(255);
    // ellipse(this.a.x, this.a.y, 8);
    // if (this.end) {
    //   fill(255, 255, 0);
    //   ellipse(this.end.x, this.end.y, 8);
    // }
  }

  void findEnd(Hankin other) {
    // line line intersection???
    // this.a, this.v  (P1, P2-P1)
    // other.a, other.v (P3, P4-P3)

    // From: http://paulbourke.net/geometry/pointlineplane/
    float den = (other.v.y * v.x) - (other.v.x * v.y);
    //if (!den) {
    //  return;
    //}
    if (den == 0.0) {
      return;
    }
    float numa = (other.v.x * (this.a.y - other.a.y)) - (other.v.y * (this.a.x - other.a.x));
    float numb = (this.v.x * (this.a.y - other.a.y)) - (this.v.y * (this.a.x - other.a.x));
    float ua = numa / den;
    float ub = numb / den;
    float x = this.a.x + (ua * this.v.x);
    float y = this.a.y + (ua * this.v.y);

    if (ua > 0 && ub > 0) {
      PVector candidate = new PVector(x, y);
      float d1 = PVector.dist(candidate, this.a);
      float d2 = PVector.dist(candidate, other.a);
      float d = d1 + d2;
      float diff = abs(d1 - d2);
      if (diff < 0.001) {
        if (end == null) {
          end = candidate;
          prevD = d;
        } else if (d < this.prevD) {
          prevD = d;
          end = candidate;
        }
      }
    }
  }
};
