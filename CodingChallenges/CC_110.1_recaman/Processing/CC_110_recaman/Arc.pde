class Arc {
  float x, progress;
  int diameter, dir;
  Arc (float _x, int _diameter, int _dir){
    x = _x;
    diameter = _diameter;
    dir = _dir;
    progress = 0;
  }
  
  void show() {
    stroke(255);
    strokeWeight(0.5);
    noFill();
    
    if (dir == 0){
      arc(x, 0, diameter, diameter, 0, PI);
    } else {
      arc(x, 0, diameter, diameter, PI, TWO_PI);
    }
  }
}
