// Rubiks Cube 1
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/142.1-rubiks-cube.html
// https://youtu.be/9PGfL4t-uqE

class Cubie {
  PVector pos;
  float len;

  Cubie(float x, float y, float z, float len_) {
    pos = new PVector(x, y, z);
    len = len_;
  }

  void show() {
    fill(255);
    stroke(0);
    strokeWeight(8);
    pushMatrix(); 
    translate(pos.x, pos.y, pos.z);
    beginShape(QUADS);
    float r = len / 2;

    // z-fixed
    fill(Color.BACK.getValue());
    vertex(-r, -r, -r);
    vertex(r, -r, -r);
    vertex(r, r, -r);
    vertex(-r, r, -r);

    fill(Color.FRONT.getValue());
    vertex(-r, -r, r);
    vertex(r, -r, r);
    vertex(r, r, r);
    vertex(-r, r, r);

    // y-fixed
    fill(Color.DOWN.getValue());
    vertex(-r, -r, -r);
    vertex(r, -r, -r);
    vertex(r, -r, r);
    vertex(-r, -r, r);

    fill(Color.UP.getValue());
    vertex(-r, r, -r);
    vertex(r, r, -r);
    vertex(r, r, r);
    vertex(-r, r, r);


    // x-fixed
    fill(Color.LEFT.getValue());
    vertex(-r, -r, -r);
    vertex(-r, r, -r);
    vertex(-r, r, r);
    vertex(-r, -r, r);

    fill(Color.RIGHT.getValue());
    vertex(r, -r, -r);
    vertex(r, r, -r);
    vertex(r, r, r);
    vertex(r, -r, r);



    endShape();


    //box(len);
    popMatrix();
  }
}
