void setup() {
  size(640, 360);
}

void draw() {
  background(0);

  if (mouseX > 500) {
    background(255,0,0);
  } else if (mouseX > 400) {
    background(255,255,0);
  } else if (mouseX > 300) {
    background(255,0,255);
  } else if (mouseX > 200) {
    background(0,0,255);
  } else {
    background(0,255,0);
  }
  
  stroke(255);
  line(100, 0, 100, height);
  line(200, 0, 200, height);
  line(300, 0, 300, height);
  line(400, 0, 400, height);
  line(500, 0, 500, height);
}

