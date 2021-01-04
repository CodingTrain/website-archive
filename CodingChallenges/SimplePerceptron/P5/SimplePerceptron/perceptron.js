// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Machine Learning
// Perceptron
// More: http://natureofcode.com/book/chapter-10-neural-networks/
// Video: https://youtu.be/ntKn5TPHHAk

class Perceptron {
  // Constructor
  constructor() {
    this.weights = [0, 0];
    this.lr = 0.1;
    // Initialize the weights randomly
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] = random(-1, 1);
    }
  }

  guess(inputs) {
    let sum = 0;
    for (let i = 0; i < this.weights.length; i++) {
      sum += inputs[i] * this.weights[i];
    }
    if (sum >= 0) {
      return 1;
    } else {
      return -1;
    }
  }

  train(inputs, target) {
    let guess = this.guess(inputs);
    let error = target - guess;
    // Tune all the weights
    for (var i = 0; i < this.weights.length; i++) {
      this.weights[i] += error * inputs[i] * this.lr;
    }
  }
}
