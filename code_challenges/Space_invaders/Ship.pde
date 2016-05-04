class Ship {
  float x, xdir;

  Ship() {
    this.x = width/2;
    this.xdir = 0;
  }

  void show() {
    fill(255);   
    rectMode(CENTER); 
    rect(this.x, height-20, 20, 60);
  }

  void setDir(float dir) {
    this.xdir = dir;
  }

  void move() {
    this.x += this.xdir*5;
  }
}