// Daniel Shiffman
// http://youtube.com/thecodingtrain
// http://codingtra.in
// JavaScript transcription: Chuck England

// Coding Challenge #113: 4D Hypercube
// https://youtu.be/XE3YDVdQSPo

// Matrix Multiplication
// https://youtu.be/tzsgS19RRc8

class P4Vector {
  constructor(x, y, z, w) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.w = w || 0;
  }

  mult(f) {
    this.x *= f;
    this.y *= f;
    this.z *= f;
    this.w *= f;
  }
}
