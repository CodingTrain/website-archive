import processing.video.*;

Capture  cam;

int h = 4;
int y = 0;
PImage[] history;
int historyIndex = 0;
int offset = 0;

void setup() {
  size(640, 480);
  String[] cameras = Capture.list();
  cam = new Capture(this, cameras[1]);
  cam.start();
  history = new PImage[height/h];
  for (int i = 0; i < history.length; i++) {
    history[i] = createImage(width, height, RGB);
  }
  background(0);
}

void captureEvent(Capture cam) {
  cam.read();
}
float angle = 0;

void draw() {
  translate(width/2, height/2);
  for (int i = 0; i < history.length; i++) {
    int y = i * h;
    int currentIndex = (i + offset) % history.length;
    PImage slice = createImage(width/2, h, RGB);
    slice.copy(history[currentIndex], 0, y, width, h, 0, 0, width/2, h);
    //imageMode(CENTER);
    float angle1 = map(i, 0, history.length, 0, TWO_PI);
    float angle2 = map(i+1, 0, history.length, 0, TWO_PI);
    float repeat = 1;
    for (float n = 0; n < repeat; n++) {
      pushMatrix();
      float angle = lerp(angle1, angle2, (n/repeat));
      rotate(angle + frameCount * 0.01);
      image(slice, 0, 0);
      popMatrix();
    }
  }
  offset++;

  history[historyIndex].copy(cam, 0, 0, width, height, 0, 0, width, height);
  historyIndex = (historyIndex + 1) % history.length;
}
