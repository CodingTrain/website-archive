// Rubiks Cube 2
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/142.2-rubiks-cube.html
// https://youtu.be/EGmVulED_4M


import peasy.*;

PeasyCam cam;

int dim = 3;
int sequenceLength = 20;
Cubie[] cube = new Cubie[dim*dim*dim];

java.util.List<Move> sequence = new ArrayList<Move>();
int counter = 0;

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
  //cube[0].c = color(255, 0, 0);
  //cube[2].c = color(0, 0, 255);

  Move move = null;
  
  for (int i = 0; i < sequenceLength; i++) {
    move = Move.nextRandom(move);
    sequence.add(move);
  }

  System.out.println("sequence = " + sequence);

  for (int i = sequenceLength-1; i >= 0; i--) {
    Move nextMove = sequence.get(i).inverse();
    sequence.add(nextMove);
  }
  
  System.out.println("inverse sequence = " + sequence.subList(sequenceLength, 2*sequenceLength));
  
}


void draw() {
  background(51); 

  if (started) {
    if (frameCount % 25 == 0) {
      if (counter < sequence.size()) {
        Move move = sequence.get(counter);
        move.applyTo(cube);
        counter++;
      }
    }
  }

  scale(50);
  for (int i = 0; i < cube.length; i++) {
    cube[i].show();
  }
}
