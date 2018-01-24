/* 

1. Code below is for https://vimeo.com/channels/learningp5js/141211396
2. Video reference at 0:20 seconds on Objects > https://vimeo.com/channels/learningp5js/138327558

*/

var nums = [100, 35, 46, 72];
var num = 23;

function setup() {
  createCanvas(400, 400);
}

function draw() {
background(0);
  ellipse(100, 200, num, num);
  ellipse(200, 200, nums[2], nums[2]);

}