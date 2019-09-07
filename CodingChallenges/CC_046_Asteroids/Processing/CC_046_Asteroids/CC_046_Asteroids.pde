// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/hacZU523FyM
// Processing transcription: Chuck England

import java.util.*;

Ship ship;
List<Asteroid> asteroids = new ArrayList<Asteroid>();
List<Laser> lasers = new ArrayList<Laser>();

void setup() {
  fullScreen();
  ship = new Ship();
  for (int i = 0; i < 5; i++) {
    asteroids.add(new Asteroid());
  }
}

void draw() {
  background(0);

  for (int i = 0; i < asteroids.size(); i++) {
    Asteroid asteroid = asteroids.get(i);
    if (ship.hits(asteroid)) {
      println("ooops!");
    }
    asteroid.render();
    asteroid.update();
    asteroid.edges();
  }

  for (int i = lasers.size() - 1; i >= 0; i--) {
    Laser laser = lasers.get(i);
    laser.render();
    laser.update();
    if (laser.offscreen()) {
      lasers.remove(i);
    } else {
      for (int j = asteroids.size() - 1; j >= 0; j--) {
        Asteroid asteroid = asteroids.get(j);
        if (laser.hits(asteroid)) {
          if (asteroid.r > 10) {
            List<Asteroid> newAsteroids = asteroid.breakup();
            asteroids.addAll(newAsteroids);
          }
          asteroids.remove(j);
          lasers.remove(i);
          break;
        }
      }
    }
  }

  println(asteroids.size(), lasers.size());

  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
}

void keyReleased() {
  ship.setRotation(0);
  ship.boosting(false);
}

void keyPressed() {
  if (key == ' ') {
    lasers.add(new Laser(ship.pos, ship.heading));
  } else if (keyCode == RIGHT) {
    ship.setRotation(0.1);
  } else if (keyCode == LEFT) {
    ship.setRotation(-0.1);
  } else if (keyCode == UP) {
    ship.boosting(true);
  }
}
