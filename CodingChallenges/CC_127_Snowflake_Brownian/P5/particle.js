// Coding Challenge 127: Brownian Motion Snowflake
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/127-brownian-snowflake.html
// https://youtu.be/XUA8UREROYE
// https://editor.p5js.org/codingtrain/sketches/SJcAeCpgE

class Particle {
  constructor(radius, angle) {
    this.pos = p5.Vector.fromAngle(angle);
    this.pos.mult(radius);
    this.r = 3;
  }

  update() {
    this.pos.x -= 1;
    this.pos.y += random(-3, 3);

    let angle = this.pos.heading();
    angle = constrain(angle, 0, PI / 6);
    let magnitude = this.pos.mag();
    this.pos = p5.Vector.fromAngle(angle);
    this.pos.setMag(magnitude);
  }

  show() {
    fill(255);
    stroke(255);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }

  intersects(snowflake) {
    let result = false;
    for (let s of snowflake) {
      let d = dist(s.pos.x, s.pos.y, this.pos.x, this.pos.y);
      if (d < this.r * 2) {
        result = true;
        break;
      }
    }
    return result;
  }

  finished() {
    return this.pos.x < 1;
  }
}
