// Rubiks Cube 2
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/142.2-rubiks-cube.html
// https://youtu.be/EGmVulED_4M

class Face {
  PVector normal;
  color c;

  Face(PVector normal, color c) {
    this.normal = normal;
    this.c = c;
  }
  
  void turn(float angle, char axis) {
    PVector v2 = new PVector();
    if (axis == 'z') {
      v2.x = round(normal.x * cos(angle) - normal.y * sin(angle));
      v2.y = round(normal.x * sin(angle) + normal.y * cos(angle));
      v2.z = round(normal.z);
    } else if (axis == 'x') {
      v2.y = round(normal.y * cos(angle) - normal.z * sin(angle));
      v2.z = round(normal.y * sin(angle) + normal.z * cos(angle));
      v2.x = round(normal.x);
    } else if (axis == 'y') {
      v2.x = round(normal.x * cos(angle) - normal.z * sin(angle));
      v2.z = round(normal.x * sin(angle) + normal.z * cos(angle));
      v2.y = round(normal.y);
    }
    normal = v2;
  }

  void show() {
    pushMatrix();
    fill(c);
    noStroke();
    rectMode(CENTER);
    translate(0.5*normal.x, 0.5*normal.y, 0.5*normal.z);
    rotate(HALF_PI, normal.y, normal.x, normal.z);
    square(0, 0, 1);
    popMatrix();
  }
}
