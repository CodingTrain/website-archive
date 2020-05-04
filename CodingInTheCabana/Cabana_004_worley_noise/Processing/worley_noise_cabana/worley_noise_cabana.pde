// Worley Noise
// Coding in the Cabana
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingInTheCabana/004-worley-noise.html
// https://youtu.be/4066MndcyCk
// p5 port: https://editor.p5js.org/codingtrain/sketches/QsiCWVczZ

PVector[] points = new PVector[100];

void setup() {
  size(400, 400);
  for (int i = 0; i < points.length; i++) {
    points[i] = new PVector(random(width), random(height), random(width));
  }
}

void draw() {
  loadPixels();
  for (int x = 0; x < width; x++) {
    for (int y = 0; y < height; y++) {

      float[] distances = new float[points.length];
      for (int i = 0; i < points.length; i++) {
        PVector v = points[i];
        float z = frameCount % width;
        float d = dist(x, y, z, v.x, v.y, v.z);
        distances[i] = d;
      }
      float[] sorted = sort(distances);
      float r = map(sorted[0], 0, 150, 0, 255);
      float g = map(sorted[1], 0, 50, 255, 0);
      float b = map(sorted[2], 0, 200, 255, 0);
      int index = x + y * width;
      pixels[index] = color(r, g, b);
    }
  }
  updatePixels();

  //noLoop();
  //for (PVector v : points) {
  //  stroke(0, 255, 0);
  //  strokeWeight(8);
  //  point(v.x, v.y);
  //  //v.x += random(-1, 1);
  //  //v.y += random(-1, 1);
  //}
}
