// Coding Train
// Ported to processing by Max (https://github.com/TheLastDestroyer)
// Origional JS by Daniel Shiffman
// http://patreon.com/codingtrain
// Code for this video: https://www.youtube.com/watch?v=MY4luNgGfms

Wave[] fourierX;
Wave[] fourierY;
ArrayList<PVector> path = new ArrayList<PVector>();
float[] trainX;
float[] trainY;
float dt;
float time = 0;
int skip = 5;

void setup() {
  size(1000, 800);
  loadTrain();
  fourierX = dft(trainX);
  fourierY = dft(trainY);
  dt = TWO_PI / fourierX.length;
}

void loadTrain() {
  JSONArray train = loadJSONObject("train.json").getJSONArray("drawing");
  trainX = new float[train.size()/skip];
  trainY = new float[train.size()/skip];

  for (int i = 0; i < train.size()/skip; i+= 1) {
    trainX[i] = train.getJSONObject(i*skip).getFloat("x");
    trainY[i] = train.getJSONObject(i*skip).getFloat("y");
  }
}
void draw() {
  float[] vx = new float[2];
  float[] vy = new float[2];
  background(0);
  time += dt;
  if (time > TWO_PI){
  noLoop();
  }
  
  vx = epiCycles(width/2,100, fourierX, 0);
  line(vx[0], 0, vx[0], height);

  vy = epiCycles(100,height/2, fourierY, HALF_PI);
  line(0, vy[1], width, vy[1]);
  
  circle(vx[0], vy[1], 5);
  path.add(new PVector(vx[0], vy[1]));
  
  noFill();
  beginShape();
  for (PVector vertex : path) {
    vertex(vertex.x, vertex.y);
  }
  endShape();
}

float[] epiCycles(float x, float y, Wave[] waves, float rotation){
  float oldx;
  float oldy;
  float[] point = new float[2];
  for (int i = 0; i < waves.length; i++) {
    oldx = x;
    oldy = y;
    
    Wave wave = waves[i];
    PVector vec = wave.state(time, rotation);
    
    x += vec.x;
    y += vec.y;
    

    noFill();
    stroke(52);
    circle(oldx, oldy, wave.amplitude * 2);

    fill(255);
    stroke(255);
    line(oldx, oldy, x, y);
  }
  circle(x,y,5);
  point[0] = x;
  point[1] = y;
  return point;
}
