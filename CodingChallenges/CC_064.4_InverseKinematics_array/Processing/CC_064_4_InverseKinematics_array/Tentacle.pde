// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Video: https://youtu.be/10st01Z0jxc

class Tentacle {

  Segment[] segments = new Segment[5];
  PVector base;
  float len = 50;

  Tentacle(float x, float y) {
    base = new PVector(x, y);
    segments[0] = new Segment(300, 200, len, 0);
    for (int i = 1; i < segments.length; i++) {
      segments[i] = new Segment(segments[i-1], len, i);
    }
  }

  void update() {
    int total = segments.length;
    Segment end = segments[total-1];
    end.follow(pos.x, pos.y);
    end.update();

    for (int i = total-2; i>=0; i--) {
      segments[i].follow(segments[i+1]);
      segments[i].update();
    }

    segments[0].setA(base);

    for (int i = 1; i < total; i++) {
      segments[i].setA(segments[i-1].b);
    }
  }

  void show() {
    for (Segment s : segments) {
      s.show();
    }
  }
}
