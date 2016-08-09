//Find the largest x such that P[x]<P[x+1].
//(If there is no such x, P is the last permutation.)
//Find the largest y such that P[x]<P[y].
//Swap P[x] and P[y].
//Reverse P[x+1 .. n].

// https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-ordering


int[] order = new int[13];
int total;

// ArrayList<int[]> permutations = new ArrayList<int[]>();

int factorial(int n) {
  if (n == 1) {
    return 1;
  }
  return n * factorial(n-1);
} 

int count = 0;

void setup() {
  size(640, 360);
  for (int i = 0; i < order.length; i++) {
    order[i] = i;
  }
  total = factorial(order.length);

  //output(order);
  //permutations.add(order);
}

void draw() {
  background(0);
  //while (true) {
  int[] neworder = new int[order.length];
  arraycopy(order, neworder);

  int largest1 = -1;
  for (int i = 0; i < order.length-1; i++) {
    if (order[i] < order[i+1] && i > largest1) {
      largest1 = i;
    }
  }

  if (largest1 == -1) {
    //break;
    noLoop();
  }

  int largest2 = 0;
  for (int i = 0; i < order.length; i++) {
    if (order[largest1] < order[i] && i > largest2) {
      largest2 = i;
    }
  }

  swap(neworder, largest1, largest2);
  reverse(neworder, largest1+1);
  //output(neworder);
  //permutations.add(neworder);
  order = neworder;
  
  output(order);
  
  float per = float(count) / total;
  //}
}

void output(int[] a) {
  String txt = "";
  for (int i = 0; i < a.length; i++) {
    txt += a[i] + " ";
    //print(a[i]);
  }
  fill(255);
  textSize(32);
  text(txt, 20, height/2);
  println();
}

void reverse(int[] a, int start) {
  int[] chunk = new int[a.length-start];
  System.arraycopy(a, start, chunk, 0, chunk.length);
  chunk = reverse(chunk);
  System.arraycopy(chunk, 0, a, start, chunk.length);
}


void swap(int[] a, int i, int j) {
  int temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}