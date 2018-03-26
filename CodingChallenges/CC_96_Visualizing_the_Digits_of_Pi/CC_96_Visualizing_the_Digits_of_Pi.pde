String pi;
int[] digits;
int[] counts = new int[10];
int index = 0;

void setup() {
  size(400, 400);
  pi = loadStrings("pi-1million.txt")[0];

  //println(pi.length());
  String[] sdigits = pi.split("");

  //println(sdigits.length);
  digits = int(sdigits);

  //printArray(digits);
}

void draw() {
  background(0);
  translate(width/2, height/2);
  
  int currentDigit = digits[index];
  index ++;
  counts[currentDigit]++;

  float w = width / counts.length;
  for (int i = 0; i < counts.length; i++) {
    //First viz by Dan
    //float x = i * w;
    //float y = height/2;
    //float d = counts[i];
    
    //Second viz by Dan
    float a = map(i, 0, counts.length, 0, TWO_PI);
    float x = 200 * cos(a);
    float y = 200 * sin(a);
    float d = counts[i];
    
    ellipse(x,y,d,d);
  }
}