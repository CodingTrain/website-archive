// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/146-rendering-ray-casting.html
// https://youtu.be/vYgIKn7iDH8

// Rendering Ray Casting
// https://editor.p5js.org/codingtrain/sketches/yEzlR0_zq

class Particle {
  float fov;
  PVector pos;
  ArrayList<Ray> rays;
  float heading;
  
  Particle() {
    //this.fov = 45; // original code
    fov = 60; // fisheye fix
    pos = new PVector(sceneW / 2, sceneH / 2);
    rays = new ArrayList<>();;
    heading = 0;
    for (float a = -fov / 2; a < fov / 2; a++) {
      rays.add(new Ray(pos, radians(a)));
    }
  }

  void updateFOV(float fov) {
    this.fov = fov;
    rays = new ArrayList<>();
    for (float a = -fov / 2; a < fov / 2; a++) {
      rays.add(new Ray(pos, radians(a) + heading));
    }
  }

  void rotate(float angle) {
    heading += angle;
    int index = 0;
    for (float a = -fov / 2; a < fov / 2; a++) {
      rays.get(index).setAngle(radians(a) + heading);
      index++;
    }
  }

  void move(float amt) {
    PVector vel = PVector.fromAngle(heading);
    vel.setMag(amt);
    pos.add(vel);
  }

  void update(float x, float y) {
    pos.set(x, y);
  }

  ArrayList<Float> look(ArrayList<Boundary> walls) {
    ArrayList<Float> scene = new ArrayList<>();
    for (int i = 0; i < rays.size(); i++) {
      Ray ray = rays.get(i);
      PVector closest = null;
      float record = Float.MAX_VALUE;
      for (Boundary wall : walls) {
        PVector pt = ray.cast(wall);
        if (pt != null) {
          float d = PVector.dist(pos, pt);
          float a = ray.dir.heading() - heading;
          if (!mousePressed) {
            d *= cos(a);
          }
          if (d < record) {
            record = d;
            closest = pt;
          }
        }
      }
      if (closest != null) {
        // colorMode(HSB);
        // stroke((i + frameCount * 2) % 360, 255, 255, 50);
        stroke(255, 100);
        line(pos.x, pos.y, closest.x, closest.y);
      }
      scene.add(record);
    }
    return scene;
  }

  void show() {
    fill(255);
    circle(pos.x, pos.y, 4);
    for (Ray ray : rays) {
      ray.show();
    }
  }
}
