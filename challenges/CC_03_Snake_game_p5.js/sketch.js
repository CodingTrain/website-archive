// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/AaGK-fj-BAM

var s;
var scl = 50;

var food;

function setup() {
  createCanvas(600,600);
  s = new Snake();
  frameRate(8);
  pickLocation();
  s.start();
}



function pickLocation(){
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  var isPossibleFoodPlacement = false;

  food = createVector(floor(random(cols)), floor(random(rows)));
  console.log("x van food is ",food.x);

  var isPossibleFoodPlacement = !(s.checkForTail(food));//als er iets gevonden is komt er een true uit maar dan moet isPossibleFoodPlacement false zijn

  while (isPossibleFoodPlacement ===false) {
    food = createVector(floor(random(cols)), floor(random(rows)));
    var isPossibleFoodPlacement = !(s.checkForTail(food));//als er iets gevonden is komt er een true uit maar dan moet isPossibleFoodPlacement false zij
  }
  var isPossibleFoodPlacement = false;

  food.mult(scl);
}

function draw() {
  background(51);



  if(s.eat(food)){
    pickLocation();
  }
  s.death();
  s.update();
  s.show();

  fill(255,0,100);
  rect(food.x, food.y, scl, scl);
}


function keyPressed(){

  if (keyCode === UP_ARROW){
    s.dir(0,-1);
  }else if (keyCode === DOWN_ARROW) {
    s.dir(0,1);
  }else if (keyCode === RIGHT_ARROW) {
      s.dir(1,0);}
      else if (keyCode === LEFT_ARROW) {
        s.dir(-1,0);}
}
