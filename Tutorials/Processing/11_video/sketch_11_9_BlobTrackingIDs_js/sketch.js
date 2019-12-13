let video;

let blobCounter = 0;

let maxLife = 200;

let trackColor;
let threshold = 40;
let distThreshold = 50;

const blobs = [];

let videoReady = false;

function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.hide();
  // video.size(320, 240);
  trackColor = color(183, 12, 83);
}

function keyPressed() {
  if (key == 'a') {
    distThreshold += 5;
  } else if (key == 'z') {
    distThreshold -= 5;
  }
  if (key == 's') {
    threshold += 5;
  } else if (key == 'x') {
    threshold -= 5;
  }
}

function draw() {
  background(255);
  video.loadPixels();
  image(video, 0, 0);

  const currentBlobs = [];

  // Begin loop to walk through every pixel
  for (let x = 0; x < video.width; x++) {
    for (let y = 0; y < video.height; y++) {
      const loc = (x + y * video.width) * 4;
      // What is current color
      const r1 = video.pixels[loc + 0];
      const g1 = video.pixels[loc + 1];
      const b1 = video.pixels[loc + 2];
      const r2 = red(trackColor);
      const g2 = green(trackColor);
      const b2 = blue(trackColor);

      const d = distSq(r1, g1, b1, r2, g2, b2);

      if (d < threshold * threshold) {
        let found = false;
        for (let b of currentBlobs) {
          if (b.isNear(x, y)) {
            b.add(x, y);
            found = true;
            break;
          }
        }

        if (!found) {
          const b = new Blob(x, y);
          currentBlobs.push(b);
        }
      }
    }
  }

  for (let i = currentBlobs.length - 1; i >= 0; i--) {
    if (currentBlobs[i].size() < 500) {
      currentBlobs.splice(i, 1);
    }
  }

  // There are no blobs!
  if (blobs.length < 1 && currentBlobs.length > 0) {
    print('Adding blobs!');
    for (let b of currentBlobs) {
      b.id = blobCounter;
      blobs.push(b);
      blobCounter++;
    }
  } else if (blobs.length <= currentBlobs.length) {
    // Match whatever blobs you can match
    for (let b of blobs) {
      let recordD = 1000;
      let matched = null;
      for (let cb of currentBlobs) {
        let centerB = b.getCenter();
        let centerCB = cb.getCenter();
        const d = p5.Vector.dist(centerB, centerCB);
        if (d < recordD && !cb.taken) {
          recordD = d;
          matched = cb;
        }
      }
      matched.taken = true;
      b.become(matched);
    }

    // Whatever is leftover make new blobs
    for (let b of currentBlobs) {
      if (!b.taken) {
        b.id = blobCounter;
        blobs.push(b);
        blobCounter++;
      }
    }
  } else if (blobs.length > currentBlobs.length) {
    for (let b of blobs) {
      b.taken = false;
    }

    // Match whatever blobs you can match
    for (let cb of currentBlobs) {
      let recordD = 1000;
      let matched = null;
      for (let b of blobs) {
        const centerB = b.getCenter();
        const centerCB = cb.getCenter();
        const d = p5.Vector.dist(centerB, centerCB);
        if (d < recordD && !b.taken) {
          recordD = d;
          matched = b;
        }
      }
      if (matched != null) {
        matched.taken = true;
        matched.become(cb);
      }
    }

    for (let i = blobs.length - 1; i >= 0; i--) {
      const b = blobs[i];
      if (!b.taken) {
        blobs.splice(i, 1);
      }
    }
  }

  for (let b of blobs) {
    b.show();
  }

  textAlign(RIGHT);
  fill(0);
  noStroke();
  //text(currentBlobs.size(), width-10, 40);
  //text(blobs.size(), width-10, 80);
  textSize(12);
  text('color threshold: ' + threshold, width - 10, 50);
  text('distance threshold: ' + distThreshold, width - 10, 25);
}

function distSq(a1, b1, c1, a2, b2, c2) {
  let x1, y1, z1, x2, y2, z2;
  if (arguments.length == 4) {
    x1 = a1;
    y1 = b1;
    z1 = 0;
    x2 = c1;
    y2 = a2;
    z2 = 0;
  } else if (arguments.length == 6) {
    x1 = a1;
    y1 = b1;
    z1 = c1;
    x2 = a2;
    y2 = b2;
    z2 = c2;
  }
  const d =
    (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1) + (z1 - z2) * (z1 - z2);
  return d;
}

function mousePressed() {
  // Save color where the mouse is clicked in trackColor variable
  video.loadPixels();
  const loc = (mouseX + mouseY * video.width) * 4;
  trackColor = color(
    video.pixels[loc],
    video.pixels[loc + 1],
    video.pixels[loc + 2]
  );
  console.log(trackColor);
}
