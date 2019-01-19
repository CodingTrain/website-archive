// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Processing transcription: Chuck England

// Binary Tree
// Part 1: https://youtu.be/ZNH0MuQ51m4
// Part 2: https://youtu.be/KFEvF_ymuzY

Tree tree;

void setup() {
  noLoop();
  tree = new Tree();
  for (int i = 0; i < 10; i++) {
    tree.addValue(floor(random(0, 100)));
  }
  tree.traverse();

  Node result = tree.search(10);
  if (result == null) {
    println("not found");
  } else {
    println(result.value);
  }
}
