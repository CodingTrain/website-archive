enum Move {

    // front
    f(Axis.Z, 1, 1), 
    F(Axis.Z, 1, -1), 

    // back
    b(Axis.Z, -1, 1), 
    B(Axis.Z, -1, -1), 

    // up
    u(Axis.Y, 1, 1), 
    U(Axis.Y, 1, -1), 

    // down
    d(Axis.Y, -1, 1), 
    D(Axis.Y, -1, -1), 

    // left
    l(Axis.X, -1, 1), 
    L(Axis.X, -1, -1), 

    // right
    r(Axis.X, 1, 1), 
    R(Axis.X, 1, -1), 

    ;

    private final Axis axis;
    private final int selector;
    private final int dir;
    private final static java.util.Random random = new java.util.Random();

    private Move(Axis axis, int selector, int dir) {

        this.axis = axis;
        this.selector = selector;
        this.dir = dir;
        
    }

    void applyTo(Cubie[] qbs) {
        axis.turn(qbs, selector, dir);
    }
    
    Move inverse() {
      
      switch(ordinal()%2){
        case 0: return Move.values()[ordinal()+1];
        case 1: return Move.values()[ordinal()-1];
        default: return null;
      }
      
    }

    // previous - allowed to be null
    // returns a random Move, not inverting the given previous Move  
    static Move nextRandom(Move previous) {
      
      Move nextMove;
      
      do {
      
        int randomIndex = random.nextInt(Move.values().length); 
        nextMove = Move.values()[randomIndex];
        
      } while (nextMove.inverse() == previous);

      return nextMove;
      
    }
    
    static Move parse(char c) {
      
      try {
        return Move.valueOf("" + c);        
      } catch (Exception e) {
        return null;
      }
      
    }
    
    
}
