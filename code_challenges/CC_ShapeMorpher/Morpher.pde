class Morpher {
  ArrayList<PVector> circle;
  ArrayList<PVector> square;

  ArrayList<PVector> current;

  Morpher() {
    circle = new ArrayList<PVector>();
    int total = 100;
    float da = TWO_PI/total;
    float r = 200;

    float newangle = -3*PI/4;
    for (float a = 0; a < TWO_PI; a += da) {
      PVector point = new PVector(cos(newangle), sin(newangle));
      point.mult(r);
      circle.add(point);
      newangle += da;
    }

    square = new ArrayList<PVector>();

    int side = total / 4;

    float x = -r;
    for (int i = 0; i < side; i++) {
      PVector v = new PVector(x, -r);
      x += r*2 / side;
      square.add(v);
    }

    float y = -r;
    for (int i = 0; i < side; i++) {
      PVector v = new PVector(r, y);
      y += r*2 / side;
      square.add(v);
    }

    x = r;
    for (int i = 0; i < side; i++) {
      PVector v = new PVector(x, r);
      x -= r*2 / side;
      square.add(v);
    }

    y = r;
    for (int i = 0; i < side; i++) {
      PVector v = new PVector(-r, y);
      y -= r*2 / side;
      square.add(v);
    }




    current = new ArrayList<PVector>();
    for (PVector v : square) {
      current.add(v.copy());
    }

    println(circle.size());
    println(square.size());
  }

  void update() {
    for (int i = 0; i < current.size(); i++) {
      PVector cv = circle.get(i); 
      PVector sv = square.get(i); 
      PVector v = PVector.lerp(cv, sv, amt);
      current.set(i, v);
    }
  }

  void show() {
    stroke(255);
    fill(255, 100);
    strokeWeight(4);
    beginShape();
    for (PVector v : current) {
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
  }
}