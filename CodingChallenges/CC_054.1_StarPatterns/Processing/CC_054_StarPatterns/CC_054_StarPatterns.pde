// Daniel Shiffman
// http://codingtra.in
// Islamic Star Patterns
// Video Part 1: https://youtu.be/sJ6pMLp_IaI
// Video Part 2: [coming soon]
// Based on: http://www.cgl.uwaterloo.ca/csk/projects/starpatterns/
// Processing transcription: Chuck England

// Repo with more tiling patterns and features
// https://github.com/CodingTrain/StarPatterns

List<Polygon> polys = new ArrayList<Polygon>();

float angle = 75;
float delta = 10;

Slider deltaSlider;
Slider angleSlider;

void setup() {
  size(600, 600);
  //angleMode(DEGREES);
  background(51);
  deltaSlider = new Slider(20, height - 40, 10, 25, 10, 1);
  angleSlider = new Slider((width / 2) + 20, height - 40, 75, 90, 75, 1);

  int inc = 100;
  for (int x = 0; x < width; x += inc) {
    for (int y = 0; y < height; y += inc) {
      Polygon poly = new Polygon();
      poly.addVertex(x, y);
      poly.addVertex(x + inc, y);
      poly.addVertex(x + inc, y + inc);
      poly.addVertex(x, y + inc);
      poly.close();
      polys.add(poly);
    }
  }
}

void draw() {
  background(51);
  angle = angleSlider.value();
  delta = deltaSlider.value();
  //println(angle, delta);
  for (int i = 0; i < polys.size(); i++) {
    polys.get(i).hankin();
    polys.get(i).show();
  }
  
  angleSlider.show();
  deltaSlider.show();
}
