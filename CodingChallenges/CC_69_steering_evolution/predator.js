var mr = 0.01;

function Predator(x, y, dna) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, -2);
    this.position = createVector(x, y);
    this.r = 4;
    this.maxforce = 0.5;
    this.health = 1;
    this.maxhealth = 1;

    this.dna = [];
    if (dna === undefined) {
        // MaxSpeed
        this.dna[0] = random(1, 6);

        // Prey perception
        this.dna[1] = random(90, 100);

        // Prey weight
        this.dna[2] = random(-2, 2);

    } else {
        // Mutation
        this.dna[0] = dna[0];
        this.dna[1] = dna[1];
        this.dna[2] = dna[2];
        if (random(1) < mr) {
            this.dna[0] += random(-1, 1);
        }
        if (random(1) < mr) {
            this.dna[1] += random(-0.1, 0.1);
        }
        if (random(1) < mr) {
            this.dna[2] += random(-0.1, 0.1);
        }
    }
    this.maxspeed = this.dna[0];

    // Method to update location
    this.update = function() {

        //var aux = this.dna[0] / 1000;
        this.health -= 0.002;

        // Update velocity
        this.velocity.add(this.acceleration);
        // Limit speed
        this.velocity.limit(this.maxspeed);
        this.position.add(this.velocity);
        // Reset accelerationelertion to 0 each cycle
        this.acceleration.mult(0);
    }

    this.applyForce = function(force) {
        // We could add mass here if we want A = F / M
        this.acceleration.add(force);
    }

    this.clone = function() {
        if (random(1) < 0.001) {
            return new Predator(this.position.x, this.position.y, this.dna);
        } else {
            return null;
        }
    }

    this.behaviors = function() {
        var steerG = this.eat(0.8, this.dna[1]);
        steerG.mult(this.dna[2]);
        this.applyForce(steerG);
    }


    this.eat = function(nutrition, perception) {
        var record = Infinity;
        var closest = null;
        for (var i = vehicles.length - 1; i >= 0; i--) {

            var d = this.position.dist(vehicles[i].position);
            if (d < this.maxspeed) {
                vehicles.splice(i, 1);
                if (this.health < this.maxhealth) {
                    this.health += nutrition;
                }
            } else {
                if (d < record && d < perception) {
                    record = d;
                    closest = vehicles[i].position;
                }
            }
        }

        // This is the moment of eating!

        if (closest != null) {
            return this.seek(closest);
        }

        return createVector(0, 0);
    }

    // A method that calculates a steering force towards a target
    // STEER = DESIRED MINUS VELOCITY
    this.seek = function(target) {

        var desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target

        // Scale to maximum speed
        desired.setMag(this.maxspeed);

        // Steering = Desired minus velocity
        var steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce); // Limit to maximum steering force

        return steer;
        //this.applyForce(steer);
    }

    this.dead = function() {
        return (this.health < 0)
    }

    this.display = function() {
        // Draw a triangle rotated in the direction of velocity
        var angle = this.velocity.heading() + PI / 2;

        push();
        translate(this.position.x, this.position.y);
        rotate(angle);


        if (debug.checked()) {
            strokeWeight(3);
            stroke(0, 255, 0);
            noFill();
            line(0, 0, 0, -this.dna[0] * 25);
            strokeWeight(2);
            ellipse(0, 0, this.dna[2] * 2);
            stroke(255, 0, 0);
            line(0, 0, 0, -this.dna[1] * 25);
            ellipse(0, 0, this.dna[3] * 2);
        }

        var gr = color(0, 0, 255);
        var rd = color(0, 0, 0);
        var col = lerpColor(rd, gr, this.health);

        fill(col);
        stroke(col);
        strokeWeight(1);
        beginShape();
        vertex(0, -this.r * 2);
        vertex(-this.r, this.r * 2);
        vertex(this.r, this.r * 2);
        endShape(CLOSE);

        pop();
    }


    this.boundaries = function() {
        var d = 25;

        var desired = null;

        if (this.position.x < d) {
            desired = createVector(this.maxspeed, this.velocity.y);
        } else if (this.position.x > width - d) {
            desired = createVector(-this.maxspeed, this.velocity.y);
        }

        if (this.position.y < d) {
            desired = createVector(this.velocity.x, this.maxspeed);
        } else if (this.position.y > height - d) {
            desired = createVector(this.velocity.x, -this.maxspeed);
        }

        if (desired !== null) {
            desired.normalize();
            desired.mult(this.maxspeed);
            var steer = p5.Vector.sub(desired, this.velocity);
            steer.limit(this.maxforce);
            this.applyForce(steer);
        }
    }
}
