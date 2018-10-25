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
 double height ; 
 double width;
 
 public Rectangle (double x , double y , double height , double width){
   this.x = x;
   this.y = y;
   this.height = height;
   this.width = width;
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