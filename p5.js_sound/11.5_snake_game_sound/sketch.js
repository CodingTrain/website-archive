// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/40Me1-yAtTc

// The snake
var s;
// The scale of the grid
var scl = 20;
var cols;
var rows;

var eatSound;
var startOverSound;
var hello;
var music;

var fr = 3;

// This is the food location
var food;

var musicRate = 1;

function preload() {
  eatSound = loadSound("sounds/Alert/Alert - 06.mp3");
  startOverSound = loadSound("sounds/Voice/Voice - Cartoon Laugh 01.mp3");
  hello = loadSound("sounds/Voice/Voice - Hello 01.mp3");
  music = loadSound("sounds/Music/Music - 01.mp3");
}

function setup() {
  createCanvas(300, 300);
  music.play();
  //hello.playMode('sustain');
  colorMode(HSB, 255);
  noStroke();
  cols = floor(width / scl);
  rows = floor(height / scl);

  s = new Snake();
  frameRate(fr);

  // Pick a food location
  pickLocation();

}

// Pick a food location
function pickLocation() {
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

// Animation loop
function draw() {
  background(51);

  // If the snake eats the food
  if (s.eat(food)) {
    eatSound.play();
    fr += 2;
    musicRate += 0.05;
    music.rate(musicRate);
    frameRate(fr);
    pickLocation();
  }

  // Check if the snake hits itself or a wall
  s.death();
  // Update snake
  s.update();
  // Draw snake
  s.show();


  fill(150, 255, 255);
  rect(food.x, food.y, scl, scl);
}




// Moving the snake
function keyPressed() {
  //if (!hello.isPlaying()) {
  //hello.play();
  //}

  if (keyCode === UP_ARROW) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  }

  if (key == ' ') {
    s.total++;
  }
}
