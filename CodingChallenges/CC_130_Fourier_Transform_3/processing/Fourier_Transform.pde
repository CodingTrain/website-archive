/*---------------------------------------------------------------------------------------------------------------------------------------
 This Code is based on the coding challenge 130.x by Dan Shiffman
 Watch the videos at 
 Part 1: https://youtu.be/MY4luNgGfms  
 Part 2: https://youtu.be/n9nfTxp_APM  
 Part 3: https://thecodingtrain.com/CodingChallenges/130.3-fourier-transform-drawing.html
 This code is fundamentally very similar as the code in that challenge, but due to the limits of Processing
 There are many differences in the syntax of the code. There is Currently no way to draw a path from an image, like the coding train logo.
 I think it is possible to add this feature, but I don't know how.
 ---------------------------------------------------------------------------------------------------------------------------------------*/



//The states for switching between user drawing and fourier drawing
int USER = 0;
int FOURIER = 1;
int state = -1;
int epicycles;

//floating point variables
float diameter;
float amplitude;
float time;
float interval;
float frequency;
float phase;

//PVector variables
PVector pos;
PVector prev;

//arrays and arraylists
ArrayList<PVector> path;
ArrayList<PVector> drawing;
ArrayList<Complex> x;
ArrayList<Complex> Fourier;

void setup()
{
  fullScreen();

  //initialize the PVectors
  pos = new PVector();
  prev = new PVector();

  //initialize the ArrayLists
  x = new ArrayList<Complex>();
  Fourier = new ArrayList<Complex>();
  path = new ArrayList<PVector>();
  drawing = new ArrayList<PVector>();
}

void draw()
{
  background(51);
  stroke(255);
  noFill();

  //if the user is drawing
  if (state == USER)
  {
    PVector point = new PVector(mouseX-(width/2), mouseY-(height/2));
    drawing.add(point);
  } 

  //if the fourier transforms are drawing
  else if (state == FOURIER)
  {
    PVector vertex = showfourier(width/2, height/2, Fourier);

    path.add(vertex.copy());

    beginShape();
    for (int i = path.size()-1; i > 0; i--)
    {
      PVector p = path.get(i);
      vertex(p.x, p.y);
    }
    endShape();

    time += interval;

    if (time > TWO_PI)
    {
      time = 0;
      path.clear();
    }
    stroke(255, 25);
  }

  beginShape();
  for (PVector p : drawing)
  {
    vertex(p.x + width/2, p.y + height/2);
  }
  endShape();
}

//--shows the epicycles and the generates each point in the path drawn by them--//
PVector showfourier(float x, float y, ArrayList<Complex> fourier)
{
  pos.x = x;
  pos.y = y;
  interval = TWO_PI/fourier.size();

  for (int i = 0; i < fourier.size(); i++)
  {
    prev.x = pos.x;
    prev.y = pos.y;

    Complex epicycle = fourier.get(i);

    frequency = epicycle.freq;
    amplitude = epicycle.amp;
    phase = epicycle.phase;
    diameter = amplitude*2;

    float theta = frequency * time + phase;

    pos.x += amplitude * cos(theta);
    pos.y += amplitude * sin(theta); 
    noFill();
    stroke(255, 150);
    ellipse(prev.x, prev.y, diameter, diameter);
    stroke(255);
    line(prev.x, prev.y, pos.x, pos.y);
  }
  return new PVector(pos.x, pos.y);
}



//--User controls to start and finish drawing--//
void mousePressed()
{
  state = USER; 
  drawing.clear();
  path.clear();
  x.clear();
  time = 0;
}

void mouseReleased()
{
  state = FOURIER; 

  //the number of epicycles is the number of points in the drawing
  epicycles = drawing.size()-1;

  //increasing the skip reduces the resolution of the fourier drawn image
  int skip = 1;

  //Populate the x arraylist with all the points in the drawing
  if (skip > 0)  //<-- avoids accidental infinite loops
  {
    for (int i = 0; i < epicycles; i += skip)
    {
      PVector point = drawing.get(i);
      Complex c = new Complex(point.x, point.y);
      x.add(c);
    }

    //perform discrete fourier transform on the x arraylist and sort it by amplitude
    Fourier = dft(x);
    SortComplex(Fourier);
  }
}



//--selection sort algorithm for sorting complex numbers by amplitude--//
void SortComplex(ArrayList<Complex> c)
{
  int n = c.size();

  for (int i = 0; i < n-1; i++)
  {
    int mindex = i;

    for (int j = i+1; j < n; j++)
    {
      if (c.get(j).amp > c.get(mindex).amp)
        mindex = j;
    }
    swap(c, mindex, i);
  }
}

//simple algorithm to swap two items in an array
void swap(ArrayList<Complex> c, int i, int j)
{
  Complex temp = c.get(i);
  c.set(i, c.get(j));
  c.set(j, temp);
}
