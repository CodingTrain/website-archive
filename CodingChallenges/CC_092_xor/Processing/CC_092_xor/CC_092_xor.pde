

NeuralNetwork brain;
trainingdata[] data = {
  new trainingdata(0, 1, 1), new trainingdata(1, 0, 1), new trainingdata(0, 0, 0), new trainingdata(1, 1, 0) 
};
Landscape land;
float theta;
void setup()
{
  size(400, 400);
  brain = new NeuralNetwork(2, 4, 1);
}

void draw()
{
  background(51);
  for (int i = 0; i < 10; i++)
  {
    for (int j = 0; j < data.length; j++)
    {
      int k = int(random(data.length));
      brain.train(data[k].inputs, data[k].target);
    }
  }

  float res = 10;
  float cols = width/res;
  float rows = height/res;
  for (float x = 0; x < cols; x++)
  {
    for (float y = 0; y < rows; y++)
    {
      float x1 = x/cols;
      float y1 = y/rows;
      float[] inputs = {x1, y1};
      float[] c = brain.feedforward(inputs);
      noStroke();
      fill(c[0]*255);
      rect(x*res, y*res, res, res);
    }
  }
}

void mouseClicked()
{
  Matrix test = Matrix.Random(2, 3); 
  String[][] tester = Matrix.stringify(test);
  Print(tester, "tester");
  saveStrings("test.txt", tester[0]);
}


void Print(Matrix a, String name)
{
  println(name);
  println("size", a.values.length, a.values[0].length);
  for (int i = 0; i < a.rows; i++)
  {
    for (int j = 0; j < a.cols; j++)
    {
      println(a.values[i][j]);//
    }
  }
  println("");
}

void Print(float[] a, String name)
{
  println(name);
  println("size", a.length);
  for (int i = 1; i < a.length; i++)
  {
    println(a[i-1]);
  }
  println("");
}

void Print(String[][] a, String name)
{
  println(name);
  println("size", a.length, a[0].length);
  for (int i = 0; i < a.length; i++)
  {
    for (int j = 0; j < a[0].length; j++)
      println(a[i][j]);
  }
  println("");
}
