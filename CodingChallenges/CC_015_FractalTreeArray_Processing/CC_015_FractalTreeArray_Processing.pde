/**
* makes a FractalTree using Array(Lists)
* adds one Level per MouseClick
* at Level 6 Leaves will fall down
* @author Lukas Klassen
* translated version of CC_015_FractalTreeArray by Daniel Shiffmann
*/


/**
* global reference to Trees, Leaves and the amount of Levels
*/
ArrayList<Branch> tree = new ArrayList<Branch>();
ArrayList<PVector> leaves = new ArrayList<PVector>();
int count = 0;

/**
* sets the Tree up
*/
void setup(){
  size(400,400);
  //create root-Branch
  PVector a = new PVector(width / 2, height);
  PVector b = new PVector(width / 2, height - 100);
  Branch root = new Branch(a, b); 
  tree.add(root);
}

/**
* adds another Layer every time the Mouse is pressed
*/
void mousePressed(){
  for(int i = tree.size() -1; i >= 0; i--){
    Branch current = tree.get(i);
    //if the current Branch has no children: add them
    if(!current.finished){
      tree.add(current.branchA());
      tree.add(current.branchB());
    }
    //now that Branch has children
    current.finished = true;
  }
  //new Level added
  count ++;
  
  //on the 6. Level: spawn the Leaves
  if(count == 6){
    for(int i = 0; i < tree.size(); i++){
      Branch current = tree.get(i);
      //if the current Branch is on the last Level
      if(!current.finished){
        PVector leaf = current.end.copy();
        leaves.add(leaf);
      }
    }
  }
    
}

/**
* Displays the Tree
*/
void draw(){
  background(51);
  
  //forEach Branch of the Tree: Draw it
  for(int i = 0; i < tree.size(); i++){
    tree.get(i).show();
  }
  
  //forEach Leave: draw it
  for(int i = 0; i < leaves.size(); i++){
    fill(255, 0, 100, 100);
    noStroke();
    PVector leave = leaves.get(i);
    ellipse(leave.x, leave.y, 8, 8);
    //let the Leave fall
    leave.y += random(0, 2);
  }
}