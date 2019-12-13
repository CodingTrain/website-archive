// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/150-runway-rainbows.html
// https://youtu.be/vEetoBuHj8g
// https://editor.p5js.org/codingtrain/sketches/K6l0JbS6u

// This sketch requires RunwayML to function
// For more see: https://runwayml.com
// https://youtu.be/ARnf4ilr9Hcc
// https://youtu.be/7btNir5L8Jc

let rainbow;

function setup() {
  createCanvas(400, 400);
  createButton('rainbow').mousePressed(generateRainbow);
}

function generateRainbow() {
  // httpPost(path, [datatype], [data], [callback], [errorCallback])
  const z = [];
  for (let i = 0; i < 512; i++) {
    z[i] = random(-1, 1);
  }
  const path = 'http://localhost:8000/query';
  const data = {
    z: z,
    truncation: 0.8
  };
  httpPost(path, 'json', data, gotImage, gotError);
}

function gotError(error) {
  console.error(error);
}

function gotImage(result) {
  rainbow = createImg(result.image);
  rainbow.hide();
}

function draw() {
  background(220);
  if (rainbow) {
    image(rainbow, 0, 0);
  }
}
