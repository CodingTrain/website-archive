// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/AaGK-fj-BAM

var s;
var scl = 20;

var food;
var counter =0;
var walls = [];

var lower_edge = height-50;
var num_lvl;

function setup() {
  createCanvas(1340, 570);
  s = new Snake();
  num_lvl =10; // number of levels
  s.Reset();
  pickLocation();
  lower_edge = height-50; // length of score rectangle
  addwalls();
}

function pickLocation() {
  var cols = floor(width/scl);
  var rows = floor(lower_edge/scl);
  // need  to fix location so that the new location is away from snake body and walls
  do{
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
  }while(wronglocation(food,walls,s.tail));
}

function wronglocation(food,walls,tail) {
	
	for (var i = 0; i < walls.length; i++) {
      var d = dist(food.x, food.y, walls[i].x, walls[i].y);
      if (d < 1) {
		 return true;
      } 
    }
	for (var i = 0; i < tail.length; i++) {
      var d = dist(food.x, food.y, tail[i].x, tail[i].y);
      if (d < 1) {
		 return true;
      } 
    }
	return false ;
}

function addwalls() {
  var cols = floor(width/scl);
  var rows = floor(lower_edge/scl);
  var num = floor(cols * rows / 50); // 2% of screen are walls
  // need  to fix location so that the new location is away feom snake body 
  for (var i = 0 ; i < num ; i++) {
	 walls[i] = createVector(floor(random(cols)), floor(random(rows)));
	 walls[i].mult(scl); 
  }
}

function draw() {
  background(51);

  if (s.eat(food)) {
    pickLocation();
  }
  
  if (s.death(walls)) {
    addwalls();
  }
  // add turbo mode 
  if (keyIsDown(CONTROL)) {
    s.turbo();
  } else {
	s.normal();
  }
  levelup();
  s.show();
	// draw score
  fill(50, 255, 100);
  rect(0, lower_edge, width, 50 );
  score();
   //draw food
  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl);
  // draw walls
  fill(0, 255, 200);
 for (var i = 0 ; i < walls.length ; i++) {
	 rect(walls[i].x, walls[i].y, scl, scl);
  }
}

function levelup(){
	counter ++;
	var test1 = counter  % (s.lvl); 
	var test2 = s.total  % (s.lvl_limit);
	// update speed
	if(test1 === 0) 
	{
		s.update();
	}
	//update levels
	if((test2  === 0) && (s.flag == true ) && (s.lvl >1))
	{
		counter = 0 ;
		s.flag = false;
		s.lvl --;
	}
}

function score(){
	fill(200, 10, 20);
	textSize(32);
	textFont("Georgia");
	textStyle(BOLD);
	text("Score ---->  " + s.total, 5, height-10);
	text("Level ---->  " + (num_lvl-s.lvl), width/2, height-10);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  }
}
