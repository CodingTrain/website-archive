Wave[] dft (float[] x) {
  int N = x.length;
  Wave[] X = new Wave[N];
  for (int k = 0; k < N; k++) {
    float re = 0;
    float im = 0;
    for (int n = 0; n < N; n++) {
      float phi = (TWO_PI * k * n) / N;
      re += x[n] * cos(phi);
      im -= x[n] * sin(phi);
    }
    re = re / N;
    im = im / N;

    float freq = k;
    float amp = sqrt(re * re + im * im);
    float phase = atan2(im, re);
    X[k] = new Wave(amp, freq, phase);
}
  
  return X;
}
