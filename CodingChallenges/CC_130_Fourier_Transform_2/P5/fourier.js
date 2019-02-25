// Coding Challenge 130: Drawing with Fourier Transform and Epicycles
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/130.2-fourier-transform-drawing.html
// https://youtu.be/n9nfTxp_APM
// https://editor.p5js.org/codingtrain/sketches/jawHqwfda

function dft(x) {
  const X = [];
  const N = x.length;
  for (let k = 0; k < N; k++) {
    let re = 0;
    let im = 0;
    for (let n = 0; n < N; n++) {
      const phi = (TWO_PI * k * n) / N;
      re += x[n] * cos(phi);
      im -= x[n] * sin(phi);
    }
    re = re / N;
    im = im / N;

    let freq = k;
    let amp = sqrt(re * re + im * im);
    let phase = atan2(im, re);
    X[k] = { re, im, freq, amp, phase };
  }
  return X;
}
