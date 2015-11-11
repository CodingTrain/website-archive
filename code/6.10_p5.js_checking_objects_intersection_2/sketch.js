/* 
6.10 p5.js checking objects intersection part 2 (part 1 is in video 6.9)
Code for video https://vimeo.com/channels/learningp5js/141919524
*/

var bubbles = [];

function setup() {
  createCanvas(600, 400);

  for (var i = 0; i < 5; i++) {
    bubbles[i] = new Bubble(random(width), random(height));
  }
}

function draw() {
  background(0);

  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].update();
    bubbles[i].display();
    for (var j = 0; j < bubbles.length; j++) {
      if (i != j && bubbles[i].intersects(bubbles[j])) {
        bubbles[i].changeColor();
        bubbles[j].changeColor();
      }
    }
  }
}
