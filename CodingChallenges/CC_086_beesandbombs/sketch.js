// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Video: https://youtu.be/H81Tdrmz2LA

// Original GIF: https://beesandbombs.tumblr.com/post/149654056864/cube-wave

let angle = 0;
let w = 24;
let maX;
let maY;
let maxD;
let mousePosX;
let mousePosY;

function setup() {
  createCanvas(400, 400, WEBGL);
  maX = -atan(cos(QUARTER_PI));
  maY = QUARTER_PI;
  maxD = dist(0, 0, 200, 200);
  mousePosX = mouseX;
  mousePosY = mouseY;
}

function draw() {
  background(100);
  ortho(-400, 400, 400, -400, 0, 1000);
  rotateX(maX);
  rotateY(maY)﻿

  for (let z = 0; z < height; z += w) {
    for (let x = 0; x < width; x += w) {
      push();
      let d = dist(x, z, width / 2, height / 2);
      let offset = map(d, 0, maxD, -PI, PI);
      let a = angle + offset;
      let h = floor(map(sin(a), -1, 1, 100, 300));
      translate(x - width / 2, 0, z - height / 2);
      normalMaterial();
      box(w, h, w);
      pop();
    }
  }

  angle -= 0.1;
  mousePosX = mouseX;
  mousePosY = mouseY;
}
function mouseDragged() {
  let ang = map(mouseX-mousePosX, -width, width, -PI, PI);
  maY += ang;
  let ang2 = map(mouseY-mousePosY, -height, height, PI, -PI);
  maX += ang2;
  mousePosX = mouseX;
  mousePosY = mouseY;
}
