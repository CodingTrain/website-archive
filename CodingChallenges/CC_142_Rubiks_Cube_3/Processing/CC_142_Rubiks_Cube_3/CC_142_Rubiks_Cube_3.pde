// Rubiks Cube 3
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/142.3-rubiks-cube.html
// https://youtu.be/8U2gsbNe1Uo

import peasy.*;

PeasyCam cam;

float speed = 0.05;
int dim = 3;
String seq;
String prev;
Cubie[] cube = new Cubie[dim*dim*dim];

Move makeAMove(String m) {
  Move move = null;
  switch (m) {
    case "R2":
      return move = new Move(1, 0, 0, 2);
    case "L2":
      return move = new Move(-1, 0, 0, 2);
    case "D2":
      return move = new Move(0, 1, 0, 2);
    case "U2":
      return move = new Move(0, -1, 0, 2);
    case "F2":
      return move = new Move(0, 0, 1, 2);
    case "B2":
      return move = new Move(0, 0, -1, 2);
    case "R":
      return move = new Move(1, 0, 0, 1);
    case "R\'":
      return move = new Move(1, 0, 0, -1);
    case "L\'":
      return move = new Move(-1, 0, 0, 1);
    case "L":
      return move = new Move(-1, 0, 0, -1);
    case "F":
      return move = new Move(0, 0, 1, 1);
    case "F\'":
      return move = new Move(0, 0, 1, -1);
    case "B\'":
      return move = new Move(0, 0, -1, 1);
    case "B":
      return move = new Move(0, 0, -1, -1);
    case "D\'":
      return move = new Move(0, 1, 0, 1);
    case "D":
      return move = new Move(0, 1, 0, -1);
    case "U":
      return move = new Move(0, -1, 0, 1);
    case "U\'":
      return move = new Move(0, -1, 0, -1);
  }
  return move;
}

//Move[] allMoves = new Move[] {
//  new Move(0, 1, 0, 1), 
//  new Move(0, 1, 0, -1), 
//  new Move(0, -1, 0, 1), 
//  new Move(0, -1, 0, -1), 
//  new Move(1, 0, 0, 1), 
//  new Move(1, 0, 0, -1), 
//  new Move(-1, 0, 0, 1), 
//  new Move(-1, 0, 0, -1), 
//  new Move(0, 0, 1, 1), 
//  new Move(0, 0, 1, -1), 
//  new Move(0, 0, -1, 1), 
//  new Move(0, 0, -1, -1) 
//};

String backwards(String prev) {
  return prev.split("")[0] + "\'";
}
String twice(String prev) {
  return prev.split("")[0] + "2";
}
String single(String prev) {
  return prev.split("")[0] + "";
}

String[] allMoves = new String[] {
  "R", "R\'", "R2",
  "L", "L\'", "L2",
  "U", "U\'", "U2",
  "D", "D\'", "D2",
  "F", "F\'", "F2",
  "B", "B\'", "B2"
};

ArrayList<Move> sequence = new ArrayList<Move>();
int counter = 0;

boolean started = false;

Move currentMove;

void setup() {
  size(600, 600, P3D);
  //fullScreen(P3D);
  cam = new PeasyCam(this, 400);
  int index = 0;
  prev = "";
  seq = "";
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

  for (int i = 0; i < 20; i++) {
    int r = int(random(allMoves.length));
    String move = allMoves[r];
    while (move.contentEquals(single(prev)) || move.contentEquals(backwards(prev)) || move.contentEquals(twice(prev))) {
      r = int(random(allMoves.length));
      move = allMoves[r];
    }
    seq += move + " ";
    prev = move;
    //int r = int(random(allMoves.length));
    Move m = makeAMove(move);
    //println(m.x + " " + m.y + " " + m.z + " " + m.dir);
    sequence.add(m);
  }
  println(seq);

  currentMove = sequence.get(counter);

  for (int i = sequence.size()-1; i >= 0; i--) {
    Move nextMove = sequence.get(i).copy();
    nextMove.reverse();
    sequence.add(nextMove);
  }

  //currentMove.start();
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
  if (currentMove.finished()) {
    if (counter < sequence.size()-1) {
      counter++;
      currentMove = sequence.get(counter);
      currentMove.start();
    }
  }


  scale(50);
  for (int i = 0; i < cube.length; i++) {
    push();
    if (abs(cube[i].z) > 0 && cube[i].z == currentMove.z) {
      rotateZ(currentMove.angle);
    } else if (abs(cube[i].x) > 0 && cube[i].x == currentMove.x) {
      rotateX(currentMove.angle);
    } else if (abs(cube[i].y) > 0 && cube[i].y ==currentMove.y) {
      rotateY(-currentMove.angle);
    }   
    cube[i].show();
    pop();
  }
}
