let frog;
let cars = [];
let logs = [];
let grid = 50;

function resetGame(){
    frog = new Frog(width / 2 - grid / 2, height - grid, grid);
    frog.attach(null);
}

function setup(){
    createCanvas(500,500);
    resetGame();

    let index = 0;

    // ROW 1
    for (let i = 0; i < 2; i++) {
        let x = i * 300;
        cars[index] = new Car(x, height - grid * 2, grid * 2, grid, 2);
        index ++;
    }

    // ROW 2
    for (i = 0; i < 2; i++) {
        let x = i * 200 + 150;
        cars[index] = new Car(x, height - grid * 3, grid, grid, -3.5);
        index ++;
    }

    // ROW 3
    for (i = 0; i < 4; i++) {
        let x = i * 150 + 25;
        cars[index] = new Car(x, height - grid * 4, grid, grid, 1.2);
        index ++;
    }

    // ROW 5
    index = 0;
    for (i = 0; i < 2; i++) {
        let x = i * 250 + 100;
        logs[index] = new Log(x, height - grid * 6, grid * 3, grid, 2.3);
        index ++;
    }

    // ROW 6
    for (i = 0; i < 3; i++) {
        let x = i * 200 + 30;
        logs[index] = new Log(x, height - grid * 7, grid * 2, grid, -1.3);
        index ++;
    }

    // ROW 7
    for (i = 0; i < 2; i++) {
        let x = i * 400 + 10;
        logs[index] = new Log(x, height - grid * 8, grid * 4, grid, 0.5);
        index ++;
    }
}

function draw(){

    background(0);
    // Safety lines
    fill(255, 100);
    rect(0, 0, width,grid*2);
    rect(0, height-grid,width,grid);
    rect(0, height-grid*5,width,grid);

    
    for(let i = 0; i < cars.length; i++){
        cars[i].update();
        cars[i].show();
        
        if(frog.intersects(cars[i])){
            resetGame();
        }
    }
    
    for(i = 0; i < logs.length; i++){
        logs[i].update();
        logs[i].show();
    }
    
    if (frog.y < height - grid * 5 && frog.y > grid*2) {
        let ok = false;
        
        for(i = 0; i<logs.length; i++){
            if (frog.intersects(logs[i])) {
                ok = true;
                frog.attach(logs[i]);
            }
        }
        if(!ok){
            resetGame();
        }
    } else {
        frog.attach(null);
    }
    
    frog.update();
    frog.show();
    
}

function keyPressed() {
    if(keyCode === UP_ARROW){
        frog.move(0, -1);
    }else if(keyCode === DOWN_ARROW){
        frog.move(0, 1);
    }else if(keyCode === RIGHT_ARROW){
        frog.move(1, 0);
    }else if(keyCode === LEFT_ARROW){
        frog.move(-1, 0);
    }
}