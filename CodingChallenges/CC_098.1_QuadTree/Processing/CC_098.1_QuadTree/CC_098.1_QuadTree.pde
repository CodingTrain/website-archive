// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
//Videos
//Part 1:
//https://www.youtube.com/watch?v=OJxEcs0w_kE
//Part 2: 
//https://www.youtube.com/watch?v=QQx_NmCIuCY

//This code is only part 1 video of the challenge. 

Quadtree qtree;
public void setup (){

size(400 ,400);
background(0);
  qtree = new Quadtree (new Rectangle (width/2 , height/2 , width/2 , height/2) , 4);
}

public void draw (){
  if(mousePressed){
    for (int i  = 0 ; i < 5 ; i++){
       qtree.insert(new Point ( mouseX +random(-5,5) , mouseY+random(-5,5)));
    }
  }
  qtree.show();

  
} 