// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Video: https://youtu.be/l__fEY1xanY
// Processing transcription: Chuck England

int x;
int y;

void setup() {
  size(400, 400);
  x = 200;
  y = 200;
  background(51);
}

void draw() {
  stroke(255, 100);
  strokeWeight(2);
  point(x, y);

  int r = int(random(4));

  switch (r) {
  case 0:
    x = x + 1;
    break;
  case 1:
    x = x - 1;
    break;
  case 2:
    y = y + 1;
    break;
  case 3:
    y = y - 1;
    break;
  }
}
