// Logo Part 2
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/121.2-logo-interpreter.html
// https://youtu.be/i-k04yzfMpw
// https://editor.p5js.org/codingtrain/sketches/BJqG8zhlN
// Processing transcription: Chuck England

class Command {
  String name;
  String arg;
  List<Command> commands;
  
  Command(String name_, String arg_) {
    this.name = name_;
    this.arg = arg_;
    this.commands = new ArrayList<Command>();
  }
  
  Command(String name_) {
    this(name_, "");
  }
}
