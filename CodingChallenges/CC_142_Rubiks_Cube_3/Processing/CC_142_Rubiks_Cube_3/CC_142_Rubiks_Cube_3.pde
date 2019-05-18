// Rubiks Cube 3
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/142.3-rubiks-cube.html
// https://youtu.be/8U2gsbNe1Uo

import peasy.*;

PeasyCam cam;

float speed = 1;
int dim = 3;
int scrambleLength = dim * 8;
float axis = dim % 2 == 0 ? floor(dim / 2) - 0.5 : floor(dim / 2);
boolean sequenceStarted;
Cubie[] cube = new Cubie[dim*dim*dim];
ArrayList<Move> sequence = new ArrayList<Move>();
ArrayList<Move> allMovesSeq = new ArrayList<Move>();
int counter = 0;
boolean started = false;
Move currentMove;
PImage logo;

void setup() {
  size(600, 600, P3D);
  logo = loadImage("train.png");
  //fullScreen(P3D);
  sequenceStarted = false;
  cam = new PeasyCam(this, 100 * (dim + 1));

  int index = 0;
  for (float x = -axis; x <= axis; x++) {
    for (float y = -axis; y <= axis; y++) {
      for (float z = -axis; z <= axis; z++) {
        PMatrix3D matrix = new PMatrix3D();
        matrix.translate(x, y, z);
        cube[index] = new Cubie(matrix, x, y, z);
        index++;
      }
    }
  }

  for (float i = -axis; i <= axis; i++)
  {
    if (i != 0) {
      allMovesSeq.add(new Move(i, 0, 0, 2));
      allMovesSeq.add(new Move(i, 0, 0, 1));
      allMovesSeq.add(new Move(i, 0, 0, -1));
      allMovesSeq.add(new Move(0, i, 0, 2));
      allMovesSeq.add(new Move(0, i, 0, 1));
      allMovesSeq.add(new Move(0, i, 0, -1));
      allMovesSeq.add(new Move(0, 0, i, 2));
      allMovesSeq.add(new Move(0, 0, i, 1));
      allMovesSeq.add(new Move(0, 0, i, -1));
    }
  }

  for (int i = 0; i <= scrambleLength; i++) {
    Move move = allMovesSeq.get((int)random(allMovesSeq.size()));
    sequence.add(move);
  }

  currentMove = new Move(0, 0, 0, 0);

  for (int i = sequence.size()-1; i >= 0; i--) {
    Move nextMove = sequence.get(i).copy();
    nextMove.reverse();
    sequence.add(nextMove);
  }

  removeInternalColors();
  //cube[10].faces[2] = new Face(new PVector(0, 1, 0), color(255, 255, 255), logo); //only for 3x3
}

void draw() {
  background(51); 

  cam.beginHUD();
  fill(255);
  textSize(32);
  text(counter, 100, 100);
  cam.endHUD();

  rotateX(-0.5);
  rotateY(0.4);
  rotateZ(0.1);



  currentMove.update();
  if (sequenceStarted) {
    if (currentMove.finished()) {
      if (counter < sequence.size()-1) {
        counter++;
        currentMove = sequence.get(counter);
        currentMove.start();
      }
    }
  }
  scale(50);
  rotateCube(currentMove);
  //image(logo, 0, 0, 1, 1);
}

void rotateCube(Move move) {
  for (int i = 0; i < cube.length; i++) {
    push();
    if (abs(cube[i].z) > 0 && cube[i].z == move.z) {
      rotateZ(move.angle);
    } else if (abs(cube[i].x) > 0 && cube[i].x == move.x) {
      rotateX(move.angle);
    } else if (abs(cube[i].y) > 0 && cube[i].y == move.y) {
      rotateY(-move.angle);
    }   
    cube[i].show();
    pop();
  }
}
