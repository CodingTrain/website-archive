// Solar System in Processing - Part 3 (3D textures)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/009-solarsystemgenerator3d-texture.html
// https://youtu.be/FGAwi7wpU8c
// https://editor.p5js.org/codingtrain/sketches/SD8a6k6A

class Planet {
  constructor(r, d, o, img) {
    this.v = p5.Vector.random3D();

    this.radius = r;
    this.distance = d;
    this.v.mult(this.distance);
    this.angle = random(TWO_PI);
    this.orbitspeed = o;

    this.planets = null;

    // Since there is no direct equivalent of PShape in p5.js, we have
    // to save the texture for later use instead of creating a globe.
    this.texture = img;
  }

  orbit() {
    this.angle = this.angle + this.orbitspeed;
    if (this.planets != null) {
      for (let i = 0; i < this.planets.length; i++) {
        this.planets[i].orbit();
      }
    }
  }

  spawnMoons(total, level) {
    this.planets = [];
    for (let i = 0; i < total; i++) {
      let r = this.radius / (level * 2);
      let d = random(this.radius + r, (this.radius + r) * 2);
      let o = random(-0.1, 0.1);
      let index = int(random(0, textures.length));
      this.planets[i] = new Planet(r, d, o, textures[index]);
      if (level < 2) {
        let num = int(random(0, 3));
        this.planets[i].spawnMoons(num, level + 1);
      }
    }
  }

  show() {
    push();
    noStroke();
    let v2 = createVector(1, 0, 1);
    let p = this.v.cross(v2);
    // Rotation around a 0-length axis doesn't work in p5.js, so don't do that.
    if (p.x != 0 || p.y != 0 || p.z != 0) {
      rotate(this.angle, p);
    }
    stroke(255);
    //line(0, 0, 0, this.v.x, this.v.y, this.v.z);
    //line(0, 0, 0, p.x, p.y, p.z);

    translate(this.v.x, this.v.y, this.v.z);
    noStroke();
    fill(255);
    // Since we don't have a PShape, we draw a textured sphere instead.
    texture(this.texture);
    sphere(this.radius);
    //ellipse(0, 0, this.radius * 2, this.radius * 2);
    if (this.planets != null) {
      for (let i = 0; i < this.planets.length; i++) {
        this.planets[i].show();
      }
    }
    pop();
  }
}
