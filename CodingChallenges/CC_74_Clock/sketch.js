// Inspiration: Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
//
// New version by kleines filmröllchen
// 09-21-17
// Changes:
// - Clock is moving smoothly
// - Slightly changed visuals
// - Arcs have basic movement
// - Fullscreen can be activated by pressing "f" (automatically active on mobile devices)
// - Everything (even stroke weight) is now canvas size dependend
// - small icon added

var cnv;
var baseStroke = 8;

var prevKey;

var cMillis = 0;
var oldS;

var startAngleSecs = 0, startAngleMins = 0, startAngleHrs = 0;

let fullScreen = false;

function setup() {
  cnv = createCanvas(400, 400);
	centerCanvas();

  angleMode(DEGREES);

	setInterval( function() {
		cMillis += 10;
		//equates to 1 step movement per 0.5 seconds
		startAngleSecs += 0.12;
		//rotates negatively, equates to 1 step movement per 3 seconds
		startAngleMins -= 0.02;
		//equates to 1 step movement per 10 seconds
		startAngleHrs += 0.006
	} , 10);

	oldS = second();

	//Auto-Fullscreen on mobile device
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
		fullScreenCanvas();
	}
}

function draw() {
	background(0);
	translate(width/2, height/2);
	rotate(-90);
	//Var setup
	let hr = hour(), mn = minute(), sc = second();

	//Smoothing mainly relies on some millisecond checks and setInterval accuracy
	let sSmooth = sc + (cMillis/1000);
	let mSmooth = mn + (sSmooth/60);
	let hSmooth12 = (hr % 12) + (mSmooth/60);

	let secondAngle = map(sSmooth, 0, 60, 0, 360);
	let minuteAngle = map(mSmooth, 0, 60, 0, 360);
	let hourAngle = map(hSmooth12, 0, 12, 0, 360);

	//Change in second
	if(sc != oldS) {
	 cMillis = 0;
	 // No millisecond adding in this case: causes visual bugs
	 secondAngle = map(sc, 0, 60, 0, 360)
	}

	//////////////////////
	// Clock arcs
	var outerC = width*.75;

	strokeWeight(baseStroke);
	noFill();

	stroke(255, 100, 150);
	arc(0, 0, outerC, outerC,
		startAngleSecs, secondAngle + startAngleSecs);
	pop();

	stroke(150, 100, 255);
	arc(0, 0, outerC- (23 *(baseStroke/8)), outerC- (23 *(baseStroke/8)),
		startAngleMins, minuteAngle + startAngleMins);

	stroke(150, 255, 100);
	arc(0, 0, outerC- (46 *(baseStroke/8)), outerC- (46 *(baseStroke/8)),
		startAngleHrs, hourAngle + startAngleHrs);


	/////////////////////////
	// Basic Clock part

	push();
	rotate(hourAngle);
	stroke(150, 255, 100);
	line(0, 0, width/8, 0);
	pop();

	push();
	rotate(minuteAngle);
	stroke(150, 100, 255);
	line(0, 0, width/5.33333333333333333333, 0);
	pop();

	push();
	rotate(secondAngle);
	strokeWeight(baseStroke/1.6); stroke(255, 100, 150);
	line(0, 0, width/4, 0);
	pop();

	stroke(240);
	point(0, 0);

	//console.log(hr + ':' + mn + ':' + sc);
	//console.log(startAngleSecs, startAngleMins, startAngleHrs);

	if(!keyIsPressed) prevKey = null;
	oldS = sc;
}

function keyPressed() {
	//Prevents multiple keystrokes due to operating system keyboard handling
	if(key !== prevKey && key.toLowerCase() == 'f' ) {
		if (fullScreen) resetCanvas();
		else fullScreenCanvas();
	}
	prevKey = key;
}

function windowResized() {
	if(fullScreen) fullScreenCanvas();
	centerCanvas();
}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function fullScreenCanvas() {
	var minDimension = Math.min(document.body.scrollHeight, document.body.scrollWidth);
	baseStroke *= minDimension/width;
	resizeCanvas(minDimension, minDimension);
	centerCanvas();
	fullScreen = true;
}

function resetCanvas() {
	fullScreen = false;
	resizeCanvas(400, 400);
	baseStroke = 8;
	centerCanvas();
}
