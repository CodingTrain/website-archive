/* based on Coding Challenge #56: Attraction and Repulsion Forces I've turned the attractor object into a magnet object with a boolean property to make it a repeller or an attractor
depending if you press a key when clicking on the canvas or not, maybe this could be useful for someone*/

var Magnet;
var particles = [];
var magnets = [];
var roff = 6; //ofsetting the origin of my particles

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(100);
    for (var i = 0; i < 50; i++) {
        //particles.push(new Particle(width/2, height/2));
        //particles.push(new Particle(width/2 + random(-roff , roff ), height/2 + random(-roff , roff )));
        particles.push(new Particle(random(width), random(height)));
    }
    /*
    for (var i = 0; i < 10; i++) {
        magnets.push(new Magnet(random(width), random(height)));
    }
    */
}


function draw() {
    background(41);

    for (var i = 0; i < particles.length; i++) {
        for (var j = 0; j < magnets.length; j++) {
            magnets[j].show();
            particles[i].attracted(magnets[j]);
        }
        particles[i].update();
        particles[i].show();
    }
}

function mousePressed() {
  if(keyIsPressed === true){
    magnets.push(new Magnet(mouseX, mouseY, true));
  } else {
    magnets.push(new Magnet(mouseX, mouseY, false));
  }
}

// here's the constructor function for the magnets
function Magnet(x, y, t) {
    this.pos = createVector(x, y);
    this.repeller = t; // type of attractor


    this.show = function() {
        if (this.repeller === true) { // it's a repeller
            stroke(255, 0, 0);
            strokeWeight(4);
        } else {
            stroke(255);
            strokeWeight(4);
        }
        point(this.pos.x, this.pos.y);
    }
}

// here's the constructor function for the particles
function Particle(x, y) {
    this.pos = createVector(x, y);
    this.prev = createVector(x, y); // for previous positions
    this.vel = createVector(); 
    //this.vel = p5.Vector.random2D(); // randomize direction of initil velocity
    //this.vel.setMag(random(2, 5)); // randomize magnitude of initil velocity
    this.acc = createVector();

    this.update = function() {
        this.vel.add(this.acc);
        this.vel.limit(5);
        this.pos.add(this.vel);

        this.acc.mult(0); // resetting acc value to zero each time
    }

    this.show = function() {
        stroke(0, 255, 0);
        strokeWeight(1);
        line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);

        //saving the last positions
        this.prev.x = this.pos.x;
        this.prev.y = this.pos.y;
    }

    this.attracted = function(obj) {
        var force = p5.Vector.sub(obj.pos, this.pos); // getting the direction of the force; vector pointing from the obj to the attractor (obj)
        var dsquared = force.magSq(); // will give me the distance square I need for the gravitational attraction formula
        dsquared = constrain(dsquared, 5, 50);
        var G = 1; // 6.67408 totally arbitrary value
        var forceStrength = G / dsquared; // if we assume masses = 1; //THIS IS THE FORCE MAGNITUDE
        force.setMag(forceStrength); // setting the magnitude of the force according to the grav/attrac formula
        if (obj.repeller === true) {
            force.mult(-1); // REPULSION is just the OPPOSITE OF ATTRACTION
        }
        this.acc.add(force); // adding all the forces deriving from all the multiple attractors
    }

}

