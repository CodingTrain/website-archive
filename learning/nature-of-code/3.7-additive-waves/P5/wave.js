// Additive Waves
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/okfZRl4Xw-c
// https://thecodingtrain.com/learning/nature-of-code/3.7-additive-waves.html
// https://editor.p5js.org/codingtrain/sketches/qcRsZ_O5a

class Wave {
  constructor(amp, period, phase) {
    this.amplitude = amp;
    this.period = period;
    this.phase = phase;
  }

  evaluate(x) {
    return sin(this.phase + (TWO_PI * x) / this.period) * this.amplitude;
  }

  update() {
    this.phase += 0.05;
  }
}
