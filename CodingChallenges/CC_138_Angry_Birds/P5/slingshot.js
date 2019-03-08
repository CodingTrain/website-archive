class SlingShot {
  constructor(x, y, body) {

    const options = {
      pointA: {
        x: x,
        y: y
      },
      bodyB: body,
      stiffness: 0.02,
      length: 40
    }
    this.sling = Constraint.create(options);
    World.add(world, this.sling);
  }

  fly() {
    
    this.sling.bodyB = null;
  }

  show() {
    if (this.sling.bodyB) {
      stroke(255);
      const posA = this.sling.pointA;
      const posB = this.sling.bodyB.position;
      line(posA.x, posA.y, posB.x, posB.y);
    }
  }
  
  attach(body) {
    this.sling.bodyB = body; 
  }


}