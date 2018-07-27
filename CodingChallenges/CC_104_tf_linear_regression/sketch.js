let X = [];
let Y = [];

let m, b;

let cleared = false;

const optimizer = tf.train.adam(0.09);
const loss = (pred, label) => pred.sub(label).square().mean(); // mean squared error

function setup() {
  canvas = createCanvas(windowWidth, 400);
  canvas.parent('canvas');
  canvas.mousePressed(() => {
    // Normalize x, y to (-1, 1) and add it to data
    let x = map(mouseX, 0, width, -1, 1);
    let y = map(mouseY, 0, height, 1, -1);
    X.push(x);
    Y.push(y);
  });

  resetCanvas();
}

function draw() {
  background(0);

  tf.tidy(() => {
    if (X.length > 0) {
      const y = tf.tensor1d(Y);
      optimizer.minimize(() => loss(tf.tensor1d(X).mul(m).add(b), y));

      const lineX = [-1, 1];

      const ys = tf.tensor1d(lineX).mul(m).add(b);
      let lineY = ys.data().then((y) => {

        // reverse normalization of x, y
        let x1 = map(lineX[0], -1, 1, 0, width);
        let x2 = map(lineX[1], -1, 1, 0, width);
        let y1 = map(y[0], -1, 1, height, 0);
        let y2 = map(y[1], -1, 1, height, 0);

        stroke(139, 0, 139);
        strokeWeight(2);
        line(x1, y1, x2, y2);
      });
    } else {
        if (!cleared) {
          // Let's make some random data to begin with
          for (let i = 0; i < 30; i++) {
            let fakeX = random(-1, 1);
            X.push(fakeX);
            Y.push(random(-.8, .5)*fakeX);
          }
        }
      }
  });

  strokeWeight(8)
  stroke(250);
  for (let i = 0; i < X.length; i++) {
    let px = map(X[i], -1, 1, 0, width);
    let py = map(Y[i], -1, 1, height, 0);
    point(px, py);
  }
}

function printData() {
  let data = document.getElementById('data');
  data.innerText = null;
  if (X.length > 0) {
    // Print x, y pairs
    for (let i = 0; i < X.length; i++) {
      data.innerText += `[${X[i]}, ${Y[i]}]\r\n`;
    }
    // Show the fitted equation
    data.innerText += `\r\ny = ${m.dataSync()}x + ${b.dataSync()}`;
  }
}

function resetCanvas(clear = false) {
  cleared = clear;

  X = [];
  Y = [];
  m = tf.variable(tf.scalar(random(-1, 1)));
  b = tf.variable(tf.scalar(random(-1, 1)));

  // Clear #data
  let data = document.getElementById('data');
  data.innerText = null;
}
