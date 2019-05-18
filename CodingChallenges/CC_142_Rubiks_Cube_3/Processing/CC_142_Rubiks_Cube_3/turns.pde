// Rubiks Cube 3
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/142.3-rubiks-cube.html
// https://youtu.be/8U2gsbNe1Uo


float roundToHalf(float d) {
  return round(d * 2) / 2.0;
}

void turn(float index, int dir, char axis) {
  for (int i = 0; i < cube.length; i++) {
    Cubie qb = cube[i];
    if (axis == 'z') {
      if (qb.z == index) {
        PMatrix2D matrix = new PMatrix2D();
        matrix.rotate(dir*HALF_PI);
        matrix.translate(qb.x, qb.y);
        qb.update(roundToHalf(matrix.m02), roundToHalf(matrix.m12), qb.z);
        qb.turnFaces(dir, 'z');
      }
    } else if (axis == 'y') {
      if (qb.y == index) {
        PMatrix2D matrix = new PMatrix2D();
        matrix.rotate(dir*HALF_PI);
        matrix.translate(qb.x, qb.z);
        qb.update(roundToHalf(matrix.m02), qb.y, roundToHalf(matrix.m12));
        qb.turnFaces(dir, 'y');
      }
    } else if (axis == 'x') {
      if (qb.x == index) {
        PMatrix2D matrix = new PMatrix2D();
        matrix.rotate(dir*HALF_PI);
        matrix.translate(qb.y, qb.z);
        qb.update(qb.x, roundToHalf(matrix.m02), roundToHalf(matrix.m12));
        qb.turnFaces(dir, 'x');
      }
    }
  }
}
