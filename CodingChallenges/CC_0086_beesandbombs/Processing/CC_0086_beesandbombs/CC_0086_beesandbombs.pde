// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Processing transcription: Chuck England

// Video: https://youtu.be/H81Tdrmz2LA

// Original GIF: https://beesandbombs.tumblr.com/post/149654056864/cube-wave

float angle = 0;
float w = 24;
float ma;
float maxD;

void setup() {
  size(400, 400, P3D);
  ma = atan(cos(QUARTER_PI));
  maxD = dist(0, 0, 200, 200);
}

void draw() {
  lights();
  pointLight(50, 250, 50, 10, 30, 50);
  background(100);
  ortho(-400, 400, 400, -400, 0, 1000);
  rotateX(-ma);
  rotateY(-QUARTER_PI);
  translate(width/2 + 75, height/2 - 75);

  for (int z = 0; z < height; z += w) {
    for (int x = 0; x < width; x += w) {
      pushMatrix();
      float d = dist(x, z, width / 2, height / 2);
      float offset = map(d, 0, maxD, -PI, PI);
      float a = angle + offset;
      float h = floor(map(sin(a), -1, 1, 100, 300));
      translate(x - width / 2, 0, z - height / 2);
      fill(255, 128, 0);
      box(w, h, w);
      //rect(x - width / 2 + w / 2, 0, w - 2, h);
      popMatrix();
    }
  }

  angle -= 0.1;
}
