// Daniel Shiffman
// Code for: https://youtu.be/XATr_jdh-44

ArrayList<Circle> circles = new ArrayList<Circle>();

void setup() {
  size(640, 360);
  background(255);

  // Lets make sure we don't get stuck in infinite loop
  int protection = 0;

  // Try to get to 500
  while (circles.size() < 500) {
    // Pick a random circle
    Circle circle = new Circle(random(width), random(height), random(6, 36));

    // Does it overlap any previous circles?
    boolean overlapping = false;
    for (int j = 0; j < circles.size(); j++) {
      Circle other = circles.get(j);
      float d = dist(circle.x, circle.y, other.x, other.y);
      if (d < circle.r + other.r) {
        overlapping = true;
      }
    }

    // If not keep it!
    if (!overlapping) {
      circles.add(circle);
    }

    // Are we stuck?
    protection++;
    if (protection > 10000) {
      break;
    }
  }

  // Draw all the circles
  for (Circle c : circles) {
    fill(255, 0, 175, 100);
    noStroke();
    ellipse(c.x, c.y, c.r*2, c.r*2);
  }
}