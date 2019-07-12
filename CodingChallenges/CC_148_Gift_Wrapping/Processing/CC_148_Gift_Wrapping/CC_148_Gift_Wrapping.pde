// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/148-gift-wrapping.html
// https://youtu.be/YNyULRrydVI
// https://editor.p5js.org/codingtrain/sketches/IVE9CxBOF

// Gift Wrapping Algorithm

ArrayList<PVector> points = new ArrayList<PVector>();
ArrayList<PVector> hull = new ArrayList<PVector>();

PVector leftMost;
PVector currentVertex;
int index;
int nextIndex = -1;
PVector nextVertex;

PVector leftMost(ArrayList<PVector> _points) {
  PVector winner = _points.get(0);
  for (int i =  1; i < _points.size(); i++) {
    PVector p = _points.get(i);
    if (p.x < winner.x) {
      winner = p;
    }
  }
  return winner;
}

void setup() {
  size(500, 500);
  int buffer = 20;

  for (int i = 0; i < 50; i++) {
    points.add(new PVector(random(buffer, width - buffer), random(buffer, height - buffer)));
  }

  // Advanced way to sort the points array.
  //Collections.sort(points, VEC_CMP);
  //leftMost = points.get(0);

  leftMost = leftMost(points);

  currentVertex = leftMost;
  hull.add(currentVertex);
  nextVertex = points.get(1);
  index = 2;
}

void draw() {
  background(0);

  stroke(255);
  strokeWeight(8);
  for (PVector p : points) {
    point(p.x, p.y);
  }

  stroke(0, 0, 255);
  fill(0, 0, 255, 50);
  beginShape();
  for (PVector p : hull) {
    vertex(p.x, p.y);
  }
  endShape(CLOSE);

  stroke(0, 255, 0);
  strokeWeight(32);
  point(leftMost.x, leftMost.y);

  stroke(200, 0, 255);
  strokeWeight(32);
  point(currentVertex.x, currentVertex.y);

  stroke(0, 255, 0);
  strokeWeight(2);
  line(currentVertex.x, currentVertex.y, nextVertex.x, nextVertex.y);

  PVector checking = points.get(index);
  stroke(255);
  line(currentVertex.x, currentVertex.y, checking.x, checking.y);

  PVector a = PVector.sub(nextVertex, currentVertex);
  PVector b = PVector.sub(checking, currentVertex);
  PVector cross = a.cross(b);

  if (cross.z < 0) {
    nextVertex = checking;
    nextIndex = index;
  }

  index = index + 1;
  if (index == points.size()) {
    if (nextVertex == leftMost) {
      println("done");
      noLoop();
    } else {
      hull.add(nextVertex);
      currentVertex = nextVertex;
      index = 0;
      //points.splice(nextIndex, 1);
      nextVertex = leftMost;
    }
  }
}
