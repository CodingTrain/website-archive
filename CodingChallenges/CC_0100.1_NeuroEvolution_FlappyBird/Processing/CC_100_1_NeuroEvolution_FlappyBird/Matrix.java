class Matrix{
  int rows, cols;
  float[][] values;

  Matrix(int rows, int cols){
    this.rows = rows;
    this.cols = cols;
    values = new float[this.rows][this.cols];
  }

  Matrix(){
    rows = 1;
    cols = 1;
    values = new float[rows][cols];
  }

  Matrix copy(){
    Matrix result = new Matrix(rows, cols);
    for (int i = 0; i < rows; i++) {
      for (int j = 0; j < cols; j++) {
        result.values[i][j] = values[i][j];
      }
    }
    return result;
  }

  static String[][] stringify(Matrix a){
    String[][] result = new String[a.rows][a.cols];
    for (int i = 0; i < a.rows; i++){
      for (int j = 0; j < a.cols; j++){
        result[i][j] = i+" " + j+" " + a.values[i][j]+" ";
      }
    }
    return result;
  }

  void multiply(float n){
    for (int i = 0; i < rows; i++){
      for (int j = 0; j < cols; j++){
        values[i][j] *= n;
      }
    }
  }

  void add(float n){
    for (int i = 0; i < rows; i++){
      for (int j = 0; j < cols; j++){
        values[i][j] += n;
      }
    }
  }

  static Matrix random(int rows, int cols){
    Matrix result = new Matrix(rows, cols);
    result.randomize();
    return result;
  }

  void randomize(){
    for (int i = 0; i < rows; i++){
      for (int j = 0; j < cols; j++){
        values[i][j] = (float) Math.random() * 2 - 1;
      }
    }
  }

  static Matrix subtract(Matrix a, Matrix b){
    Matrix result = new Matrix(a.rows, a.cols);
    for (int i = 0; i < a.rows; i++){
      for (int j = 0; j < a.cols; j++){
        result.values[i][j] = a.values[i][j] - b.values[i][j];
      }
    }

    return result;
  }

  static Matrix FromArray(float[] arr){
    Matrix result = new Matrix(arr.length, 1);
    for (int i = 0; i < result.rows; i++){
      result.values[i][0] = arr[i];
    }
    return result;
  }

  float[] toArray(){
    float[] arr = new float[rows+cols];
    for (int i = 0; i < rows; i++){
      for (int j = 0; j < cols; j++){
        arr[i] = values[i][j];
      }
    }
    return arr;
  }

  void add(Matrix other){
    for (int i = 0; i < rows; i++){
      for (int j = 0; j < cols; j++){
        values[i][j] += other.values[i][j];
      }
    }
  }

  void multiply(Matrix other){
    for (int i = 0; i < rows; i++){
      for (int j = 0; j < cols; j++){
        values[i][j] *= other.values[i][j];
      }
    }
  }

  static Matrix transpose(Matrix a){
    Matrix result = new Matrix(a.cols, a.rows);
    for (int i = 0; i < a.rows; i++){
      for (int j = 0; j < a.cols; j++){
        result.values[j][i] = a.values[i][j];
      }
    }
    return result;
  }

  static Matrix Product(Matrix first, Matrix second){
    if (first.cols != second.rows){
      return null;
    } else{
      Matrix a = first;
      Matrix b = second;
      Matrix result = new Matrix(a.rows, b.cols);
      for (int i = 0; i < result.rows; i++){
        for (int j = 0; j < result.cols; j++){
          float sum = 0;
          for (int k = 0; k < a.cols; k++){
            sum += a.values[i][k] * b.values[k][j];
          }
          result.values[i][j] = sum;
        }
      }
      return result;
    }
  }
}
