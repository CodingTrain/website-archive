// Images Slices
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/164-time-slitscan.html

PImage bot;

int w = 10;
int columns;

float angle = 0;

void setup() {
  size(400, 400);
  columns = width / w;
  bot = loadImage("choochoobot.png");
}


void draw() {
  background(0);
  for (int x = 0; x < width; x += w) {
    float factor = map(x, 0, width, 0.1, 10);
    int offset = int(map(sin(angle*factor), -1, 1, 0, columns));
    int sx = (x + offset*w) % width;
    copy(bot, sx, 0, w, height, x, 0, w, height);
  }
  angle += 0.01;
}
