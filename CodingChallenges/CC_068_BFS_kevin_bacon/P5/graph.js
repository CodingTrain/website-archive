// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Breadth-First search

// Part 1: https://youtu.be/piBq7VD0ZSo
// Part 2: https://youtu.be/-he67EEM6z0

function Graph() {
  this.nodes = [];
  this.graph = {};
  this.end = null;
  this.start = null;
}

Graph.prototype.reset = function() {
  for (var i = 0; i < this.nodes.length; i++) {
    this.nodes[i].searched = false;
    this.nodes[i].parent = null;
  }
}

Graph.prototype.setStart = function(actor) {
  this.start = this.graph[actor];
  return this.start;
}

Graph.prototype.setEnd = function(actor) {
  this.end = this.graph[actor];
  return this.end;
}


Graph.prototype.addNode = function(n) {
  // Node into array
  this.nodes.push(n);
  var title = n.value;
  // Node into "hash"
  this.graph[title] = n;
}

Graph.prototype.getNode = function(actor) {
  var n = this.graph[actor];
  return n;
}
