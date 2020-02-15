// Julia Set
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/022-juliaset.html
// https://youtu.be/fAsaSkmbF5s
// https://editor.p5js.org/codingtrain/sketches/G6qbMmaI

float angle = 0;

void setup() {
  size(640, 360);
  colorMode(HSB, 1);
}
void draw() {

  // float ca = map(mouseX, 0, width, -1, 1);//-0.70176;
  // float cb = map(mouseY, 0, height, -1, 1);//-0.3842;

  float ca = cos(angle*3.213);//sin(angle);
  float cb = sin(angle);

  angle += 0.02;

  background(255);

  // Establish a range of values on the complex plane
  // A different range will allow us to "zoom" in or out on the fractal

  // It all starts with the width, try higher or lower values
  //float w = abs(sin(angle))*5;
  float w = 5;
  float h = (w * height) / width;

  // Start at negative half the width and height
  float xmin = -w/2;
  float ymin = -h/2;

  // Make sure we can write to the pixels[] array.
  // Only need to do this once since we don't do any other drawing.
  loadPixels();

  // Maximum number of iterations for each point on the complex plane
  int maxiterations = 100;

  // x goes from xmin to xmax
  float xmax = xmin + w;
  // y goes from ymin to ymax
  float ymax = ymin + h;

  // Calculate amount we increment x,y for each pixel
  float dx = (xmax - xmin) / (width);
  float dy = (ymax - ymin) / (height);

  // Start y
  float y = ymin;
  for (int j = 0; j < height; j++) {
    // Start x
    float x = xmin;
    for (int i = 0; i < width; i++) {

      // Now we test, as we iterate z = z^2 + cm does z tend towards infinity?
      float a = x;
      float b = y;
      int n = 0;
      while (n < maxiterations) {
        float aa = a * a;
        float bb = b * b;
        // Infinity in our finite world is simple, let's just consider it 16
        if (aa + bb > 4.0) {
          break;  // Bail
        }
        float twoab = 2.0 * a * b;
        a = aa - bb + ca;
        b = twoab + cb;
        n++;
      }

      // We color each pixel based on how long it takes to get to infinity
      // If we never got there, let's pick the color black
      if (n == maxiterations) {
        pixels[i+j*width] = color(0);
      } else {
        // Gosh, we could make fancy colors here if we wanted
        float hu = sqrt(float(n) / maxiterations);
        pixels[i+j*width] = color(hu, 255, 150);
      }
      x += dx;
    }
    y += dy;
  }
  updatePixels();
  println(frameRate);
}
