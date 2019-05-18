// Rubiks Cube 2
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/142.2-rubiks-cube.html
// https://youtu.be/EGmVulED_4M

void keyPressed() {
  if (key == ' ') {
    currentMove = sequence.get(counter);
    currentMove.start();
    counter = 0;
    sequenceStarted = true;
  }
  applyMove(key);
}

Move makeAMove(String m) {
  Move move = null;
  switch (m) {
  case "R2":
    return move = new Move(axis, 0, 0, 2);
  case "L2":
    return move = new Move(-axis, 0, 0, 2);
  case "D2":
    return move = new Move(0, axis, 0, 2);
  case "U2":
    return move = new Move(0, -axis, 0, 2);
  case "F2":
    return move = new Move(0, 0, axis, 2);
  case "B2":
    return move = new Move(0, 0, -axis, 2);
  case "R":
    return move = new Move(axis, 0, 0, 1);
  case "R\'":
    return move = new Move(axis, 0, 0, -1);
  case "L\'":
    return move = new Move(-axis, 0, 0, 1);
  case "L":
    return move = new Move(-axis, 0, 0, -1);
  case "F":
    return move = new Move(0, 0, axis, 1);
  case "F\'":
    return move = new Move(0, 0, axis, -1);
  case "B\'":
    return move = new Move(0, 0, -axis, 1);
  case "B":
    return move = new Move(0, 0, -axis, -1);
  case "D\'":
    return move = new Move(0, axis, 0, 1);
  case "D":
    return move = new Move(0, axis, 0, -1);
  case "U":
    return move = new Move(0, -axis, 0, 1);
  case "U\'":
    return move = new Move(0, -axis, 0, -1);
  }
  return move;
}

void removeInternalColors() {
  int limit = dim*dim;

  for (int i = 0; i < limit; i++) {
    cube[i].faces[4] = new Face(new PVector(1, 0, 0), color(0));
  }
  for (int j = 1; j < dim - 1; j++) {
    for (int i = limit * j; i < limit * (j + 1); i++) {
      cube[i].faces[4] = new Face(new PVector(1, 0, 0), color(0));
      cube[i].faces[5] = new Face(new PVector(-1, 0, 0), color(0));
    }
  }
  for (int i = (limit * dim) - limit; i < limit * dim; i++) {
    cube[i].faces[5] = new Face(new PVector(-1, 0, 0), color(0));
  }
  for (int i = dim; i <= limit * dim; i += dim) {
    cube[i - 1].faces[0] = new Face(new PVector(0, 0, -1), color(0));
  }
  for (int j = 1; j < dim - 1; j++) {
    for (int i = dim - j; i <= limit * dim; i += dim) {
      cube[i - 1].faces[0] = new Face(new PVector(0, 0, -1), color(0));
      cube[i - 1].faces[1] = new Face(new PVector(0, 0, 1), color(0));
    }
  }
  for (int i = 1; i <= limit * dim; i += dim) {
    cube[i - 1].faces[1] = new Face(new PVector(0, 0, 1), color(0));
  }
  for (int i = dim; i <= limit * dim; i += limit) {
    for (int j = dim; j > 0; j--) {
      cube[i - j].faces[2] = new Face(new PVector(0, 1, 0), color(0));
    }
  }
  for (int k = 0; k < dim - 2; k++) {
    for (int i = dim * 2 + dim * k; i <= limit * dim; i += limit) {
      for (int j = dim; j > 0; j--) {
        cube[i - j].faces[2] = new Face(new PVector(0, 1, 0), color(0));
        cube[i - j].faces[3] = new Face(new PVector(0, -1, 0), color(0));
      }
    }
  }
  for (int i = limit; i <= limit * dim; i += limit) {
    for (int j = dim; j > 0; j--) {
      cube[i - j].faces[3] = new Face(new PVector(0, -1, 0), color(0));
    }
  }
}

void applyMove(char move) {
  switch (move) {
  case '1': //                   Move F2 - Front Twice
    currentMove = makeAMove("F2");
    currentMove.start();
    break;
  case '2': //                   Move B2 - Back Twice
    currentMove = makeAMove("B2");
    currentMove.start();
    break;
  case '3': //                   Move R2 - Right Twice
    currentMove = makeAMove("R2");
    currentMove.start();
    break;
  case '4': //                   Move L2 - Left Twice
    currentMove = makeAMove("L2");
    currentMove.start();
    break;
  case '5': //                   Move D2 - Down Twice
    currentMove = makeAMove("D2");
    currentMove.start();
    break;
  case '6': //                   Move U2 - Up Twice
    currentMove = makeAMove("U2");
    currentMove.start();
    break;
  case 'f': //                   Move F - Front CW
    currentMove = makeAMove("F");
    currentMove.start();
    break;
  case 'F': //                   Move F' - Front CCW
    currentMove = makeAMove("F\'");
    currentMove.start();
    break;  
  case 'B': //                   Move B' - Back CCW
    currentMove = makeAMove("B\'");
    currentMove.start();
    break;
  case 'b': //                   Move B - Back CW
    currentMove = makeAMove("B");
    currentMove.start();
    break;
  case 'D': //                   Move D' - Down CCW
    currentMove = makeAMove("D\'");
    currentMove.start();
    break;
  case 'd': //                   Move D - Down CW
    currentMove = makeAMove("D");
    currentMove.start();
    break;
  case 'u': //                   Move U - Up CW
    currentMove = makeAMove("U");
    currentMove.start();
    break;
  case 'U': //                   Move U' - Up CCW
    currentMove = makeAMove("U\'");
    currentMove.start();
    break;
  case 'L': //                   Move L' - Left CCW
    currentMove = makeAMove("L\'");
    currentMove.start();
    break;
  case 'l': //                   Move L - Left CW
    currentMove = makeAMove("L");
    currentMove.start();
    break;
  case 'r': //                   Move R - Right CW
    currentMove = makeAMove("R");
    currentMove.start();
    break;
  case 'R': //                   Move R' - Right CCW
    currentMove = makeAMove("R\'");
    currentMove.start();
    break;
  }
}
