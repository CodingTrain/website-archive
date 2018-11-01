// Daniel Shiffman
// http://youtube.com/thecodingtrain
// http://codingtra.in

// Coding Challenge 121: Logo
// https://youtu.be/i-k04yzfMpw

let turtle;

function setup() {
  const canvasSize = 300;
  const middle = canvasSize / 4;
  angleMode(DEGREES);
  createCanvas(canvasSize, canvasSize).parent('sketch-holder');

  let editor = select('#code');
  editor.input(() => goTurtle(editor.value()));

  turtle = new Turtle(middle, middle);
  goTurtle(editor.value());
}

function goTurtle(code) {
  push();

  code = preprocess(code);
  turtle.cs();
  turtle.home();

  let tokens = code.split(' ');
  let index = 0;
  while (index < tokens.length) {
    let token = tokens[index];
    if (turtle[token]) {
      switch (token) {
        case 'cs':
        case 'home':
        case 'pu':
        case 'pd':
          turtle[token]();
          break;
        case 'setxy':
          turtle[token](tokens[++index], tokens[++index]);
          break;
        default:
          turtle[token](tokens[++index]);
          break;
      }
    }
    index++;
  }
  pop();
}

function preprocess(code) {
  // Preprocess from right to left because of nested repeats
  const repeatStart = code.lastIndexOf('repeat');
  if (repeatStart !== -1) {
    const repeatEnd = code.indexOf(']', repeatStart);
    if (repeatEnd !== -1) {
      const repeatLine = code.slice(repeatStart, repeatEnd + 1);
      const repeatTimes = parseInt(repeatLine.split(' ')[1]);
      const repeatedString = (repeatLine.slice(repeatLine.indexOf('[') + 1, -1) + ' ').repeat(repeatTimes);
      code = code.slice(0, repeatStart) + repeatedString + code.slice(repeatEnd + 1);
      return preprocess(code);
    }
  }
  return code;
}
