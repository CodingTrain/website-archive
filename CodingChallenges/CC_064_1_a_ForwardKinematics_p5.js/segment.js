class Segment {
    /* Unlike in Java, JavaScript does not have implement
     * function overloading, which means we cannot simply have
     * two different constructors for our Segment class as Shiffman does in
     * his pde example. Instead, we must have one constructor function
     * which behaves differently depending on the type of arguments we pass.
     */
    constructor(point, len, angle) {
        if (point.hasOwnProperty("angle")) { // point is probably a Segment
            this.par = point;
            this.a = new p5.Vector(this.par.b.x, this.par.b.y);
        } else {
            this.par = false;
            this.a = point;
        }
        this.len = len;
        this.angle = angle;
        this.selfAngle = angle;
        this.calculateB();

        this.xoff = random(1000);
    }

    wiggle() {
        let maxangle = 1;
        let minangle = -1;
        this.selfAngle = map(noise(this.xoff),0,1,maxangle,minangle);
        this.xoff += 0.03;

        //this.selfAngle += 0.01;
    }

    update() {
        this.angle = this.selfAngle;
        if (this.par) {
            this.a = this.par.b.copy();
            this.angle += this.par.angle;
        } else {
            this.angle += -PI/2;

        }
        this.calculateB();
    }

    calculateB() {
        let dx = this.len * Math.cos(this.angle);
        let dy = this.len * Math.sin(this.angle);
        this.b = new p5.Vector(this.a.x+dx, this.a.y+dy);
    }

    show() {
        stroke(255);
        strokeWeight(4);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
}



