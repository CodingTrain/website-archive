

float[] scores = new float[3];
int[] totals = new int[scores.length];

void setup() {
  size(400, 400);
  scores[0] = 0.95;
  scores[1] = 0.04;
  scores[2] = 0.01;
}


void draw() {
  background(0);
  int s = select();

  totals[s]++;

  textSize(24);
  for (int i = 0; i < totals.length; i++) {
    text(nf(float(totals[i])/frameCount, 0, 2), 10, 32+i*32);
  }
}

int select() {
  int select = 0;
  float selector = random(1);
  while (selector > 0) {
    selector-=scores[select];
    select+=1;
  }
  select-=1;
  return select;
}