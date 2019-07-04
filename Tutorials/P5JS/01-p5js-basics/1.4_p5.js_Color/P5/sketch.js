/*
code from video: https://youtu.be/9mucjcrhFcM?list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA
code can be seen from 9:47 second onward
*/


function setup() {
  createCanvas(600, 400);  
}


function draw() {
  //background(255);
  background(150, 150, 200);
  ellipseMode(CENTER);
  rectMode(CENTER);
  
  // Body
  fill(255, 0, 0);
  rect(240, 145, 20, 100);
  
  // Head 
  fill(0, 0, 255);
  ellipse(240, 115, 60, 60);
  
  // Eyes
  fill(0, 255, 0);
  ellipse(221, 115, 16, 32);
  ellipse(259, 115, 16, 32);
  
  // Legs
  line(230, 195, 220, 205);
  line(250, 195, 260, 205);
}