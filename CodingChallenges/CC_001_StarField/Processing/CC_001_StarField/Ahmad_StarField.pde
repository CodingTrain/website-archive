//intialize an array of stars
Stars[] stars = new Stars[100];
//make a global variable for the speed of the stars
float speed = 100;
//make a variable to keep track of which state the animation is in (menu vs animation)
boolean state = false;


void setup(){
  //set the size of the window
  size(600,600);
  //create the stars
  for(int i = 0; i < stars.length; i++){
    stars[i] = new Stars();
  }
}
void draw(){
  
  
  
  
  if(state == false){
    //this means the animation has not started
    background(0); //clear the background so that text does not overlap and become blurry
    textAlign(CENTER);
    textSize(25);
    fill(255);
    text("Welcome! \n\nThis is an animation of a starfield. \n\nAs you bring your mouse closer to the\n center the stars move faster.\n\nPress space to start.",width/2, height/4);
    if(key == ' '){
      state = true;
    }
  }
  if(state == true){
    //We only run the animation after the user has started it
    
    
    //make the backgroud black (this also clears the windom)
    background(0);
    //move the orgin to the center (so that 0,0 is at the center)
    translate(width/2, height/2);
    //increase thee speed proportional to the mouse's distance from the center location
    speed = map(dist(mouseX,mouseY,width/2,width/2),0,width,100,1000);
  
    //update and display each star object
    for(int i = 0; i < stars.length; i++){
      stars[i].update();
      stars[i].display();
    }
    
  }
}



//Star Class ---------------------------------------------------------------------------------------------------------------



class Stars{
  //create a vectors to keep track of location,accelaration, and velocity
  PVector Pos = new PVector(random(-width/20,width/20),random(-height/20,height/20));
  PVector PosOrig = Pos.get();
  PVector Vel = new PVector(0,0);
  PVector Acc = new PVector(Pos.x/speed,Pos.y/speed);
  
  //make a variable to keep track of the star's size
  float size = 10;
  
  void update(){
    //set acceleration vector
    PVector Acc = new PVector(PosOrig.x/speed,PosOrig.y/speed);
    //move star according to acceleration and velocity
    Vel.add(Acc);
    Pos.add(Vel);
    //reset position once the star leaves the screen
    if (Pos.x > width /2 || Pos.x < -width/2 || Pos.y > height / 2 || Pos.y < -height/2){
      Pos = new PVector(random(-width/20,width/20),random(-height/20,height/20));
      PosOrig = Pos.get();
      Acc.x = Pos.x/speed;
      Acc.y = Pos.y/speed;
      Vel.x = 0;
      Vel.y = 0;
    }
    //vary the size of the star depending on it's distance from the center
    size = abs(dist(0,0,Pos.x,Pos.y)) / 100;
  }
  void display(){
    //display each star and a trail behind it with less opacity
    noStroke();
    fill(255);
    ellipse(Pos.x,Pos.y,size,size);
    stroke(125,15);
    line(Pos.x,Pos.y,Pos.x - Pos.x , Pos.y - Pos.y);
  }
}
