// Daniel Shiffman
// http://youtube.com/thecodingtrain
// http://codingtra.in

// Image Classification with ml5
// https://youtu.be/yNkAuWz5lnY

let mobilenet;
let puffin;

function modelReady() {
  console.log('Model is ready!!!');
  mobilenet.predict(puffin, gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    let label = results[0].className;
    let prob = results[0].probability;
    fill(0);
    textSize(64);
    text(label, 10, height - 100);
    createP(label);
    createP(prob);
  }
}

function imageReady() {
  image(puffin, 0, 0, width, height);
}

function setup() {
  createCanvas(640, 480);
  puffin = createImg('images/puffin.jpg', imageReady);
  puffin.hide();
  background(0);
  mobilenet = ml5.imageClassifier('MobileNet', modelReady);
}
