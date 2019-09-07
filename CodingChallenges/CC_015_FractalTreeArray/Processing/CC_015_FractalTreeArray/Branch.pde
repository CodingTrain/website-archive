/**
* representing a Branch of the FractalTree
* @author Lukas Klassen
*/
class Branch{
  
  /**
  * Start and end Point of the Branch
  */
  public PVector begin;
  public PVector end;
  public boolean finished = false;
  
  /**
  * create Branch with beginning and end-Point 
  * @param beging Startpoint
  * @param end Endpoint
  */
  Branch(PVector begin, PVector end){
    this.begin = begin;
    this.end = end;
  }
  
  /**
  * jitters the Branch (randomly change the end-Point a bit)
  */
  void jitter(){
    end.x += random(-1, 1);
    end.y += random(-1, 1);
  }
  
  /**
  * displays the Branch
  */
  void show(){
    stroke(255);
    line(begin.x, begin.y, end.x, end.y);
  }
  
  /**
  * generates a new Branch for the right-side
  */
  Branch branchA(){
    PVector dir = PVector.sub(end, begin);
    dir.rotate(PI / 6);
    dir.mult(0.67);
    PVector newEnd = PVector.add(end, dir);
    Branch b = new Branch(end, newEnd);
    return b;
  }
  
  /**
  * generates a new Branch for the left-side
  */
  Branch branchB(){
    PVector dir = PVector.sub(end, begin);
    dir.rotate(- PI / 4);
    dir.mult(0.67);
    PVector newEnd = PVector.add(end, dir);
    Branch b = new Branch(end, newEnd);
    return b;
  }
  
  
}