import processing.video.*;

// Movie  cam;
Capture cam;
// PImage bot;

int scl = 8;
int w, h;
PImage[] history;
int historyIndex = 0;
int offset = 0;

void setup() {
  size(640, 480);
  String[] cameras = Capture.list();
  cam = new Capture(this, 640, 480,cameras[1]);
  cam.start();
  w = width/scl;
  h = height/scl;
  history = new PImage[scl*scl];
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
  
  int count = 0;
  for (int i = 0; i < scl; i++) {
    for (int j = 0; j < scl; j++) {
      int currentIndex = (count + offset) % history.length;
      image(history[currentIndex], i*w, j*h, w, h);   
      count++;
    }
  }
  offset++;
  history[historyIndex].copy(cam, 0, 0, width, height, 0, 0, width, height);
  historyIndex = (historyIndex + 1) % history.length;
}
