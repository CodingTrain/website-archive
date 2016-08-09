// Find the largest x such that P[x]<P[x+1].
// (If there is no such x, P is the last permutation.)
// Find the largest y such that P[x]<P[y].
// Swap P[x] and P[y].
// Reverse P[x+1 .. n].
// https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-ordering

int[] order = new int[15];

PVector[] path = new PVector[order.length];

float percent = 0;
// ArrayList<int[]> permutations = new ArrayList<int[]>();

long factorial(long n) {
  if (n == 1) {
    return 1;
  }
  return n * factorial(n-1);
} 

int count = 0;

int[] best;
float record = -1;
long total;
long num;

void setup() {
  size(480, 360);
  randomSeed(5);
  for (int i = 0; i < order.length; i++) {
    order[i] = i;
  }
  for (int i = 0; i < path.length; i++) {
    path[i] = new PVector(random(width), random(32, height));
  }

  total = factorial((long)order.length);
  //println(total);
  thread("bruteforce");
}


void bruteforce() {
  while (true) {
    int[] neworder = new int[order.length];
    arraycopy(order, neworder);

    int largest1 = -1;
    for (int i = 0; i < order.length-1; i++) {
      if (order[i] < order[i+1] && i > largest1) {
        largest1 = i;
      }
    }

    if (largest1 == -1) {
      break;
    }

    int largest2 = 0;
    for (int i = 0; i < order.length; i++) {
      if (order[largest1] < order[i] && i > largest2) {
        largest2 = i;
      }
    }

    swap(neworder, largest1, largest2);
    reverse(neworder, largest1+1);
    //permutations.add(neworder);
    order = neworder;
    //output(order);
    count++;

    float d = sumDistance(order, path);
    if (record < 0 || d < record) {
      record = d;
      best = order;
    }
    num = total / count;
    //println(p);
    percent = 100.0 / num;
  }
}

void output(int[] a) {
  for (int i = 0; i < a.length; i++) {
    print(a[i]);
  }
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



float sumDistance(int[] order, PVector[] path) {
  float sum = 0;
  for (int i = 0; i < path.length-1; i++) {
    PVector a = path[order[i]];
    PVector b = path[order[i+1]];
    //float d = PVector.dist(a, b);
    float d = distSq(a.x, a.y, b.x, b.y);
    sum += d;
  }
  return sum;
}

float distSq(float x1, float y1, float x2, float y2) {
  return (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1);
}

void draw() {
  background(0);
  beginShape();
  noFill();
  stroke(255);
  strokeWeight(2);
  for (int i = 0; i < best.length; i++) {
    PVector v = path[best[i]];
    vertex(v.x, v.y);
  }
  endShape();

  for (int i = 0; i < best.length; i++) {
    PVector v = path[best[i]];
    fill(255);
    ellipse(v.x, v.y, 8, 8);
  }

  fill(255);
  textSize(24);
  text(nf(percent,0,10) + "% completed", 10, 32);
}