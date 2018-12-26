// Toothpicks
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/126-toothpicks.html
// https://youtu.be/-OL_sw2MiYw
// https://editor.p5js.org/codingtrain/sketches/SJMl3u5xN

ArrayList<Toothpick> picks;

int len = 63;

int minX;
int maxX;


void setup() {
  size(600, 600);
  // fullScreen();
  minX = -width/2;
  maxX = width/2;
  picks = new ArrayList<Toothpick>();
  picks.add(new Toothpick(0, 0, 1));
  // frameRate(1);
  // noLoop();
}

void draw() {
  // println(picks.size());
  
  background(255); 
  translate(width/2, height/2);
  float factor = float(width) / (maxX - minX);
  scale(factor);
  for (Toothpick t : picks) {
    t.show(factor);
    minX = min(t.ax,minX);
    maxX = max(t.ax,maxX);
  }

  ArrayList<Toothpick> next = new ArrayList<Toothpick>();
  for (Toothpick t : picks) {
    if (t.newPick) {
      Toothpick nextA = t.createA(picks);
      Toothpick nextB = t.createB(picks);
      if (nextA != null) {
        next.add(nextA);
      }
      if (nextB != null) {
        next.add(nextB);
      }
      t.newPick = false;
    }
  }

  picks.addAll(next);
}
