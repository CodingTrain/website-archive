function Bubble (x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    
    this.display = function () {
        imageMode(CENTER);
        image(img, this.x, this.y, 100, 100);
    }

    this.update = function () {
        this.x = this.x + random(-1, 1);
        this.y = this.y + random(-1, 1);
    }
 }