// https://vimeo.com/channels/learningp5js/142698161

var bgcolor;
var button;
var slider;
var nameInput;
var nameP;

function setup() {
  canvas = createCanvas(200, 200);
  canvas.mouseOver(overpara);
  canvas.mouseOut(outpara);
  canvas.mousePressed(changeColor);
  
  bgcolor = color(200);
  nameP = createP('Your name!');
  
  button = createButton("go go go go");
  button.mousePressed(changeColor);
  slider = createSlider(10, 100, 86);
  nameInput = createInput('type your name');
  
  nameP.mouseOver(overpara);
  nameP.mouseOut(outpara);
  
  nameInput.changed(updateText);
}

function updateText() {
  nameP.html(nameInput.value());
}

function overpara() {
  nameP.html('your moues is over me');
}

function outpara() {
  nameP.html('your mouse is out');
}
function changeColor() {
  bgcolor = color(random(255))
  
}

// function mousePressed() {
//   changeColor();
// }


function draw() {
  background(bgcolor);
  fill(255, 0, 175);
  ellipse(100, 100, slider.value(), slider.value());
  //nameP.html(input.value());
  text(nameInput.value(), 10, 20);
  
}