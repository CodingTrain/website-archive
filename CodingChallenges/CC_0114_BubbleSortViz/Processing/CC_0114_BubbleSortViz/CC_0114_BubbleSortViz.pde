// Daniel Shiffman
// http://youtube.com/thecodingtrain
// http://codingtra.in

// Coding Challenge #114: Bubble Sort Visualization
// https://youtu.be/67k3I2GxTH8

float[] values;

int i = 0;
int j = 0;

void setup() {
  fullScreen(P2D);
  //size(800, 300);
  values = new float[width];
  for (int i = 0; i < values.length; i++) {
    values[i] = random(height);
    //values[i] = noise(i/100.0)*height;
  }


  //for (int i = 0; i < values.length; i++) {
  //  }
  //}
}

void draw() {
  background(0);

  if (i < values.length) {
    for (int j = 0; j < values.length-i-1; j++) {
      float a = values[j];
      float b = values[j+1];
      if (a > b) {
        swap(values, j, j+1);
      }
    }
  } else {
    println("finished");
    noLoop();
  }
  i++;

  for (int i = 0; i < values.length; i++) {
    stroke(255);
    line(i, height, i, height - values[i]);
  }
}

void swap(float[] arr, int a, int b) {
  float temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}
