// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/KkyIDI6rQJI

// Purple Rain
// (138, 43, 226)
// (230, 230, 250) // background

Drop[] drops = new Drop[500]; // array of drop objects

void setup() {
  size(640, 360); // size of the window
  for (int i = 0; i < drops.length; i++) { // we create the drops 
    drops[i] = new Drop();
  }
}

void draw() {
  background(230, 230, 250); // background color in RGB color cordinates
  for (int i = 0; i < drops.length; i++) {
    drops[i].fall(); // sets the shape and speed of drop
    drops[i].show(); // render drop
  }
}
