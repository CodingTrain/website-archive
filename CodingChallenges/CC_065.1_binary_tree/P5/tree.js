// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Binary Tree
// Part 1: https://youtu.be/ZNH0MuQ51m4
// Part 2: https://youtu.be/KFEvF_ymuzY

function Tree() {
  this.root = null;
}

Tree.prototype.traverse = function() {
  this.root.visit();
};

Tree.prototype.search = function(val) {
  var found = this.root.search(val);
  return found;
};

Tree.prototype.addValue = function(val) {
  var n = new Node(val);
  if (this.root == null) {
    this.root = n;
  } else {
    this.root.addNode(n);
  }
};
