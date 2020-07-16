// Marching Squares Cave Generation
// Coding in the Cabana
// The Coding Train / David Snyder
// https://thecodingtrain.com/challenges/coding-in-the-cabana/005-marching-squares.html
// https://youtu.be/0ZONMNUKTfU
// https://editor.p5js.org/codingtrain/sketches/z4U3Luf7o

function forward() {
  return createVector(0, 1);
}

function right() {
  return createVector(1, 0);
}

class Node {
  constructor(pos) {
    this.pos = pos.copy();
    this.vertexindex = -1;
  }
}

class ControlNode extends Node {
  constructor(pos, active, size) {
    super(pos);
    this.active = active;
    this.size = size;
    this.above = new Node(
      p5.Vector.add(pos, p5.Vector.mult(forward(), size / 2))
    );
    this.right = new Node(
      p5.Vector.add(pos, p5.Vector.mult(right(), size / 2))
    );
  }
}

class Square {
  constructor(tl, tr, br, bl) {
    this.tl = tl;
    this.tr = tr;
    this.br = br;
    this.bl = bl;

    this.ct = tl.right;
    this.cr = br.above;
    this.cb = bl.right;
    this.cl = bl.above;
    this.config = 0;
    if (tl.active) this.config += 8;
    if (tr.active) this.config += 4;
    if (br.active) this.config += 2;
    if (bl.active) this.config += 1;
  }
}

function triSquare(square) {
  switch (square.config) {
    case 0:
      break;
    case 1:
      meshfromPoints([square.cb, square.bl, square.cl]);
      break;
    case 2:
      meshfromPoints([square.cr, square.br, square.cb]);
      break;
    case 4:
      meshfromPoints([square.ct, square.tr, square.cr]);
      break;
    case 8:
      meshfromPoints([square.tl, square.ct, square.cl]);
      break;

    case 3:
      meshfromPoints([square.cr, square.br, square.bl, square.cl]);
      break;
    case 6:
      meshfromPoints([square.ct, square.tr, square.br, square.cb]);
      break;
    case 9:
      meshfromPoints([square.tl, square.ct, square.cb, square.bl]);
      break;
    case 12:
      meshfromPoints([square.tl, square.tr, square.cr, square.cl]);
      break;
    case 5:
      meshfromPoints([
        square.ct,
        square.tr,
        square.ct,
        square.cb,
        square.bl,
        square.cl,
      ]);
      break;
    case 10:
      meshfromPoints([
        square.tl,
        square.ct,
        square.cr,
        square.br,
        square.cb,
        square.cl,
      ]);
      break;

    // 3 point:
    case 7:
      meshfromPoints([square.ct, square.tr, square.br, square.bl, square.cl]);
      break;
    case 11:
      meshfromPoints([square.tl, square.ct, square.cr, square.br, square.bl]);
      break;
    case 13:
      meshfromPoints([square.tl, square.tr, square.cr, square.cb, square.bl]);
      break;
    case 14:
      meshfromPoints([square.tl, square.tr, square.br, square.cb, square.cl]);
      break;

    // 4 point:
    case 15:
      meshfromPoints([square.tl, square.tr, square.br, square.bl]);
      break;
  }
}

function meshfromPoints(points) {
  assignVerts(points);
  if (points.length >= 3) {
    createTri(points[0], points[1], points[2]);
  }
  if (points.length >= 4) {
    createTri(points[0], points[2], points[3]);
  }
  if (points.length >= 5) {
    createTri(points[0], points[3], points[4]);
  }
  if (points.length >= 6) {
    createTri(points[0], points[4], points[5]);
  }
}

function assignVerts(points) {
  for (let i = 0; i < points.length; i++) {
    if (points[i].vertexindex == -1) {
      points[i].vertexindex = vertices.length;
      vertices.push(points[i].pos);
    }
  }
}

function createTri(a, b, c) {
  tris.push(a.vertexindex);
  tris.push(b.vertexindex);
  tris.push(c.vertexindex);
}

function generatemesh(ints, size) {
  vertices = [];
  tris = [];
  grid = new Grid(ints, scl);
  for (let x = 0; x < rows - 1; x++) {
    for (let y = 0; y < cols - 1; y++) {
      triSquare(grid.squares[x][y]);
    }
  }
}

class Grid {
  constructor(ints, size) {
    this.rows = ints.length;
    this.cols = ints[0].length;
    this.w = this.rows * size;
    this.h = this.cols * size;
    this.squares = create2DArray(this.rows - 1, this.cols - 1);

    this.cr = create2DArray(this.rows, this.cols);

    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.cols; y++) {
        let pos = createVector(x * size + size / 2, y * size + size / 2);
        this.cr[x][y] = new ControlNode(pos, ints[x][y] == 1, size);
      }
    }

    for (let x = 0; x < this.rows - 1; x++) {
      for (let y = 0; y < this.cols - 1; y++) {
        let c = this.cr;
        this.squares[x][y] = new Square(
          c[x][y + 1],
          c[x + 1][y + 1],
          c[x + 1][y],
          c[x][y]
        );
      }
    }
  }

  show() {
    for (let x = 0; x < this.rows - 1; x++) {
      for (let y = 0; y < this.cols - 1; y++) {
        fill(this.squares[x][y].tl.active ? 0 : 255);
        let pos = this.squares[x][y].tl.pos;
        rect(pos.x, pos.y, 4, 4);

        fill(this.squares[x][y].tr.active ? 0 : 255);
        pos = this.squares[x][y].tr.pos;
        rect(pos.x, pos.y, 4, 4);

        fill(this.squares[x][y].bl.active ? 0 : 255);
        pos = this.squares[x][y].bl.pos;
        rect(pos.x, pos.y, 4, 4);

        fill(this.squares[x][y].br.active ? 0 : 255);
        pos = this.squares[x][y].br.pos;
        rect(pos.x, pos.y, 4, 4);

        fill(51);
        pos = this.squares[x][y].ct.pos;
        rect(pos.x, pos.y, 2, 2);

        fill(51);
        pos = this.squares[x][y].cb.pos;
        rect(pos.x, pos.y, 2, 2);

        fill(51);
        pos = this.squares[x][y].cr.pos;
        rect(pos.x, pos.y, 2, 2);

        fill(51);
        pos = this.squares[x][y].cl.pos;
        rect(pos.x, pos.y, 2, 2);
      }
    }
  }
}
