class Spot {
  int x, y, step;
  boolean isPrime;
  
  Spot(int x, int y, int step) {
    this.x = x;
    this.y = y;
    this.step = step;
    this.isPrime = isPrime(step);
  }
  
  void show() {
    if (!isPrime) {
      fill(45, 197, 244);
      rectMode(CENTER);
      push();
      translate(x, y);
      square(0, 0, stepSize * 0.5);
      pop();
    } else {
      float r = stepSize * 0.5;
      fill(240, 99, 164);
      push();
      translate(x, y);
      rotate(-PI / 4);
      float h = 24 + sqrt(step);
      translate(0, 0, h / 2);
      box(r, r, h);
      pop();
    }
  }
  
  boolean isPrime(int value) {
  if (value == 1) return false;
  for (int i = 2; i <= sqrt(value); i++) {
    if (value % i == 0) {
      return false;
    }
  }
  return true;
}
}
