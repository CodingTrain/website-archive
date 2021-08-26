// Tic Tac Toe AI with Minimax Algorithm
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/154-tic-tac-toe-minimax.html
// https://youtu.be/I64-UTORVfU
// https://editor.p5js.org/codingtrain/sketches/0zyUhZdJD
// Ported to Processing4 by Spencer Stith <github.com/spencerstith>

char[][] board = {
  {(char)0, (char)0, (char)0},
  {(char)0, (char)0, (char)0},
  {(char)0, (char)0, (char)0}
};

int w; // = width / 3;
int h; // = height / 3;

char ai = 'X';
char human = 'O';
boolean currentPlayerIsHuman = true;

HashMap<Character, Integer> scores;

void setup() {
  size(400, 400);
  w = width / 3;
  h = height / 3;
  
  scores = new HashMap<Character, Integer>();
  scores.put('X', 10);
  scores.put('O', -10);
  scores.put('t', 0);
  
  bestMove(); //<>//
}

boolean equals3(char a, char b, char c) {
  return a == b && b == c && a != (char)0;
}

char checkWinner() {
  // Must use 'n' for "null" since Java doesn't allow primitive data types to be null
  char winner = 'n';

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

  int openSpots = 0;
  for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
      if (board[i][j] == (char)0) {
        openSpots++;
      }
    }
  }

  if (winner == 'n' && openSpots == 0) {
    return 't';
  } else {
    return winner;
  }
}

void mousePressed() {
  if (currentPlayerIsHuman) {
    // Human make turn
    int i = floor(mouseX / w);
    int j = floor(mouseY / h);
    // If valid turn
    if (board[i][j] == (char)0) {
      board[i][j] = human;
      currentPlayerIsHuman = false;
      bestMove();
    }
  }
}

void draw() {
  background(255);
  strokeWeight(4);

  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  for (int j = 0; j < 3; j++) {
    for (int i = 0; i < 3; i++) {
      int x = w * i + w / 2;
      int y = h * j + h / 2;
      char spot = board[i][j];
      textSize(32);
      int r = w / 4;
      if (spot == human) {
        noFill();
        circle(x, y, r * 2);
      } else if (spot == ai) {
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      }
    }
  }

  char result = checkWinner();
  if (result != 'n') {
    noLoop();
    textAlign(CENTER, CENTER);
    rectMode(CENTER);
    fill(255);
    rect(width / 2, height / 3, 200, 100);
    fill(0);
    if (result == 't') {
      text("Tie!", width / 2, height / 3);
    } else {
      text(result + " wins!", width / 2, height / 3);
    }
  }
}
