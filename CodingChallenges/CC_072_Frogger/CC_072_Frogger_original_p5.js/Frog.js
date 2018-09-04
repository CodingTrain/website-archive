class Frog extends Rectangle{

    constructor(x, y, width){
        super(x, y, width, width);
        this.attached = null;
    }

    attach(log){
        this.attached = log;
    }


    update(){
        if(this.attached != null) {
            this.x += this.attached.speed;
        }

        this.x = constrain(this.x, 0, width-this.width);
    }

    show(){
        fill(0, 255, 0, 200);
        rect(this.x, this.y, this.width, this.width);

    }

    move(xdir, ydir){
        this.x += xdir * grid;
        this.y += ydir * grid;
    }
}