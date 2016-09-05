// Daniel Shiffman
// Code for: https://youtu.be/XATr_jdh-44

ArrayList<Circle> circles = new ArrayList<Circle>();
Circle current;

void setup() {
  size(1280, 720);
  background(255);
}

void draw() {
  background(0);

  for (Circle c : circles) {
    c.show();
  }
  if (current !=null) {
    current.show();
  }

  for (int n = 0; n < 20; n++) {
    if (current == null) {
      current = new Circle(random(width), random(height), 1);
    }

    for (Circle other : circles) {
      float d = dist(current.x, current.y, other.x, other.y);
      if (d < other.r) {
        current = null;
        break;
      }
    }

    if (current != null) {
      // Does it overlap any previous circles?
      boolean overlapping = false;
      for (Circle other : circles) {
        float d = dist(current.x, current.y, other.x, other.y);
        if (d < current.r + other.r) {
          overlapping = true;
        }
      }

      if (!overlapping) {
        overlapping = current.edges();
      }

      if (!overlapping) {
        current.grow();
      } else {
        circles.add(current);
        current.growing = false;
        current = null;
      }
    }
  }
}