// The Prime Spiral (aka Ulam Spiral)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/167-prime-spiral.html
// https://youtu.be/a35KWEjRvc0

Spiral spiral1, spiral2;

void setup() {
  size(1000, 550);
  textFont(createFont("Courier-Bold", 32));
  background(51);
  spiral1 = new Spiral(250, 250, 465, 465);
  spiral2 = new Spiral(750, 250, 465, 465);
  rectMode(CENTER);
  stroke(255);
  fill(0);
  rect(250, 250, 465, 465);
  rect(750, 250, 465, 465);
  fill(255);
  textAlign(CENTER);
  noStroke();
  text("Prime", 250, 525);
  text("Random", 750, 525);
}

void draw() {
  // textSize(stepSize);
  // textAlign(CENTER, CENTER);
  // text(step, x, y);
  // frameRate(1);
  for (int i = 0; i < 10; i++) {
    spiral1.update(false);  //isRandom = false -> prime spiral
    spiral2.update(true);   //isRandome = true -> random spiral
  }
}
