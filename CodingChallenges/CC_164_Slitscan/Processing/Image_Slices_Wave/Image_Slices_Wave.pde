
PImage bot;

int w = 5;
int columns;
float angle = 0;

void setup() {
  size(400, 400);
  columns = width / w;
  bot = loadImage("choochoobot.png");
}


void draw() {
  background(255);
  float a = angle;
  for (int x = 0; x < width; x += w) {
    int offset = int(map(sin(a), -1, 1, -columns, columns));
    int sx = (x + offset);
    copy(bot, sx, 0, w, height, x, 0, w, height);
    a += 0.05;
  }
  angle += 0.05;
}
