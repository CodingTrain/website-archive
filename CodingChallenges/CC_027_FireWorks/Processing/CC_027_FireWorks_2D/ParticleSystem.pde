// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: 

// A class to describe a group of Particles
// An ArrayList is used to manage the list of Particles 

class Firework {

  ArrayList<Particle> particles;    // An arraylist for all the particles
  Particle firework;
  float hu;

  Firework() {
    hu = random(255);
    firework = new Particle(random(width), height, hu);
    particles = new ArrayList<Particle>();   // Initialize the arraylist
  }
  
  boolean done() {
    if (firework == null && particles.isEmpty()) {
      return true;
    } else {
      return false;
    }
  }

  void run() {
    if (firework != null) {
      fill(hu,255,255);
      firework.applyForce(gravity);
      firework.update();
      firework.display();

      if (firework.explode()) {
        for (int i = 0; i < 100; i++) {
          particles.add(new Particle(firework.location, hu));    // Add "num" amount of particles to the arraylist
        }
        firework = null;
      }
    }

    for (int i = particles.size()-1; i >= 0; i--) {
      Particle p = particles.get(i);
      p.applyForce(gravity);
      p.run();
      if (p.isDead()) {
        particles.remove(i);
      }
    }
  }


  // A method to test if the particle system still has particles
  boolean dead() {
    if (particles.isEmpty()) {
      return true;
    } else {
      return false;
    }
  }
}