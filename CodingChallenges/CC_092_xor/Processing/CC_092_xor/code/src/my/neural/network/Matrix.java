package my.neural.network;
import java.io.Serializable;
import java.util.Arrays;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

public class Matrix implements Serializable, Cloneable
{
  int rows, cols;
  float[][] values;

  Matrix(int rows, int cols)
  {
    this.rows = rows;
    this.cols = cols;
    values = new float[this.rows][this.cols];
  }

  Matrix()
  {
    rows = 1;
    cols = 1;
    values = new float[rows][cols];
  }

  Matrix copy()
  {
    Matrix result = new Matrix(rows, cols);
    result.values = values.clone();
    return result;
  }

  static String[][] stringify(Matrix a)
  {
    String[][] result = new String[a.rows][a.cols];
    for (int i = 0; i < a.rows; i++)
    {
      for (int j = 0; j < a.cols; j++)
      {
        result[i][j] = i+" " + j+" " + a.values[i][j]+" ";
      }
    }
    return result;
  }

  void multiply(float n)
  {
    for (int i = 0; i < rows; i++)
    {
      for (int j = 0; j < cols; j++)
      {
        values[i][j] *= n;
      }
    }
  }

  void add(float n)
  {
    for (int i = 0; i < rows; i++)
    {
      for (int j = 0; j < cols; j++)
      {
        values[i][j] += n;
      }
    }
  }

  static Matrix Random(int rows, int cols)
  {
    Matrix result = new Matrix(rows, cols);
    result.randomize();
    return result;
  }

  void randomize()
  {
    for (int i = 0; i < rows; i++)
    {
      for (int j = 0; j < cols; j++)
      {
        values[i][j] = (float) Math.random() * 2 - 1;
      }
    }
  }

  static Matrix subtract(Matrix a, Matrix b)
  {
    Matrix result = new Matrix(a.rows, a.cols);
    for (int i = 0; i < a.rows; i++)
    {
      for (int j = 0; j < a.cols; j++)
      {
        result.values[i][j] = a.values[i][j] - b.values[i][j];
      }
    }

    return result;
  }

  static Matrix FromArray(float[] arr)
  {
    Matrix result = new Matrix(arr.length, 1);

    for (int i = 0; i < result.rows; i++)
    {
      result.values[i][0] = arr[i];
    }
    return result;
  }

  float[] toArray()
  {
    float[] arr = new float[rows+cols];
    for (int i = 0; i < rows; i++)
    {
      for (int j = 0; j < cols; j++)
      {
        arr[i] = values[i][j];
      }
    }
    return arr;
  }

  void add(Matrix other)
  {
    for (int i = 0; i < rows; i++)
    {
      for (int j = 0; j < cols; j++)
      {
        values[i][j] += other.values[i][j];
      }
    }
  }

  void multiply(Matrix other)
  {
    for (int i = 0; i < rows; i++)
    {
      for (int j = 0; j < cols; j++)
      {
        values[i][j] *= other.values[i][j];
      }
    }
  }

  public Matrix map(MatFunc func)
  {
    for (int r = 0; r < rows; r++)
    {
      for (int c = 0; c < cols; c++)
      {
        values[r][c] = func.perform(values[r][c], r, c);
      }
    }
    return this;
  }

  static Matrix transpose(Matrix a)
  {
    Matrix result = new Matrix(a.cols, a.rows);
    for (int i = 0; i < a.rows; i++)
    {
      for (int j = 0; j < a.cols; j++)
      {
        result.values[j][i] = a.values[i][j];
      }
    }
    return result;
  }

  static Matrix Product(Matrix first, Matrix second)
  {
    if (first.cols != second.rows)
    {
      return null;
    } else
    {
      Matrix a = first;
      Matrix b = second;
      Matrix result = new Matrix(a.rows, b.cols);
      for (int i = 0; i < result.rows; i++)
      {
        for (int j = 0; j < result.cols; j++)
        {
          float sum = 0;
          for (int k = 0; k < a.cols; k++)
          {
            sum += a.values[i][k] * b.values[k][j];
          }
          result.values[i][j] = sum;
        }
      }
      return result;
    }
  }

  public interface MatFunc
  {
    /**
     * This method takes the value at the current matrix row
     * and index and performs some operation on it. Then returns
     * what value should now be at that index.
     * 
     * @param val The value at the the current row and column
     * @param r The current row
     * @param c The current column
     * 
     * @return This should return the new value at the position
     */
    public float perform(float val, int r, int c);
  }

  public static MatFunc SIGMOID = new MatFunc()
  {
    @Override
      public float perform(float val, int r, int c)
    {
      return 1 / (1 + (float) Math.exp(-val));
    }
  };

  public static MatFunc SIGMOID_DERIVATIVE = new MatFunc()
  {
    @Override
      public float perform(float val, int r, int c)
    {
      return val * (1 - val);
    }
  };

  public static MatFunc TANH = new MatFunc()
  {
    @Override
      public float perform(float val, int r, int c)
    {
      return (float) Math.tanh(val);
    }
  };

  public static MatFunc TANH_DERIVATIVE = new MatFunc()
  {
    @Override
      public float perform(float val, int r, int c)
    {
      return 1 - val * val;
    }
  };
}
