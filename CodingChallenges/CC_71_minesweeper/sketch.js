/**
============
Mine Sweeper
============
*/

/**
 * make2DArray - Makes a 2D array
 *
 * @param  {Array} cols columns
 * @param  {Array} rows rows
 * @return {Array}      2d Array
 */
function make2DArray(cols, rows) {
  var arr = cols;
  for (var i = 0; i < arr.length; i++) {
    arr[i] = rows;
  }
  return arr;
}

var w = 20;
var totalBees = 10;
var cols,
    rows,
    grid;


/**
 * setup - Sets up a grid for Bees to
 *         bee (pun intended) in.
 *
 * @return {type}  description
 */
function setup() {
  createCanvas(201, 201);
  cols = floor(width / w);
  rows = floor(height / w);
  grid = make2DArray(cols, rows);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }

  /**
   * Choose where bees will be placed.
   */
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
}

function gameOver() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].revealed = true;
    }
  }
}

function mousePressed() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
        grid[i][j].reveal();
        // Triggers game over if pressed on a Bee
        if (grid[i][j].bee) {
          gameOver();
        }
      }
    }
  }
}


/**
 * draw - description
 *
 * @return {type}  description
 */
function draw() {
  background(255);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}
