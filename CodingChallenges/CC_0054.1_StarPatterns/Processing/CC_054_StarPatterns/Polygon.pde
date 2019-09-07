// Daniel Shiffman
// http://codingtra.in
// Islamic Star Patterns
// Video Part 1: https://youtu.be/sJ6pMLp_IaI
// Video Part 2: [coming soon]
// Based on: http://www.cgl.uwaterloo.ca/csk/projects/starpatterns/
// Processing transcription: Chuck England

// Repo with more tiling patterns and features
// https://github.com/CodingTrain/StarPatterns

import java.util.*;

class Polygon {
  List<PVector> vertices = new ArrayList<PVector>();
  List<Edge> edges = new ArrayList<Edge>();
  
  Polygon() {}

  void addVertex(float x, float y) {
    PVector a = new PVector(x, y);
    int total = vertices.size();
    if (total > 0) {
      PVector prev = vertices.get(total - 1);
      Edge edge = new Edge(prev, a);
      edges.add(edge);
    }
    vertices.add(a);
  }

  void close() {
    int total = vertices.size();
    PVector last = vertices.get(total - 1);
    PVector first = vertices.get(0);
    Edge edge = new Edge(last, first);
    edges.add(edge);
  }

  void hankin() {
    for (int i = 0; i < edges.size(); i++) {
      edges.get(i).hankin();
    }

    for (int i = 0; i < edges.size(); i++) {
      for (int j = 0; j < edges.size(); j++) {
        if (i != j) {
          edges.get(i).findEnds(edges.get(j));
        }
      }
    }
  }

  void show() {
    for (int i = 0; i < edges.size(); i++) {
      edges.get(i).show();
    }
  }
};
