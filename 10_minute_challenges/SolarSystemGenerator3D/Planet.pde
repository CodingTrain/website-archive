class Planet {
  float radius;
  float distance;
  Planet[] planets;
  float angle;
  //float yangle;
  //float zangle;
  float orbitspeed;
  PVector v;

  Planet(float r, float d, float o) {
    radius = r;
    distance = d;
    
    v = PVector.random3D();
    v.mult(distance);
    angle = random(TWO_PI);
    //yangle = random(TWO_PI);
    //zangle = random(TWO_PI);
    orbitspeed = o;
    //println(angle);
  }

  void orbit() {
    angle = angle + orbitspeed; 
    //yangle = yangle + orbitspeed; 
    //zangle = zangle + orbitspeed; 
    if (planets != null) {
      for (int i = 0; i < planets.length; i++) {
        planets[i].orbit();
      }
    }
  }

  void spawnMoons(int total, int level) {
    planets = new Planet[total];
    for (int i = 0; i < planets.length; i++) {
      float r = radius/(level*1.2);
      float d = random(75, 200);
      float o = random(-0.1, 0.1);
      planets[i] = new Planet(r, d/level, o);
      if (level < 3) {
        int num = int(random(0,4));
        planets[i].spawnMoons(num, level+1);
      }
    }
  }

  void show() {
    pushMatrix();
    noStroke();
    fill(255);
    rotate(angle, v.x, v.y, v.z);
    //rotateX(xangle);
    //rotateY(yangle);
    //rotateZ(zangle);
    translate(v.y, v.x, v.z);
    sphere(radius);
    //ellipse(0, 0, radius*2, radius*2);
    if (planets != null) {
      for (int i = 0; i < planets.length; i++) {
        planets[i].show();
      }
    }
    popMatrix();
  }
}