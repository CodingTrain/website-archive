// Logo Part 2
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/121.2-logo-interpreter.html
// https://youtu.be/i-k04yzfMpw
// https://editor.p5js.org/codingtrain/sketches/BJqG8zhlN
// Processing transcription: Chuck England

void setup() {
  size(640, 480);
  background(0);
  setupCommands();

  Turtle turtle = new Turtle(320, 240, 0);
  String[] lines = loadStrings("code.txt");
  String code = String.join(" ", lines);
  goTurtle(turtle, code);
}

void execute(Turtle turtle, List<Command> commands) {
  for (Command command : commands) {
    String name = command.name;
    String arg = command.arg;
    if (name.equals("repeat")) { //<>//
      int count = parseInt(arg);
      for (int i = 0; i < count; i++) {
        execute(turtle, command.commands);
      }
    } else {
      if (name.charAt(1) == 'd') {
        int dist = parseInt(arg);
        commandLookUp.get(name).run(turtle, dist);
      } else {
        float angle = parseFloat(arg);
        commandLookUp.get(name).run(turtle, angle); //<>//
      }
    }
  }
}

void goTurtle(Turtle turtle, String code) {
  background(0);
  pushMatrix();
  turtle.reset();
  Parser parser = new Parser(code);
  List<Command> commands = parser.parse();
  println(commands);
  execute(turtle, commands);
  popMatrix();
}
