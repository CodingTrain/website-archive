// Daniel Shiffman
// http://youtube.com/thecodingtrain
// http://codingtra.in
// Processing transcription: Chuck England

// Coding Challenge 121: Logo
// https://youtu.be/i-k04yzfMpw
// https://editor.p5js.org/codingtrain/sketches/ryTuOf3gN

void setup() {
  size(640, 480);
  background(0);
  setupCommands();

  Turtle turtle = new Turtle(320, 240, 0);
  String[] lines = loadStrings("code.txt");
  String code = String.join(" ", lines);
  goTurtle(turtle, code);
}

void goTurtle(Turtle turtle, String code) {
  background(0);
  pushMatrix();
  turtle.reset();

  String[] tokens = code.split(" ");
  int index = 0;
  while (index < tokens.length) {
    String token = tokens[index];
    // println(token);
    if (commands.containsKey(token)) {
      if (token.charAt(0) == 'p') {
        commands.get(token).run(turtle);
      } else {
        index++;
        if (token.charAt(1) == 'd') {
          int dist = parseInt(tokens[index]);
          commands.get(token).run(turtle, dist);
        } else {
          float angle = parseFloat(tokens[index]);
          commands.get(token).run(turtle, angle);
        }
      }
    }
    index++;
  }
  popMatrix();
}
