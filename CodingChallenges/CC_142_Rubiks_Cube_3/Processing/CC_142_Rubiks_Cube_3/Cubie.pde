// Rubiks Cube 3
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/142.3-rubiks-cube.html
// https://youtu.be/8U2gsbNe1Uo

class Cubie {
  PMatrix3D matrix;
  float x = 0;
  float y = 0;
  float z = 0;
  Face[] faces = new Face[6];

  Cubie(PMatrix3D m, float x, float y, float z) {
    this.matrix = m;
    this.x = x;
    this.y = y;
    this.z = z;

    faces[0] = new Face(new PVector(0, 0, -1), color(0, 0, 255)); //blue
    faces[1] = new Face(new PVector(0, 0, 1), color(0, 128, 0)); //green
    faces[2] = new Face(new PVector(0, 1, 0), color(255, 255, 255)); //white
    faces[3] = new Face(new PVector(0, -1, 0), color(255, 255, 0)); //yellow
    faces[4] = new Face(new PVector(1, 0, 0), color(255, 165, 0)); //orange
    faces[5] = new Face(new PVector(-1, 0, 0), color(255, 0, 0)); //red
  }

  void turnFaces(int dir, char axis) {
    float angle = dir * HALF_PI;
    if (axis == 'z') {
      for (Face f : faces) {
        f.turn(angle, 'z');
      }
    } else if (axis == 'y') {
      for (Face f : faces) {
        f.turn(angle, 'y');
      }
    } else if (axis == 'x') {
      for (Face f : faces) {
        f.turn(angle, 'x');
      }
    }
  }



  void update(float x, float y, float z) {
    matrix.reset(); 
    matrix.translate(x, y, z);
    this.x = x;
    this.y = y;
    this.z = z;
  }

  void show() {
    noFill();
    stroke(0);
    strokeWeight(0.1);
    pushMatrix(); 
    applyMatrix(matrix);
    box(1);
    for (Face f : faces) {
      f.show();
    }
    popMatrix();
  }
}
