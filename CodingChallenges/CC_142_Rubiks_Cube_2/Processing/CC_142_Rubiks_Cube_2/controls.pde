// Rubiks Cube 2
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/142.2-rubiks-cube.html
// https://youtu.be/EGmVulED_4M

void keyPressed() {
  if (key == ' ') {
    started = true; 
  }
  applyMove(key); 
}

void moves(String m) {
  switch (m) {
    case "R":
    applyMove('r');
    break;
    case "R\'":
    applyMove('R');
    break;
    case "L":
    applyMove('l');
    break;
    case "L\'":
    applyMove('L');
    break;
    case "U":
    applyMove('u');
    break;
    case "U\'":
    applyMove('U');
    break;
    case "D":
    applyMove('d');
    break;
    case "D\'":
    applyMove('D');
    break;
    case "F":
    applyMove('f');
    break;
    case "F\'":
    applyMove('F');
    break;
    case "B":
    applyMove('b');
    break;
    case "B\'":
    applyMove('B');
    break;
  }
}

void applyMove(char move) {
  switch (move) {
  case 'f': //                   Move F - Front CW
    turn(1, 1, 'z');
    break;
  case 'F': //                   Move F' - Front CCW
    turn(1, -1, 'z');
    break;  
  case 'B': //                   Move B' - Back CCW
    turn(-1, 1, 'z');
    break;
  case 'b': //                   Move B - Back CW
    turn(-1, -1, 'z');
    break;
  case 'D': //                   Move D' - Down CCW
    turn(1, 1, 'y');
    break;
  case 'd': //                   Move D - Down CW
    turn(1, -1, 'y');
    break;
  case 'u': //                   Move U - Up CW
    turn(-1, 1, 'y');
    break;
  case 'U': //                   Move U' - Up CCW
    turn(-1, -1, 'y');
    break;
  case 'L': //                   Move L' - Left CCW
    turn(-1, 1, 'x');
    break;
  case 'l': //                   Move L - Left CW
    turn(-1, -1, 'x');
    break;
  case 'r': //                   Move R - Right CW
    turn(1, 1, 'x');
    break;
  case 'R': //                   Move R' - Right CCW
    turn(1, -1, 'x');
    break;
  }
}
