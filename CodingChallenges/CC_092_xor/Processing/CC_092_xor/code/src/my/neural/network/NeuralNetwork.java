//float sigmoid(float x)
//{
//  return 1 / (1+(float)Math.exp(-x));
//}

//float dsigmoid(float y)
//{
//  return y * (1-y);
//}

//float tanh(float x)
//{
//  float y = (float) Math.tanh(x);
//  return y;
//}

//float dtanh(float x) 
//{
//  float y = 1 / (pow((float) Math.cosh(x), 2));
//  return y;
//}
package my.neural.network;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.OutputStream;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

import my.neural.network.Matrix.MatFunc;

public class NeuralNetwork
{
  int 
    inputNodes, 
    hiddenNodes, 
    outputNodes;

  double LearningRate = .1;

  Matrix 
    IHWeights, 
    HOWeights, 
    Hbias, 
    Obias, 
    input, 
    hidden, 
    output;

  ActivationFunction activationFunction;

  NeuralNetwork(NeuralNetwork copy)
  {
    inputNodes = copy.inputNodes;
    hiddenNodes = copy.hiddenNodes;
    outputNodes = copy.outputNodes;

    IHWeights = copy.IHWeights;
    HOWeights = copy.HOWeights;
    Hbias = copy.Hbias;
    Obias = copy.Obias;

    activationFunction = copy.activationFunction;
  }

  NeuralNetwork(int input, int hidden, int output)
  {
    inputNodes = input;
    hiddenNodes = hidden;
    outputNodes = output;

    IHWeights = Matrix.Random(hiddenNodes, inputNodes);
    HOWeights = Matrix.Random(outputNodes, hiddenNodes);
    Hbias = Matrix.Random(hiddenNodes, 1);
    Obias = Matrix.Random(outputNodes, 1);

    activationFunction = new ActivationFunction(Matrix.SIGMOID, Matrix.SIGMOID_DERIVATIVE);
  }

  NeuralNetwork(int input, int hidden, int output, float lr)
  {
    this(input, hidden, output);
    setLearingrate(lr);
  }

  void Save()
  {
  }

  NeuralNetwork copy()
  {
    return new NeuralNetwork(this);
  }


  //float mut(float val, float rate)
  //{
  //  if ((float)Math.random() < rate)
  //  {
  //    return val + randomGaussian()*.1;
  //  } else
  //  {
  //    return val;
  //  }
  //}

  //void mutate(float rate)
  //{
  //  for (int i = 0; i < output.rows; i++)
  //  {
  //    for (int j = 0; j < output.cols; j++)
  //    {
  //      float val = output.values[i][j];
  //      output.values[i][j] = mut(val, rate);
  //    }
  //  }
  //}

  void setLearingrate(float rate)
  {
    LearningRate = rate;
  }

  float[] feedforward(float[] inputArray)
  {
    input = Matrix.FromArray(inputArray);

    //generating hidden inputs
    hidden = Matrix.Product(IHWeights, input);
    hidden.add(Hbias);

    //activation function for hidden nodes!
    hidden = hidden.map(activationFunction.function);
    //for (int i = 0; i < hidden.rows; i++)
    //{
    //  for (int j = 0; j < hidden.cols; j++)
    //  {
    //    float val = hidden.values[i][j];
    //    hidden.values[i][j] = sigmoid(val);
    //  }
    //}

    //generating hidden output
    output = Matrix.Product(HOWeights, hidden);
    output.add(Obias);

    //activation function for ouput nodes!
    output = output.map(activationFunction.function);
    //for (int i = 0; i < output.rows; i++)
    //{
    //  for (int j = 0; j < output.cols; j++)
    //  {
    //    float val = output.values[i][j];
    //    output.values[i][j] = sigmoid(val);
    //  }
    //}

    //generating the output array
    return output.toArray();
  }

  void train(float[] inputArray, float[] targetArray)
  {
    feedforward(inputArray);

    Matrix targets = Matrix.FromArray(targetArray);
    Matrix outputErrors = Matrix.subtract(targets, output);

    //java version of matrix map function
    Matrix gradient = output.map(activationFunction.function);
    ;
    //for (int i = 0; i < gradient.rows; i++)
    //{
    //  for (int j = 0; j < gradient.cols; j++)
    //  {
    //    float val = gradient.values[i][j];
    //    gradient.values[i][j] = dsigmoid(val);
    //  }
    //}



    gradient.multiply(outputErrors);  //elementWise
    gradient.multiply((float)LearningRate);  //Scalar

    Matrix hiddenT = Matrix.transpose(hidden);
    Matrix DHOWeights = Matrix.Product(gradient, hiddenT);

    HOWeights.add(DHOWeights);

    Obias.add(gradient);

    Matrix HOWeightsT = Matrix.transpose(HOWeights);
    Matrix hiddenErrors = Matrix.Product(HOWeightsT, outputErrors);

    //java version of matrix map function
    Matrix hiddenGradient = hidden.map(activationFunction.function);
    //for (int i = 0; i < hiddenGradient.rows; i++)
    //{
    //  for (int j = 0; j < hiddenGradient.cols; j++)
    //  {
    //    float val = hiddenGradient.values[i][j];
    //    hiddenGradient.values[i][j] = dsigmoid(val);
    //  }
    //}

    hiddenGradient.multiply(hiddenErrors);
    hiddenGradient.multiply((float)LearningRate);

    Matrix inputT = Matrix.transpose(input);
    Matrix DIHWeights = Matrix.Product(hiddenGradient, inputT);

    IHWeights.add(DIHWeights);

    Hbias.add(hiddenGradient);

    //Print(outputs, "outputs");
    //Print(targets, "targets");
    //Print(error, "error");
  }

  public static class ActivationFunction
  {
    public final MatFunc function, derivative;

    public ActivationFunction(MatFunc function, MatFunc derivative)
    {
      this.function = function;
      this.derivative = derivative;
    }
  }
}
