var bubbles = [];
var flowers = [];

function preload() {
    for (var i = 0; i< 3; i++){
        flowers[i] = loadImage("images/flower" + i + ".jpg"); 
    }
//    flowers[0] = loadImage("images/flower0.jpg");
//    flowers[1] = loadImage("images/flower1.jpg");
//    flowers[2] = loadImage("images/flower2.jpg");
}

function setup() {
    cnv = createCanvas(600, 400);   
    }

function mousePressed() {
    var r = floor(random(0, flowers.length));
    var b = new Bubble(mouseX, mouseY, flowers[r]);
    bubbles.push(b);
}

function draw() {
    background(0);

    for (var i = bubbles.length-1; i >= 0; i--) {
        bubbles[i].update();
        bubbles[i].display(); 
    }
}