// Rubiks Cube 3
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/142.3-rubiks-cube.html
// https://youtu.be/8U2gsbNe1Uo


void keyPressed() {
  if (key == ' ') {
    currentMove.start();
    counter = 0;
  }
  // applyMove(key);
}

void applyMove(char move) {
  switch (move) {
  case 'f': 
    turnZ(1, 1);
    break;
  case 'F': 
    turnZ(1, -1);
    break;  
  case 'b': 
    turnZ(-1, 1);
    break;
  case 'B': 
    turnZ(-1, -1);
    break;
  case 'u': 
    turnY(1, 1);
    break;
  case 'U': 
    turnY(1, -1);
    break;
  case 'd': 
    turnY(-1, 1);
    break;
  case 'D': 
    turnY(-1, -1);
    break;
  case 'l': 
    turnX(-1, 1);
    break;
  case 'L': 
    turnX(-1, -1);
    break;
  case 'r': 
    turnX(1, 1);
    break;
  case 'R': 
    turnX(1, -1);
    break;
  }
}
