// Coding Train
// http://thecodingtrain.com
// http://patreon.com/codingtrain

// Code for https://youtu.be/DhFZfzOvNTU
// Processing port by Max (https://github.com/TheLastDestroyer)

int current;
int step;
float scl;
float oldscl = 1;
IntList seen = new IntList();
ArrayList<Arc> Arcs = new ArrayList<Arc>();
int largest = 0;
int buffer = 10;

void setup(){
  //uncoment one of the below to either set the window size or use your full screen
  size(1920, 1080);
  //fullScreen();
  background(0);

  current = 0;
  seen.append(0);
  step = 1;
}

void draw(){
  println(current);
  translate(0, height/2);
  scale(scl);
  
  // only draws all arcs if scale has changed, otherwise only draws new one
  // improves performance
  if (oldscl != scl){
    oldscl = scl;
    background(0);
    for (Arc a : Arcs){
      a.show();
    }
  } else {
   Arcs.get(Arcs.size() - 1).show();
  }
  current = next();
}


int next(){
  int next = current - step;
  if (next < 0 || seen.hasValue(next)){
    next = current + step;
  }
  if (!seen.hasValue(next)){
    seen.append(next);
  }
  
  if (next > largest + buffer) {
    largest = next;
    scl = (float) width / (float) (largest + buffer);
  }
  
  Arcs.add(new Arc((float)(next + current)/ (float) 2, abs(current - next), step % 2)); 
  step ++;
  return next;
}

//not in origional code
void mousePressed(){
  saveFrame("Capture_###.png");
}
