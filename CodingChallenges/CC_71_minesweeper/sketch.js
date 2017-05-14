// Minesweeper

function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

//Variables that control program flow
var firstSetup = true;
var gameover = false;
var won = false;

//Asset variables
var images = {
  bee: undefined,
  flag: undefined,
}
var sounds = {
  click: undefined,
  flag: undefined,
  expl: undefined,
  whoosh: undefined,
  win: undefined,
}

//Slider
var sizeSlider;
var difSlider;

//Basic game stuff
var grid;
var cols;
var rows;
var w = 20;

var totalBees = 55;

function preload() {
  //Assets
  images.bee = loadImage("data/bee.png");
  images.flag = loadImage("data/flag.png");

  sounds.click = loadSound("data/click.mp3");
  sounds.flag = loadSound("data/flag.mp3");
  sounds.expl = loadSound("data/explosion.mp3");
  sounds.whoosh = loadSound("data/whoosh.mp3");
  sounds.win = loadSound("data/won.mp3");
}

function setup() {
  cursor("data/cursor.png", 16, 16);
  if (firstSetup) {
    createCanvas(401, 401);
    writeText();
  }

  cols = floor(width / w);
  rows = floor(height / w);
  grid = make2DArray(cols, rows);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }

  // Pick totalBees spots
  var options = [];
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      options.push([i, j]);
    }
  }
  for (var n = 0; n < totalBees; n++) {
    var index = floor(random(options.length));
    var choice = options[index];
    var i = choice[0];
    var j = choice[1];
    // Deletes that spot so it's no longer an option
    options.splice(index, 1);
    grid[i][j].bee = true;
  }


  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].countBees();
    }
  }

  sounds.whoosh.play();

  gameover = false;
  won = false;
}

//Called by the recreating button and calls setup later on
function resetup() {
  firstSetup = false;
  w = width / sizeSlider.value();
  totalBees = difSlider.value();
	loop();
  setup();
}

var firstMousePress = true;

function mousePressed() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY) && !grid[i][j].marked) {
        grid[i][j].reveal();

        if (grid[i][j].bee) {
          if (firstMousePress) {
            grid[i][j].bee = false;

            //Pick a replacement bee
            var newBee = undefined;
            while (!newBee) {
              var c = random(cols);
              var r = random(rows);

              if (!grid[c][r].bee) {
                grid[c][r].bee = true;
                newBee = grid[c][r];
              }
            }
          } else {
            noLoop();
            gameOver();
          }
        }

      }
    }
  }
  firstMousePress = false;
}

function keyReleased() {
  if (key === 'p' || key === 'P') {
    //console.log("marked");
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        if (grid[i][j].contains(mouseX, mouseY)) {
          sounds.flag.play();
          grid[i][j].marked = !grid[i][j].marked;
          return false;
        }
      }
    }
  }
  console.log("pressed: " + key);
  return false;
}

function draw() {
  background(255);

  var totalRevealed = 0;
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
      if (grid[i][j].revealed && !grid[i][j].bee) totalRevealed++;
    }
  }

  //Only true if all hidden cells are bees
  if (totalRevealed + totalBees >= cols * rows && !gameover) {
    noLoop();
    win();
  }

  if (gameover) {
    background(255, 160);

    stroke(143, 23, 23);
    fill(143, 23, 23);
    textSize(40);
    textAlign(CENTER);
    textFont("Trebuchet MS");
    text("GAME OVER", width / 2, height / 2);
  } else if (won) {
    background(115, 201, 107, 230);

    stroke(50, 175, 37);
    fill(50, 175, 37);
    textSize(40);
    textAlign(CENTER);
    textFont("Trebuchet MS");
    text("YOU WIN", width / 2, height / 2);
  }
}

//Executed to display some text below the createCanvas
function writeText() {
  var descr = createDiv('').size(width * 2, 170);
  descr.html("<p>Beesweeper is Dan's interpretation of Minesweeper. (<em>That should be common sense, right?</em>) You have to empty the playing field without hitting bees. To reveal a cell, <strong>click it</strong>. Numbers on any cell tell you how many bees are, in total, on its eight neighbor cells (blank represents a zero).</p> <p>The game will automatically reveal all cells next to blank cells. You can mark or unmark a cell by pressing <strong>P</strong>.</p><h4>Create new Game</h4><p>Grid Size:</p>");
  sizeSlider = createSlider(5, 30, 10, 1);
  createP("Difficulty (Bee percentage):");
  difSlider = createSlider(1, 100, 15, 1);

  redrawer = createButton("Create Grid");
  redrawer.mousePressed(resetup);
}




function gameOver() {
  //Badass-Game over sound
  sounds.expl.play();
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].revealed = true;
    }
  }

  //Game Over text
  console.log("Game Over! (Sorry...)");
  gameover = true;
}

function win() {
  sounds.win.play();
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].revealed = true;
    }
  }

  console.log("YOU WIN!!! (Nice)");
  won = true;
}
