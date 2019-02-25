// Coding Challenge 129: Koch Snowflake
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/129-koch-snowflake.html
// https://youtu.be/X8bXDKqMsXE
// https://editor.p5js.org/codingtrain/sketches/SJHcVCAgN

ArrayList<Segment> segments;

void addAll(Segment[] arr, ArrayList<Segment> list) {
  for (Segment s : arr) {
    list.add(s);
  }
}

void setup() {
  size(600, 800);
  segments = new ArrayList<Segment>();
  PVector a = new PVector(0, 100);
  PVector b = new PVector(600, 100);
  Segment s1 = new Segment(a, b);

  float len = PVector.dist(a, b);
  float h = len * sqrt(3) / 2;
  PVector c = new PVector(300, 100+h);
  
  Segment s2 = new Segment(b, c);
  Segment s3 = new Segment(c, a);
  segments.add(s1);
  segments.add(s2);
  segments.add(s3);

  //println(children);
}

void mousePressed() {
  ArrayList<Segment> nextGeneration = new ArrayList<Segment>();

  for (Segment s : segments) {
    Segment[] children = s.generate();
    addAll(children, nextGeneration);
  }
  segments = nextGeneration;
}


void draw() {
  background(0);
  translate(0, 100);

  stroke(255);
  for (Segment s : segments) {
    s.show();
  }
}
