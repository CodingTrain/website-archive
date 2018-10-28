// Daniel Shiffman
// http://youtube.com/thecodingtrain
// http://codingtra.in

// Coding Challenge #117: Seven-Segment Display
// https://youtu.be/MlRlgbrAVOs
// 

int[] nums = {0x7E, 0x30, 0x6D, 0x79, 0x33, 0x5B, 0x5F, 0x70, 0x7F, 0x7B};
int index = 0;

void setup() {
  size(400, 400);
  frameRate(3);
}

void draw() {
  background(0);
  sevenSegment(nums[index]);
  index = (index + 1) % nums.length;
}

color getColor(int val, int shift) {
  int r = 255;
  int g = 0;
  int b = 0;
  int a = 40+255 * ((val >> shift) & 1);
  return color(r, g, b, a);
}

void sevenSegment(int val) {
  pushMatrix();
  noStroke();
  noFill();
  
  // A
  fill(getColor(val, 6));
  rect(60, 20, 78, 18, 10, 10, 0, 0);
  // B
  fill(getColor(val, 5));
  rect(140, 40, 18, 98, 10, 10, 0, 0);
  // C
  fill(getColor(val, 4));
  rect(140, 160, 18, 98, 10, 10, 0, 0);
  // D
  fill(getColor(val, 3));
  rect(60, 260, 78, 18, 10, 10, 0, 0);
  // E
  fill(getColor(val, 2));
  rect(40, 160, 18, 98, 10, 10, 0, 0);
  // F
  fill(getColor(val, 1));
  rect(40, 40, 18, 98, 10, 10, 0, 0);
  // A
  fill(getColor(val, 0));
  rect(60, 140, 78, 18, 10, 10, 0, 0);

  popMatrix();
}
