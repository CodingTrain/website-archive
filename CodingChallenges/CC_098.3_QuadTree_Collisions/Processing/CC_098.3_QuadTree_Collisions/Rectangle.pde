// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
//Videos
//Part 1:
//https://www.youtube.com/watch?v=OJxEcs0w_kE
//Part 2: 
//https://www.youtube.com/watch?v=QQx_NmCIuCY

//This code is part 2 video of the challenge. 


class Rectangle {
 double x;
 double y;
 double width;
 double height; 
 
 public Rectangle (double x , double y , double width , double height){
   this.x = x;
   this.y = y;
   this.width = width;
   this.height = height;
 }
  public boolean intersects(Rectangle range) {
    return !(range.x - range.width> this.x + this.width||
      range.x + range.width< this.x - this.width||
      range.y - range.height> this.y + this.height||
      range.y + range.height< this.y - this.height);
  }
     public boolean contains (Point p){
     return  p.x <= this.x+this.width &&
             p.x >= this.x-this.width &&
             p.y <= this.y+this.height &&
             p.y >= this.y-this.height ;
    }
}
