// Rubiks Cube 2
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/142.2-rubiks-cube.html
// https://youtu.be/EGmVulED_4M


import peasy.*;

PeasyCam cam;

int dim = 3;
Cubie[] cube = new Cubie[dim*dim*dim];

String[] allMoves = {"F", "B", "U", "D", "L", "R"};
String sequence = "";
String reversed = "";
int counter = 0;
boolean shuffled = false;

boolean started = false;

void setup() {
  size(600, 600, P3D);
  cam = new PeasyCam(this, 400);
  int index = 0;
  for (int x = -1; x <= 1; x++) {
    for (int y = -1; y <= 1; y++) {
      for (int z = -1; z <= 1; z++) {
        PMatrix3D matrix = new PMatrix3D();
        matrix.translate(x, y, z);
        cube[index] = new Cubie(matrix, x, y, z);
        index++;
      }
    }
  }

  for (int i = 0; i < 200; i++) {
    int r = int(random(allMoves.length));
    if (random(1) < 0.5) {
      sequence += allMoves[r] + " ";
    } else {
      sequence += allMoves[r] + "\' ";
    }
  }

  for (int i = sequence.split(" ").length-1; i >= 0; i--) {
    String nextMove = flipCase(sequence.split(" ")[i]);
    reversed += nextMove + " ";
  }
}

String flipCase(String c) {
  if (c.contains("\'")) {
    return c.charAt(0) + "";
  } else {
    return c + "\'";
  }
}


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




void draw() {
  background(51); 

  if (started) {
    if (frameCount % 1 == 0) {
      if (counter < sequence.split(" ").length) {
        String move = sequence.split(" ")[counter];
        moves(move);
        counter++;
      } else {
        shuffled = true;
      }
      if (shuffled && (counter - sequence.split(" ").length) < reversed.split(" ").length) {
        String move = reversed.split(" ")[counter - sequence.split(" ").length];
        moves(move);
        counter++;
      }
    }
  }

  scale(50);
  for (int i = 0; i < cube.length; i++) {
    cube[i].show();
  }
}
