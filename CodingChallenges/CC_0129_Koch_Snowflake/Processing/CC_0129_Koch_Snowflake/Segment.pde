// Coding Challenge 129: Koch Snowflake
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/129-koch-snowflake.html
// https://youtu.be/X8bXDKqMsXE
// https://editor.p5js.org/codingtrain/sketches/SJHcVCAgN

class Segment {
   PVector a;
   PVector b;
   
   Segment(PVector a_, PVector b_) {
     a = a_.copy();
     b = b_.copy();
   }
   
   Segment[] generate() {
     Segment[] children = new Segment[4];
     
     PVector v = PVector.sub(b,a);
     v.div(3);
     
     // Segment 0
     PVector b1 = PVector.add(a,v);
     children[0] = new Segment(a,b1);
     
     // Segment 3
     PVector a1 = PVector.sub(b,v);
     children[3] = new Segment(a1,b);
     
     v.rotate(-PI/3);
     PVector c = PVector.add(b1,v);
     // Segment 2
     children[1] = new Segment(b1, c);
     // Segment 3
     children[2] = new Segment(c, a1);
     return children;
   }
   
   void show() {
     stroke(255);
     line(a.x,a.y,b.x,b.y);
   }
  
}
