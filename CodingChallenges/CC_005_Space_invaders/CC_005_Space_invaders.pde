// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/biN3v3ef-Y0

Ship ship;
Flower[] flowers = new Flower[6];
ArrayList<Drop> drops = new ArrayList<Drop>();

void setup() {
  size(600, 400);
  ship = new Ship();
  // drop = new Drop(width/2, height/2);
  for (int i = 0; i < flowers.length; i++) {
    flowers[i] = new Flower(i*80+80, 60);
  }
}

void draw() {
  background(51);
  ship.show();
  ship.move();

  for (Drop d : drops) {
    d.show();
    d.move();
    for (int j = 0; j < flowers.length; j++) {
      if (d.hits(flowers[j])) {
        flowers[j].grow();
        d.evaporate();
      }
    }
  }

  boolean edge = false;

  for (int i = 0; i < flowers.length; i++) {
    flowers[i].show();
    flowers[i].move();
    if (flowers[i].x > width || flowers[i].x < 0) {
      edge = true;
    }
  }

  if (edge) {
    for (int i = 0; i < flowers.length; i++) {
      flowers[i].shiftDown();
    }
  }

  for (int i = drops.size()-1; i >= 0; i--) {
    Drop d = drops.get(i);
    if (d.toDelete) {
      drops.remove(i);
    }
  }
}

void keyReleased() {
  if (key != ' ') {
    ship.setDir(0);
  }
}


void keyPressed() {
  if (key == ' ') {
    Drop drop = new Drop(ship.x, height);
    drops.add(drop);
  }

  if (keyCode == RIGHT) {
    ship.setDir(1);
  } else if (keyCode == LEFT) {
    ship.setDir(-1);
  }
}
