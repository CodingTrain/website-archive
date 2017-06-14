// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Machine Learning
// Perceptron
// More: http://natureofcode.com/book/chapter-10-neural-networks/
// Video: https://youtu.be/ntKn5TPHHAk

// The activation function
int sign(float n) {
  if (n >= 0) {
    return 1;
  } else {
    return -1;
  }
}


class Perceptron {
  float[] weights = new float[2];
  float lr = 0.1;

  // Constructor
  Perceptron() {
    // Initialize the weights randomly
    for (int i = 0; i < weights.length; i++) {
      weights[i] = random(-1, 1);
    }
  }

  int guess(float[] inputs) {
    float sum = 0;
    for (int i = 0; i < weights.length; i++) {
      sum += inputs[i]*weights[i];
    }
    int output = sign(sum);
    return output;
  }

  void train(float[] inputs, int target) {
    int guess = guess(inputs);
    int error = target - guess;
    // Tune all the weights
    for (int i = 0; i < weights.length; i++) {
      weights[i] += error * inputs[i] * lr;
    }
  }
}
