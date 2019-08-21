// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/149-tic-tac-toe.html
// https://youtu.be/GTWrWM1UsnA
// https://editor.p5js.org/codingtrain/sketches/5JngATm3c

String[][] board = {
  {"", "", ""}, 
  {"", "", ""}, 
  {"", "", ""}
};

String[] players = {"X", "O"};

int currentPlayer;
ArrayList<PVector> available = new ArrayList<PVector>();

void setup() {
  size(400, 400);
  frameRate(30);
  currentPlayer = floor(random(players.length));
  for (int j = 0; j < 3; j++) {
    for (int i = 0; i < 3; i++) {
      available.add(new PVector(i, j));
    }
  }
}

boolean equals3(String a, String b, String c) {
  return (a == b && b == c && a != "");
}

String checkWinner() {
  String winner = null;

  // horizontal
  for (int i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // Vertical
  for (int i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // Diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  if (winner == null && available.size() == 0) {
    return "tie";
  } else {
    return winner;
  }
}

void nextTurn() {
  int index = floor(random(available.size()));

  PVector spot = available.get(index);
  available.remove(index);
  int i = (int) spot.x;
  int j = (int) spot.y;
  board[i][j] = players[currentPlayer];
  currentPlayer = (currentPlayer + 1) % players.length;
}

// void mousePressed() {
//   nextTurn(); 
// }

void draw() {
  background(255);
  float w = width / 3;
  float h = height / 3;
  strokeWeight(4);

  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  for (int j = 0; j < 3; j++) {
    for (int i = 0; i < 3; i++) {
      float x = w * i + w / 2;
      float y = h * j + h / 2;
      String spot = board[i][j];
      textSize(32);
      if (spot == players[1]) {
        noFill();
        ellipse(x, y, w / 2, w / 2);
      } else if (spot == players[0]) {
        float xr = w / 4;
        line(x - xr, y - xr, x + xr, y + xr);
        line(x + xr, y - xr, x - xr, y + xr);
      }
    }
  }

  String result = checkWinner();
  if (result != null) {
    noLoop();
    if (result == "tie") {
      println("Tie!");
    } else {
      println(result + " wins!");
    }
  } else {
    nextTurn();
  }
}
