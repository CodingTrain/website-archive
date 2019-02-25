// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Processing transcription: Chuck England

// Binary Tree
// Part 1: https://youtu.be/ZNH0MuQ51m4
// Part 2: https://youtu.be/KFEvF_ymuzY

class Tree {
  Node root;

  Tree() {
    root = null;
  }

  void traverse() {
    root.visit(root);
  }

  Node search(int val) {
    Node found = root.search(val);
    return found;
  }

  void addValue(int val) {
    Node n = new Node(val);
    if (root == null) {
      root = n;
      root.x = width / 2;
      root.y = 16;
    } else {
      root.addNode(n);
    }
  }
};
