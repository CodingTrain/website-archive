// Rubiks Cube 3
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/142.3-rubiks-cube.html
// https://youtu.be/8U2gsbNe1Uo


void turn(int index, int dir, char axis) {
  for (int i = 0; i < cube.length; i++) {
    Cubie qb = cube[i];
    if (axis == 'z') {
      if (qb.z == index) {
        PMatrix2D matrix = new PMatrix2D();
        matrix.rotate(dir*HALF_PI);
        matrix.translate(qb.x, qb.y);
        qb.update(round(matrix.m02), round(matrix.m12), round(qb.z));
        qb.turnFaces(dir, 'z');
      }
    } else if (axis == 'y') {
      if (qb.y == index) {
        PMatrix2D matrix = new PMatrix2D();
        matrix.rotate(dir*HALF_PI);
        matrix.translate(qb.x, qb.z);
        qb.update(round(matrix.m02), qb.y, round(matrix.m12));
        qb.turnFaces(dir, 'y');
      }
    } else if (axis == 'x') {
      if (qb.x == index) {
        PMatrix2D matrix = new PMatrix2D();
        matrix.rotate(dir*HALF_PI);
        matrix.translate(qb.y, qb.z);
        qb.update(qb.x, round(matrix.m02), round(matrix.m12));
        qb.turnFaces(dir, 'x');
      }
    }
  }
}
