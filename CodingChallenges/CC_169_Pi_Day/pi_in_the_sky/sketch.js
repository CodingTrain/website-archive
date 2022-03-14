let pies = [];
let plate;

let pi;
let piShow = '';

let digitsDiv;
let digits = "3.";
let piCounter = 0;

let gameOver = false;

function preload() {
  pi = loadStrings('one-million.txt');
}

function setup() {
  pi = pi.join('');
  createCanvas(800, 400);
  plate = new Plate(width / 2, 50);
  digitsDiv = createDiv(digits);
  digitsDiv.style("font-size", "64pt");
  piShow = pi.substring(0, 2);
}

function draw() {
  if (gameOver) {
    background(255, 0, 0);
    fill(255);
    textAlign(CENTER, CENTER);
    text("Game Over.\nGo and Enjoy Some Pie! 🥧", width/2, height/2);
    return;
  }
  
  background(0);
  
  fill(255);
  textSize(48);
  text(piShow, width-64, 50);
  fill(0,255,0);
  text(piShow.charAt(0), width-64, 50);

  
  
  if (random(1) < 0.1) {
    pies.push(new Pie(random(width), random(-100, -20)));
  }

  for (let pie of pies) {
    pie.show();
    pie.update();
  }

  for (let i = pies.length - 1; i >= 0; i--) {
    if (plate.catches(pies[i])) {
      // catch the pie
      // Check what digit was caught and deal with score!
      let digit = pies[i].digit;
      
      let correctDigit = pi.charAt(piCounter)
      if (correctDigit == digit) {
        console.log("🥧");
        digits += digit;
        piCounter++;
        piShow = pi.substring(piCounter, piCounter + 2);
      } else {
        gameOver = true;
        // console.log("🚂");
      }
      digitsDiv.html(digits);

      pies.splice(i, 1);
    } else if (pies[i].y > height + pies[i].r) {
      // eat the pie?
      pies.splice(i, 1);
    }
  }

  plate.x = mouseX;
  plate.show();
}
