// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
//Videos
//Part 1:
//https://www.youtube.com/watch?v=OJxEcs0w_kE
//Part 2: 
//https://www.youtube.com/watch?v=QQx_NmCIuCY

//This code is part 2 video of the challenge. 

Quadtree qtree;
public void setup (){
  size(400 ,400);
  background(0);
  Rectangle boundry =new Rectangle (width/2 , height/2 , width/2 , height/2);
  qtree = new Quadtree (boundry , 4);
  for (int i  = 0 ; i < 300 ; i++){
       float x = randomGaussian(width /2, width / 8);
       float y = randomGaussian(height / 2, height / 8);
       Point p = new Point (x,y);
       qtree.insert(p);
    }

}

public void draw (){
  background(0);
  qtree.show();
  
  ArrayList <Point> points = new ArrayList <Point> ();
  stroke(0 , 255 , 0);
  rectMode(CENTER);
  Rectangle range =new Rectangle (mouseX , mouseY , 25,25);
  strokeWeight(1);
  rect((float)range.x,(float) range.y,(float) range.width * 2, (float)range.height * 2);
  qtree.query(range , points);
  for (Point p : points) {
    strokeWeight(4);
    point((float)p.x, (float)p.y);
  }
} 
public float randomGaussian(float min , float max){
return min + randomGaussian() * (max - min);
}