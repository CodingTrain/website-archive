// Coding Challenge 128: SketchRNN Snowflakes
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/128-sketchrnn-snowflakes.html
// https://youtu.be/pdaNttb7Mr8
// https://editor.p5js.org/codingtrain/sketches/B1NHS00xE

let model;
let strokePath = null;

let x, y;
let pen;

function setup() {
  createCanvas(windowWidth, windowHeight);
  setupNewSketch();
  model = ml5.SketchRNN('snowflake', modelReady);
  background(0);
}

function modelReady() {
  console.log('model ready');
  model.reset();
  model.generate(gotSketch);
}

function draw() {
  translate(width / 2, height / 2);
  if (strokePath != null) {
    let newX = x + strokePath.dx * 0.2;
    let newY = y + strokePath.dy * 0.2;
    if (pen == 'down') {
      stroke(255);
      strokeWeight(2);
      line(x, y, newX, newY);
    }
    pen = strokePath.pen;
    strokePath = null;
    x = newX;
    y = newY;

    if (pen !== 'end') {
      model.generate(gotSketch);
    } else {
      console.log('drawing complete');
      // In the video forgot to reset the pen to "down"
      // along with the x,y position so here is a new
      // function that takes care of both!
      setupNewSketch();
      model.reset();
      model.generate(gotSketch);
    }
  }
}

function gotSketch(error, s) {
  if (error) {
    console.error(error);
  } else {
    strokePath = s;
    //console.log(strokePath);
  }
}

function setupNewSketch() {
  pen = 'down';
  x = random(-width / 2, width / 2);
  y = random(-height / 2, height / 2);
}
