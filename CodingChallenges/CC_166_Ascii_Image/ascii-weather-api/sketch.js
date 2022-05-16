// Image to ASCII
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/166-ascii-image.html
// YT Link TBD

// ASCII video: https://editor.p5js.org/codingtrain/sketches/KTVfEcpWx
// ASCII image canvas: https://editor.p5js.org/codingtrain/sketches/r4ApYWpH_
// ASCII image DOM: https://editor.p5js.org/codingtrain/sketches/ytK7J7d5j
// ASCII image source text: https://editor.p5js.org/codingtrain/sketches/LNBpdYQHP
// ASCII image weather API: https://editor.p5js.org/codingtrain/sketches/DhdqcoWn4

let data;
let forecast;
let gloria;
let startIndex = 0;

function preload() {
  gloria = loadImage("gloria48.jpg");
  data = loadJSON("https://api.weather.gov/gridpoints/LWX/108,90/forecast/hourly");
}

function setup() {
  createCanvas(800, 800); 
  
  forecast = '';
  const periods = data.properties.periods;
  for (let p of periods) {
    forecast += `${p.temperature}°F ${p.shortForecast} ${p.windSpeed} ${p.windDirection} `;
    console.log(p);
  }
    
  
 textFont("Courier-Bold");
  
}

function draw() {
  background(0);
  frameRate(10);
  
  let charIndex = startIndex;
  let w = width / gloria.width;
  let h = height / gloria.height;
  gloria.loadPixels();
    for (let j = 0; j < gloria.height; j++) {
  for (let i = 0; i < gloria.width; i++) {
      const pixelIndex = (i + j * gloria.width) * 4;
      const r = gloria.pixels[pixelIndex + 0];
      const g = gloria.pixels[pixelIndex + 1];
      const b = gloria.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      
      noStroke();
      fill(avg);      
      textSize(w*1.4);
      textAlign(CENTER, CENTER);
      
      text(forecast.charAt(charIndex % forecast.length), i * w + w * 0.5, j * h + h * 0.5);
      charIndex++;
    }
  }
  
  //startIndex++;
  
  
}