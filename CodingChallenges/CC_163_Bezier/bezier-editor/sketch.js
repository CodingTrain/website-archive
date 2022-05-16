// Bezier (Editor)
// The Coding Train / Simon Tiger
// https://thecodingtrain.com/CodingChallenges/163-bezier.html
// https://youtu.be/zUgsYaUQNBk

// Basic: https://editor.p5js.org/codingtrain/sketches/Z53a719cQ
// Editor by Simon Tiger: https://editor.p5js.org/codingtrain/sketches/_R7RgtGfA
// bezierVertex: https://editor.p5js.org/codingtrain/sketches/O3_cLiOaw
// Time Table Cardioid with Bezier: https://editor.p5js.org/codingtrain/sketches/kZ8dpklQg
// Quadratic: https://editor.p5js.org/codingtrain/sketches/fJIMDmHcE
// Cubic: https://editor.p5js.org/codingtrain/sketches/S1Pt8lol1
// Bezier with Formula: https://editor.p5js.org/codingtrain/sketches/0XOLNHbvC

let path;
let moving = null;

let shift = false;
let gui;

let controlMode;
let exported;
let settings = {
  closed: false,
  controlMode: '',
  controlSpacing: 0.5,
  export: {
    export: _ => exported.setValue(path.serialize()),
    exported: ''
  }
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  path = new Path();
  gui = new dat.GUI();
  gui.add(settings, 'closed').onChange(_ => path.toggleClosed());
  controlMode = gui
    .add(settings, 'controlMode', {
      Aligned: 'A',
      Mirrored: 'B',
      Free: 'C',
      Automatic: 'D'
    })
    .setValue('A');
  controlSpacing = gui.add(settings, 'controlSpacing', 0, 1, 0.01);
  const exprt = gui.addFolder('export');
  exprt.add(settings.export, 'export');
  exported = exprt.add(settings.export, 'exported');
}

function keyPressed() {
  if (keyCode == SHIFT) shift = true;
}

function keyReleased() {
  if (keyCode == SHIFT) shift = false;
}

function mousePressed() {
  if (mouseButton == LEFT) {
    if (shift) {
      path.addSegment(mouseX, mouseY);
    } else {
      for (const p of path.points) {
        if (dist(p.x, p.y, mouseX, mouseY) < 5) {
          moving = p;
          return;
        }
      }
    }
  }
}

function mouseDragged() {
  if (moving) {
    path.movePoint(moving, mouseX, mouseY, controlMode.getValue());
  }
}

function mouseReleased() {
  if (moving) moving = null;
}

function draw() {
  background(128);
  if (controlMode.getValue() == 'D') {
    path.auto = true;
    path.autoSetAllControlPoints(controlSpacing.getValue());
  } else {
    path.auto = false;
  }
  path.render();
}

class Path {
  constructor() {
    this.points = [];
    this.points.push(createVector(width / 2 - 100, height / 2));
    this.points.push(createVector(width / 2 - 50, height / 2 - 50));
    this.points.push(createVector(width / 2 + 50, height / 2 + 50));
    this.points.push(createVector(width / 2 + 100, height / 2));
    this.closed = false;
    this.auto = false;
  }

  serialize() {
    return JSON.stringify({
      points: this.points.map(p => {
        return { x: p.x - width / 2, y: p.y - height / 2 };
      }),
      closed: this.closed
    });
  }

  loopIndex(i) {
    return (i + this.points.length) % this.points.length;
  }

  toggleClosed() {
    if (this.closed) {
      this.closed = false;
      this.points.pop();
      this.points.pop();
    } else {
      this.closed = true;
      const anchor1 = this.points[this.points.length - 1];
      const control1 = this.points[this.points.length - 2];
      const anchor2 = this.points[0];
      const control2 = this.points[1];
      const newControl1 = p5.Vector.lerp(anchor1, control1, -1);
      const newControl2 = p5.Vector.lerp(anchor2, control2, -1);
      this.points.push(newControl1, newControl2);
    }
  }

  numSegments() {
    return floor(this.points.length / 3);
  }

  getSegment(i) {
    return [
      this.points[this.loopIndex(i * 3 + 0)],
      this.points[this.loopIndex(i * 3 + 1)],
      this.points[this.loopIndex(i * 3 + 2)],
      this.points[this.loopIndex(i * 3 + 3)]
    ];
  }

  addSegment(x, y) {
    const prevAnchor = this.points[this.points.length - 2];
    const prevControl = this.points[this.points.length - 1];

    const anchor = createVector(x, y);
    const control1 = p5.Vector.lerp(prevControl, prevAnchor, -1);
    const control2 = p5.Vector.lerp(control1, anchor, 0.5);

    this.points.push(control1, control2, anchor);
  }

  movePoint(point, x, y, mode) {
    const i = this.points.indexOf(point);

    if (i % 3 == 0) {
      const dx = x - point.x;
      const dy = y - point.y;
      point.set(x, y);
      if (i - 1 >= 0 || this.closed) {
        this.points[this.loopIndex(i - 1)].add(dx, dy);
      }
      if (i + 1 < this.points.length || this.closed) {
        this.points[this.loopIndex(i + 1)].add(dx, dy);
      }
      if (mode == 'D') this.autoSetAllControlPoints();
    } else if (mode != 'D') {
      point.set(x, y);
      const anchorI = i % 3 == 1 ? i - 1 : i + 1;
      const otherI = i % 3 == 1 ? i - 2 : i + 2;
      if ((otherI >= 0 && otherI < this.points.length) || this.closed) {
        const anchor = this.points[this.loopIndex(anchorI)];
        const other = this.points[this.loopIndex(otherI)];
        if (mode == 'A') {
          const dist = p5.Vector.dist(anchor, other);
          const disp = p5.Vector.sub(anchor, point);
          disp.setMag(dist);
          other.set(p5.Vector.add(anchor, disp));
        } else if (mode == 'B') {
          other.set(p5.Vector.lerp(anchor, point, -1));
        }
      }
    }
  }

  autoSetControlPoint(anchorI, controlSpacing) {
    if ((anchorI - 3 < 0 || anchorI + 3 >= this.points.length) && !this.closed)
      return;

    const anchorLeftI = this.loopIndex(anchorI - 3);
    const anchorRightI = this.loopIndex(anchorI + 3);
    const anchor = this.points[anchorI];
    const anchorLeft = this.points[anchorLeftI];
    const anchorRight = this.points[anchorRightI];
    const dispLeft = p5.Vector.sub(anchorLeft, anchor);
    const dispRight = p5.Vector.sub(anchorRight, anchor);
    const magLeft = dispLeft.mag();
    const magRight = dispRight.mag();
    dispLeft.normalize();
    dispRight.normalize();
    const dirLeft = p5.Vector.sub(dispLeft, dispRight);
    const dirRight = p5.Vector.sub(dispRight, dispLeft);
    dirLeft.setMag(magLeft * controlSpacing);
    dirRight.setMag(magRight * controlSpacing);
    this.points[this.loopIndex(anchorI - 1)].set(
      p5.Vector.add(anchor, dirLeft)
    );
    this.points[this.loopIndex(anchorI + 1)].set(
      p5.Vector.add(anchor, dirRight)
    );
  }

  autoSetEdgePoints(controlSpacing) {
    if (this.closed) return;

    this.points[1].set(
      p5.Vector.lerp(this.points[0], this.points[2], controlSpacing)
    );
    this.points[this.points.length - 2].set(
      p5.Vector.lerp(
        this.points[this.points.length - 1],
        this.points[this.points.length - 3],
        controlSpacing
      )
    );
  }

  autoSetAllControlPoints(controlSpacing) {
    for (let i = 0; i < this.points.length; i += 3) {
      this.autoSetControlPoint(i, controlSpacing);
    }
    this.autoSetEdgePoints(controlSpacing);
  }

  render() {
    if (!this.auto) {
      for (let i = 0; i < this.numSegments(); i++) {
        const seg = this.getSegment(i);
        stroke(0);
        line(seg[0].x, seg[0].y, seg[1].x, seg[1].y);
        line(seg[2].x, seg[2].y, seg[3].x, seg[3].y);
      }
    }

    stroke(0, 255, 0);
    noFill();
    beginShape();
    vertex(this.points[0].x, this.points[0].y);
    for (let i = 0; i < this.numSegments(); i++) {
      const seg = this.getSegment(i);
      bezierVertex(seg[1].x, seg[1].y, seg[2].x, seg[2].y, seg[3].x, seg[3].y);
    }
    endShape();

    for (let i = 0; i < this.points.length; i++) {
      const p = this.points[i];
      if (i % 3 == 0) {
        noStroke();
        fill(255, 0, 0);
        circle(p.x, p.y, 10);
      } else if (!this.auto) {
        noStroke();
        fill(255);
        circle(p.x, p.y, 8);
      }
    }
  }
}
