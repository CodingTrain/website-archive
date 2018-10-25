// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// 10PRINT
// https://www.youtube.com/watch?v=bEyTZ5ZZxZs
int x = 0;
int y = 0;
int spacing  = 20;
void setup() {
  size(400, 400);
  background(0);
}

void draw() {
  stroke(255);
  if (Math.random() > 0.5){
   line (x,y,x+spacing,y+spacing);// "\"
  }
  else {
   line (x,y+spacing , x+spacing,y);// "/"
  }
  x = x+spacing;
  if (x > width){
  x = 0;
  y = y+spacing;
  }
}