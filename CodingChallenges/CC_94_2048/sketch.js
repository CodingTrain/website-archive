let grid;
let score = 0;

function isGameOver() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] == 0) {
        return false;
      }
      if (i !== 3 && grid[i][j] === grid[i + 1][j]) {
        return false;
      }
      if (j !== 3 && grid[i][j] === grid[i][j + 1]) {
        return false;
      }
    }
  }
  return true;
}

function got2048() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] == 2048) {
        return true;
      }
    }
  }
  return false;
}

function blankGrid() {
  return [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  // return new Array(4).fill(new Array(4).fill(0));
}

function setup() {
  createCanvas(400, 400);
  noLoop();
  grid = blankGrid();
  // console.table(grid);
  addNumber();
  addNumber();
  updateCanvas();
}

function addNumber() {
  let options = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] === 0) {
        options.push({
          x: i,
          y: j
        });
      }
    }
  }
  if (options.length > 0) {
    let spot = random(options);
    let r = random(1);
    grid[spot.x][spot.y] = r > 0.5 ? 2 : 4;
  }
}

function compare(a, b) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (a[i][j] !== b[i][j]) {
        return true;
      }
    }
  }
  return false;
}

function copyGrid(grid) {
  let extra = blankGrid();
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      extra[i][j] = grid[i][j];
    }
  }
  return extra;


}

function flipGrid(grid) {
  for (let i = 0; i < 4; i++) {
    grid[i].reverse();
  }
  return grid;
}

function rotateGrid(grid) {
  let newGrid = blankGrid();
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      newGrid[i][j] = grid[j][i];
    }
  }
  return newGrid;
}
// One "move"
function keyPressed() {
  let flipped = false;
  let rotated = false;
  let played = true;
  if (keyCode === DOWN_ARROW) {
    // DO NOTHING
  } else if (keyCode === UP_ARROW) {
    grid = flipGrid(grid);
    flipped = true;
  } else if (keyCode === RIGHT_ARROW) {
    grid = rotateGrid(grid);
    rotated = true;
  } else if (keyCode === LEFT_ARROW) {
    grid = rotateGrid(grid);
    grid = flipGrid(grid);
    rotated = true;
    flipped = true;
  } else {
    played = false;
  }

  if (played) {
    let past = copyGrid(grid);
    for (let i = 0; i < 4; i++) {
      grid[i] = operate(grid[i]);
    }
    let changed = compare(past, grid);

    if (flipped) {
      grid = flipGrid(grid);
    }
    if (rotated) {
      grid = rotateGrid(grid);
      grid = rotateGrid(grid);
      grid = rotateGrid(grid);
    }

    if (changed) {
      addNumber();
    }
    updateCanvas();

    let gameover = isGameOver();
    let wingame = got2048();
    if (gameover) {
      console.log("GAME OVER");
    }

    if (wingame) {
      alert("You have reached 2048!!!");
    }
  }


}

function operate(row) {
  row = slide(row);
  row = combine(row);
  row = slide(row);
  return row;
}


function updateCanvas() {
  background(255);
  drawGrid();
  select('#score').html(score);

}

// making new array
function slide(row) {
  let arr = row.filter(val => val);
  let missing = 4 - arr.length;
  let zeros = Array(missing).fill(0);
  arr = zeros.concat(arr);
  return arr;
}

// operating on array itself
function combine(row) {
  for (let i = 3; i >= 1; i--) {
    let a = row[i];
    let b = row[i - 1];
    if (a == b) {
      row[i] = a + b;
      score += row[i];
      row[i - 1] = 0;
    }
  }
  return row;
}

function drawGrid() {
  let w = 100;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      strokeWeight(4);
      stroke(getColor(2));
      let val = grid[i][j];
      fill(getColor(val));
      rect(i * w, j * w, w, w, 10);
      if (grid[i][j] !== 0) {
        textAlign(CENTER, CENTER);
        let s = "" + val;
        let len = s.length - 1;
        let sizes = [64, 64, 32, 16];
        fill(getTextColor(val));
        noStroke();
        textSize(sizes[len]);
        text(val, i * w + w / 2, j * w + w / 2);
      }
    }
  }
}

function getTextColor(value) {
  const colors = [color(249, 246, 242), color(119, 110, 101)];
  return (value >= 8 ) ? colors[0] : colors[1];  
}

function getColor(value) {
  // Colors from http://scrambledeggsontoast.github.io/2014/05/09/writing-2048-elm/
  const colors = {
    0: 'rgba(238, 228, 218, 0.32)',
    2: color(238, 228, 218),
    4: color(237, 224, 200),
    8: color(242, 177, 121),
    16: color(245, 149, 99),
    32: color(246, 124, 95),
    64: color(246, 94, 59),
    128: color(237, 207, 114),
    256: color(237, 204, 97),
    512: color(237, 200, 80),
    1024: color(237, 197, 63),
    2048: color(237, 194, 4)
  }

  return (value > 2048) ? colors[2048] : colors[value] || colors[0];
}