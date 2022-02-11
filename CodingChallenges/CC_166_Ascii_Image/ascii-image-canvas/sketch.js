// Image to ASCII
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/166-ascii-image.html
// YT Link TBD

// ASCII video: https://editor.p5js.org/codingtrain/sketches/KTVfEcpWx
// ASCII image canvas: https://editor.p5js.org/codingtrain/sketches/r4ApYWpH_
// ASCII image DOM: https://editor.p5js.org/codingtrain/sketches/ytK7J7d5j
// ASCII image source text: https://editor.p5js.org/codingtrain/sketches/LNBpdYQHP
// ASCII image weather API: https://editor.p5js.org/codingtrain/sketches/DhdqcoWn4


const density = 'Ñ@#W$9876543210?!abc;:+=-,._ ';
let gloria;

function preload() {
  gloria = loadImage("gloria20.jpg");
}

function setup() {
  createCanvas(400, 400); 
}

function draw() {
  background(0);
  
  let w = width / gloria.width;
  let h = height / gloria.height;
  gloria.loadPixels();
  for (let i = 0; i < gloria.width; i++) {
    for (let j = 0; j < gloria.height; j++) {
      const pixelIndex = (i + j * gloria.width) * 4;
      const r = gloria.pixels[pixelIndex + 0];
      const g = gloria.pixels[pixelIndex + 1];
      const b = gloria.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      
      noStroke();
      fill(255);
      //square(i * w, j * h, w);
      
      const len = density.length;
      const charIndex = floor(map(avg,0,255,len,0));
      
      
      
      textSize(w);
      textAlign(CENTER, CENTER);
      text(density.charAt(charIndex), i * w + w * 0.5, j * h + h * 0.5);
      
      
    }
  }
  
  
}