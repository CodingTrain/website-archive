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
  float x;
  float y;

  Node(int val) {
    this(val, 0, 0);
  }

  Node(int val, float x_, float y_) {
    value = val;
    left = null;
    right = null;
    x = x_;
    y = y_;
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

  void visit(Node parent) {
    if (left != null) {
      left.visit(this);
    }
    println(value);
    fill(255);
    noStroke();
    textAlign(CENTER);
    text(value, x, y);
    stroke(255);
    noFill();
    ellipse(x, y, 20, 20);
    line(parent.x, parent.y, x, y);
    if (right != null) {
      right.visit(this);
    }
  }

  void addNode(Node n) {
    if (n.value < value) {
      if (left == null) {
        left = n;
        left.x = this.x - 50;
        left.y = this.y + 20;
      } else {
        left.addNode(n);
      }
    } else if (n.value > value) {
      if (right == null) {
        right = n;
        right.x = this.x + 50;
        right.y = this.y + 20;
      } else {
        right.addNode(n);
      }
    }
  }
};
