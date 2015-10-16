/*
code from video: https://youtu.be/9mucjcrhFcM?list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA
code can be seen from 7:32 second
*/


function setup() {
  createCanvas(600, 300);
}

function draw() {
  background(255);
  ellipseMode(CENTER);
  rectMode(CENTER);
  
  // Body
  rect(240, 145, 20, 100);
  
  // Head
  ellipse(240, 115, 60, 60);
  
  // Eyes
  ellipse(221, 115, 16, 32);
  ellipse(259, 115, 16, 32);
  
  // Legs
  line(230, 195, 220, 205);
  line(250, 195, 260, 205);
}