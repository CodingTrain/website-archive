// Coding Challenge 127: Brownian Motion Snowflake
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/127-brownian-snowflake.html
// https://youtu.be/XUA8UREROYE
// (insert p5 web editor link here)

Particle current;
ArrayList<Particle> snowflake;

void setup() {
  // size(600, 600);
  fullScreen();
  current = new Particle(width/2, 0);
  snowflake = new ArrayList<Particle>();
}

void draw() {
  translate(width/2, height/2);
  rotate(PI/6);
  background(0);

  while (!current.finished() && !current.intersects(snowflake)) {
    current.update();
  }
  snowflake.add(current);
  current = new Particle(width/2, 0);

  for (int i = 0; i < 6; i++) {
    rotate(PI/3);
    current.show();
    for (Particle p : snowflake) {
      p.show();
    }

    pushMatrix();
    scale(1, -1);
    current.show();
    for (Particle p : snowflake) {
      p.show();
    }
    popMatrix();
  }
}
