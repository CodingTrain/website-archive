// Tic Tac Toe AI with Minimax Algorithm
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/154-tic-tac-toe-minimax.html
// https://youtu.be/I64-UTORVfU
// https://editor.p5js.org/codingtrain/sketches/0zyUhZdJD
// Ported to Processing4 by Spencer Stith <github.com/spencerstith>


import java.util.HashMap;

void bestMove() {
  // AI to make its turn
  int bestScore = Integer.MIN_VALUE;
  int[] move = {0, 0};
  for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
      // Is the spot available?
      if (board[i][j] == (char)0) {
        board[i][j] = ai;
        int score = minimax(board, 0, false);
        board[i][j] = (char)0;
        if (score > bestScore) {
          bestScore = score;
          move[0] = i;
          move[1] = j;
        }
      }
    }
  }
  board[move[0]][move[1]] = ai;
  currentPlayerIsHuman = true;
}

int minimax(char[][] board, int depth, boolean isMaximizing) {
  char result = checkWinner();
  if (result != 'n') {
    return scores.get(result);
  }

  if (isMaximizing) {
    int bestScore = Integer.MIN_VALUE;
    for (int i = 0; i < 3; i++) {
      for (int j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == (char)0) {
          board[i][j] = ai;
          int score = minimax(board, depth + 1, false);
          board[i][j] = (char)0;
          bestScore = max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    int bestScore = Integer.MAX_VALUE;
    for (int i = 0; i < 3; i++) {
      for (int j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == (char)0) {
          board[i][j] = human;
          int score = minimax(board, depth + 1, true);
          board[i][j] = (char)0;
          bestScore = min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}
