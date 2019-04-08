class Particle {
  NoiseLoop xNoise;
  NoiseLoop yNoise;
  NoiseLoop dNoise;
  NoiseLoop rNoise;
  NoiseLoop bNoise;
  

  Particle() {
    xNoise = new NoiseLoop(0.5, -width, width*2);
    yNoise = new NoiseLoop(0.5, -height, height*2);
    dNoise = new NoiseLoop(7, 10, 120);
    rNoise = new NoiseLoop(7, 100, 255);
    bNoise = new NoiseLoop(7, 100, 255);
  }

  void render(float a) {
    noStroke();
    float x = xNoise.value(a);
    float y = yNoise.value(a);
    float d = dNoise.value(a);
    float r = rNoise.value(a);
    float b = bNoise.value(a);
    fill(r, 50, b, 200);
    circle(x, y, d);
  }
}
