// Logo Part 2
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/121.2-logo-interpreter.html
// https://youtu.be/i-k04yzfMpw
// https://editor.p5js.org/codingtrain/sketches/BJqG8zhlN

let editor;
let turtle;

function setup() {
  createCanvas(200, 200);
  angleMode(DEGREES);
  background(0);
  turtle = new Turtle(100, 100, 0);
  editor = select('#code');
  editor.input(goTurtle);
  goTurtle();
}

function execute(commands) {
  for (let command of commands) {
    let name = command.name;
    let arg = command.arg;
    if (name === 'repeat') {
      for (let i = 0; i < arg; i++) {
        execute(command.commands);
      }
    } else {
      commandLookUp[name](arg);
    }
  }
}

function goTurtle() {
  background(0);
  push();
  turtle.reset();
  let code = editor.value();
  let parser = new Parser(code);
  let commands = parser.parse();
  console.log(commands);
  execute(commands);
  pop();
}
