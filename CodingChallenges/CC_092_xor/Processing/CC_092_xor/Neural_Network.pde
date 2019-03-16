// Daniel Shiffman
// http://codingtra.in

// XOR
// https://youtu.be/188B6k_F9jU

// Neural Network Library
// https://github.com/CodingTrain/Toy-Neural-Network-JS

float sigmoid(float x) {
  return 1 / (1+(float)Math.exp(-x));
}

float dsigmoid(float y) {
  return y * (1-y);
}

float tanh(float x) {
  float y = (float) Math.tanh(x);
  return y;
}

float dtanh(float x) {
  float y = 1 / (pow((float) Math.cosh(x), 2));
  return y;
}

class NeuralNetwork {
  int 
    inputNodes, 
    hiddenNodes, 
    outputNodes;

  float learningRate = 0.1;

  Matrix 
    ihWeights, 
    hoWeights, 
    hbias, 
    oBias, 
    input, 
    hidden, 
    output;

  NeuralNetwork(NeuralNetwork copy) {
    inputNodes = copy.inputNodes;
    hiddenNodes = copy.hiddenNodes;
    outputNodes = copy.outputNodes;

    ihWeights = copy.ihWeights;
    hoWeights = copy.hoWeights;
    hbias = copy.hbias;
    oBias = copy.oBias;
  }

  NeuralNetwork(int input, int hidden, int output) {
    inputNodes = input;
    hiddenNodes = hidden;
    outputNodes = output;

    ihWeights = Matrix.Random(hiddenNodes, inputNodes);
    hoWeights = Matrix.Random(outputNodes, hiddenNodes);
    hbias = Matrix.Random(hiddenNodes, 1);
    oBias = Matrix.Random(outputNodes, 1);
  }

  NeuralNetwork(int input, int hidden, int output, float lr) {
    this(input, hidden, output);
    setLearingrate(lr);
  }

  NeuralNetwork(Table t) {
  }

  void Save() {
  }

  NeuralNetwork copy() {
    return new NeuralNetwork(this);
  }


  float mut(float val, float rate) {
    if ((float)Math.random() < rate) {
      return val+randomGaussian()*.1;
    } else {
      return val;
    }
  }

  void mutate(float rate) {
    for (int i = 0; i < output.rows; i++) {
      for (int j = 0; j < output.cols; j++) {
        float val = output.values[i][j];
        output.values[i][j] = mut(val, rate);
      }
    }
  }

  void setLearingrate(float rate) {
    learningRate = rate;
  }

  float[] feedforward(float[] inputArray) {
    input = Matrix.fromArray(inputArray);

    //generating hidden inputs
    hidden = Matrix.Product(ihWeights, input);
    hidden.add(hbias);

    //activation function for hidden nodes!
    for (int i = 0; i < hidden.rows; i++) {
      for (int j = 0; j < hidden.cols; j++) {
        float val = hidden.values[i][j];
        hidden.values[i][j] = sigmoid(val);
      }
    }

    //generating hidden output
    output = Matrix.Product(hoWeights, hidden);
    output.add(oBias);

    //activation function for ouput nodes!
    for (int i = 0; i < output.rows; i++) {
      for (int j = 0; j < output.cols; j++) {
        float val = output.values[i][j];
        output.values[i][j] = sigmoid(val);
      }
    }

    //generating the output array
    return output.toArray();
  }

  void train(float[] inputArray, float[] targetArray) {
    feedforward(inputArray);

    Matrix targets = Matrix.fromArray(targetArray);
    Matrix outputErrors = Matrix.subtract(targets, output);

    //java version of matrix map function
    Matrix gradient = output.copy();
    for (int i = 0; i < gradient.rows; i++) {
      for (int j = 0; j < gradient.cols; j++) {
        float val = gradient.values[i][j];
        gradient.values[i][j] = dsigmoid(val);
      }
    }

    gradient.multiply(outputErrors);  //elementWise
    gradient.multiply(learningRate);  //Scalar

    Matrix hiddenT = Matrix.transpose(hidden);
    Matrix DhoWeights = Matrix.Product(gradient, hiddenT);

    hoWeights.add(DhoWeights);

    oBias.add(gradient);

    Matrix hoWeightsT = Matrix.transpose(hoWeights);
    Matrix hiddenErrors = Matrix.Product(hoWeightsT, outputErrors);

    //java version of matrix map function
    Matrix hiddenGradient = hidden.copy();
    for (int i = 0; i < hiddenGradient.rows; i++) {
      for (int j = 0; j < hiddenGradient.cols; j++) {
        float val = hiddenGradient.values[i][j];
        hiddenGradient.values[i][j] = dsigmoid(val);
      }
    }

    hiddenGradient.multiply(hiddenErrors);
    hiddenGradient.multiply(learningRate);

    Matrix inputT = Matrix.transpose(input);
    Matrix DihWeights = Matrix.Product(hiddenGradient, inputT);

    ihWeights.add(DihWeights);

    hbias.add(hiddenGradient);
  }
}
