// No more poison, instead there are predators

var vehicles = [];
var food = [];
var poison = [];
var predators = [];

var debug;

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (var i = 0; i < 50; i++) {
        var x = random(width);
        var y = random(height);
        vehicles[i] = new Vehicle(x, y);
    }

    for (var i = 0; i < 3; i++) {
        var x = random(width);
        var y = random(height);
        predators[i] = new Predator(x, y);
    }

    for (var i = 0; i < 40; i++) {
        var x = random(width);
        var y = random(height);
        food.push(createVector(x, y));
    }

    // for (var i = 0; i < 20; i++) {
    //     var x = random(width);
    //     var y = random(height);
    //     poison.push(createVector(x, y));
    // }

    debug = createCheckbox();
}

function mouseDragged() {
    vehicles.push(new Vehicle(mouseX, mouseY));
}

function draw() {
    background(51);

    if (random(1) < 0.1) {
        var x = random(width);
        var y = random(height);
        food.push(createVector(x, y));
    }

    // if (random(1) < 0.01) {
    //     var x = random(width);
    //     var y = random(height);
    //     poison.push(createVector(x, y));
    // }


    for (var i = 0; i < food.length; i++) {
        fill(0, 255, 0);
        noStroke();
        ellipse(food[i].x, food[i].y, 4, 4);
    }

    // for (var i = 0; i < poison.length; i++) {
    //     fill(255, 0, 0);
    //     noStroke();
    //     ellipse(poison[i].x, poison[i].y, 4, 4);
    // }

    textSize(32);
    var txt = 'Predators: ' + predators.length;
    text(txt, 10, 30);
    var txt = 'Preys: ' + vehicles.length;
    text(txt, 10, 60);


    for (var i = vehicles.length - 1; i >= 0; i--) {
        vehicles[i].boundaries();
        vehicles[i].behaviors(food, poison);
        vehicles[i].update();
        vehicles[i].display();

        var newVehicle = vehicles[i].clone();
        if (newVehicle != null) {
            vehicles.push(newVehicle);
        }

        if (vehicles[i].dead()) {
            var x = vehicles[i].position.x;
            var y = vehicles[i].position.y;
            food.push(createVector(x, y));
            vehicles.splice(i, 1);
        }
    }


    for (var i = predators.length - 1; i >= 0; i--) {

        predators[i].boundaries();
        predators[i].behaviors();
        predators[i].update();
        predators[i].display();
        console.log(predators.length);

        var newPredator = predators[i].clone();
        if (newPredator != null) {
            predators.push(newPredator);
        }

        if (predators[i].dead()) {
            var x = predators[i].position.x;
            var y = predators[i].position.y;
            predators.splice(i, 1);
        }
    }
}
