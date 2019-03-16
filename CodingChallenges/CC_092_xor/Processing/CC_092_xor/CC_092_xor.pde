// Daniel Shiffman
// http://codingtra.in

// XOR
// https://youtu.be/188B6k_F9jU

// Neural Network Library
// https://github.com/CodingTrain/Toy-Neural-Network-JS


NeuralNetwork Brain;
trainingdata[] data = {
  new trainingdata(0, 1, 1), new trainingdata(1, 0, 1), new trainingdata(0, 0, 0), new trainingdata(1, 1, 0) 
};
float theta;
void setup() {
  size(400, 400);
  Brain = new NeuralNetwork(2, 4, 1);
}

void draw() {
  background(51);
  for (int i = 0; i < 10; i++) {
    for (int j = 0; j < data.length; j++) {
      int k = int(random(data.length));
      Brain.train(data[k].inputs, data[k].target);
    }
  }

  float res = 10;
  float cols = width/res;
  float rows = height/res;
  for (float x = 0; x < cols; x++) {
    for (float y = 0; y < rows; y++) {
      float x1 = x/cols;
      float y1 = y/rows;
      float[] inputs = {x1, y1};
      float[] c = Brain.feedforward(inputs);
      noStroke();
      fill(c[0]*255);
      rect(x*res, y*res, res, res);
    }
  }
}
