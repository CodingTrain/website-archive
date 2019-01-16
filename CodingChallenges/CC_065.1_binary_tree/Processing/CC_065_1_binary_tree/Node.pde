// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Processing transcription: Chuck England

// Binary Tree
// Part 1: https://youtu.be/ZNH0MuQ51m4
// Part 2: https://youtu.be/KFEvF_ymuzY

class Node {
  int value;
  Node left;
  Node right;

  Node(int val) {
    value = val;
    left = null;
    right = null;
  }

  Node search(int val) {
    if (value == val) {
      return this;
    } else if (val < value && left != null) {
      return left.search(val);
    } else if (val > value && right != null) {
      return right.search(val);
    }
    return null;
  }

  void visit() {
    if (left != null) {
      left.visit();
    }
    println(value);
    if (right != null) {
      right.visit();
    }
  }

  void addNode(Node n) {
    if (n.value < value) {
      if (left == null) {
        left = n;
      } else {
        left.addNode(n);
      }
    } else if (n.value > value) {
      if (right == null) {
        right = n;
      } else {
        right.addNode(n);
      }
    }
  }
};
