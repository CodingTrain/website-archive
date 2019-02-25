// Daniel Shiffman
// http://codingtra.in
// Islamic Star Patterns
// Video Part 1: https://youtu.be/sJ6pMLp_IaI
// Video Part 2: [coming soon]
// Based on: http://www.cgl.uwaterloo.ca/csk/projects/starpatterns/
// Processing transcription: Chuck England

// Repo with more tiling patterns and features
// https://github.com/CodingTrain/StarPatterns

class Edge {
    PVector a;
    PVector b;
    Hankin h1 = null;
    Hankin h2 = null;

  Edge(PVector a_, PVector b_) {
    a = a_;
    b = b_;
  }
  
  void show() {
    stroke(255, 50);
    //line(a.x, a.y, b.x, b.y);
    h1.show();
    h2.show();
  }

  void hankin() {
    PVector mid = PVector.add(a, b);
    mid.mult(0.5);

    PVector v1 = PVector.sub(a, mid);
    PVector v2 = PVector.sub(b, mid);
    PVector offset1 = mid;
    PVector offset2 = mid;
    if (delta > 0) {
      v1.setMag(delta);
      v2.setMag(delta);
      offset1 = PVector.add(mid, v2);
      offset2 = PVector.add(mid, v1);
    }
    
    v1.normalize();
    v2.normalize();

    v1.rotate(radians(-angle));
    v2.rotate(radians(angle));

    h1 = new Hankin(offset1, v1);
    h2 = new Hankin(offset2, v2);
  }

  void findEnds(Edge edge) {
    h1.findEnd(edge.h1);
    h1.findEnd(edge.h2);
    h2.findEnd(edge.h1);
    h2.findEnd(edge.h2);
  }
};
