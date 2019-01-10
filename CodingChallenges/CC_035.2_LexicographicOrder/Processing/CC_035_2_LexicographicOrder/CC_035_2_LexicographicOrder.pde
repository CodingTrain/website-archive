// Coding Train
// Ported to processing by Max (https://github.com/TheLastDestroyer)
// Origional JS by Daniel Shiffman
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/goUlyp4rwiU

int[] vals = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};

void setup() {
  size(600, 300);
}

void draw() {
  print(vals);


  // STEP 1 of the algorithm
  // https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-ordering
  int largestI = -1;
  for (int i = 0; i < vals.length - 1; i++) {
    if (vals[i] < vals[i + 1]) {
      largestI = i;
    }
  }
  if (largestI == -1) {
    noLoop();
    print("finished");
  }

  // STEP 2
  int largestJ = -1;
  for (int j = 0; j < vals.length; j++) {
    if (vals[largestI] < vals[j]) {
      largestJ = j;
    }
  }

  // STEP 3
  swap(vals, largestI, largestJ);

  // STEP 4: reverse from largestI + 1 to the end
  int size = vals.length - largestI - 1;
  int[] endArray = new int[size];
  arrayCopy(vals, largestI + 1, endArray, 0, size);
  endArray = reverse(endArray);
  arrayCopy(endArray, 0, vals, largestI+1, size);
  background(0);
  textSize(64);
   String s = "";
  for (int i = 0; i < vals.length; i++) {
    s += vals[i];
  }
  fill(255);
  text(s, 20, height / 2);


}

void swap(int[] a, int i, int j) {
  int temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}
