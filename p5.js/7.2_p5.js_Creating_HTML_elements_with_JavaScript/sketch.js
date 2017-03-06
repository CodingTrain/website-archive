// https://vimeo.com/channels/learningp5js/142698164

function setup() {
  createCanvas(200, 200);
  createElement('h1', 'My favorite language is p5')
  createP("My favorite color is purple")
  
}

function mousePressed() {
  createP("My favorite number is " + random(0, 10))
};
function draw() {
  background(0);
  fill(255, 0, 0);
  rect(100, 100, 50, 50);
}