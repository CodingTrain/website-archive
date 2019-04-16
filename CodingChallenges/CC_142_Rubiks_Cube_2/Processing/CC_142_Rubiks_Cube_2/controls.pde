// Rubiks Cube 2
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/142.2-rubiks-cube.html
// https://youtu.be/EGmVulED_4M

void keyPressed() {
  if (key == ' ') {
    started=!started; // toggle 
  } else {

    if(!started) {
      
      Move move = Move.parse(key);
      
      if(move!=null) {
        move.applyTo(cube);
      }
    }
  } 
}
