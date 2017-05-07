

int n = 100;
int total = (n+2)*(n+2);

float dt = 1;

float[] u = new float[total];
float[] v = new float[total];
float[] u_prev = new float[total];
float[] v_prev = new float[total];
float[] dens = new float[total];
float[] dens_prev = new float[total];


int index(int i, int j) {
  i = constrain(i, 0, n+1);
  j = constrain(j, 0, n+1);
  return i + (n+2)*j;
}

PImage densityImg;

void setup() {
  size(600, 300); 
  densityImg = createImage(n+2, n+2, RGB);
}

void add_source (float[] vals, float[] source) {
  for (int i=0; i < total; i++) {
    vals[i] += dt*source[i];
  }
}

void mouseMoved() {
}


void draw() {
  background(0);

  if (mousePressed) {
    float[] source = new float[(n+2)*(n+2)];
    int i = index(mouseX/3, mouseY/3);
    source[i] = 1;
    add_source(dens, source);
  }
  diffuse(dens, dens_prev, 1, 0.5);
  swap(dens, dens_prev);
  advect(dens, dens_prev, u, v, 1);
  boundary();


  densityImg.loadPixels();
  for (int i = 0; i < densityImg.pixels.length; i++) {
    densityImg.pixels[i] = color(map(dens[i], 0, 0.01, 0, 255));
  }
  densityImg.updatePixels();  

  image(densityImg, 0, 0, width/2, height);
}

void mousePressed() {
  //printArray(dens);
}

void swap(float[] a, float[] b) {
  float[] temp = a;
  a = b;
  b = temp;
}


void diffuse(float[] vals, float[] prev, int b, float diff) {
  float a = dt * diff * n * n;
  for (int k = 0; k < 20; k++) {
    for (int i = 1; i <= n; i++) {
      for (int j = 1; j <= n; j++) {
        vals[index(i, j)] = (prev[index(i, j)] + 
          a*(vals[index(i-1, j)]+vals[index(i+1, j)]+
          vals[index(i, j-1)]+vals[index(i, j+1)]))/(1+4*a);
      }
    }
  }
}


void advect(float[] vals, float[] prev, float[] u, float[] v, int b) {
  float dt0 = dt*n;
  for (int i=1; i<=n; i++) {
    for (int j=1; j<=n; j++) {
      float x = i-dt0*u[index(i, j)]; 
      float y = j-dt0*v[index(i, j)];
      if (x<0.5) x=0.5; 
      if (x>n+0.5) x=n+0.5; 
      int i0=(int)x; 
      int i1=i0+1; 
      if (y<0.5) y=0.5; 
      if (y>n+0.5) y=n+0.5; 
      int j0=(int)y; 
      int j1=j0+1; 
      float s1 = x-i0; 
      float s0 = 1-s1; 
      float t1 = y-j0; 
      float t0 = 1-t1;
      vals[index(i, j)] = s0*(t0*prev[index(i0, j0)]+t1*prev[index(i0, j1)])+
        s1*(t0*prev[index(i1, j0)]+t1*prev[index(i1, j1)]);
    }
  }
  //set_bnd ( N, b, d );
}

void boundary() {
  for (int i = 0; i < n+1; i++) {
    dens[index(i, 0)] = 0;
    dens[index(0, i)] = 0;
    dens[index(i, n+1)] = 0;
    dens[index(n+1, i)] = 0;
  }
}