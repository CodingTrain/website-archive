// Logo Part 2
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/121.2-logo-interpreter.html
// https://youtu.be/i-k04yzfMpw
// https://editor.p5js.org/codingtrain/sketches/BJqG8zhlN

class Parser {
  String text;
  int index;
  
  Parser(String text_) {
    this.text = text_;
    this.index = 0;
  }

  boolean remainingTokens() {
    return this.index < this.text.length();
  }

  String getRepeat() {
    while (this.text.charAt(this.index++) != '[' && this.remainingTokens()) {}
    int start = this.index;

    int bracketCount = 1;
    while (bracketCount > 0 && this.remainingTokens()) {
      char ch = this.text.charAt(this.index++);
      if (ch == '[') {
        bracketCount++;
      } else if (ch == ']') {
        bracketCount--;
      }
    }
    int end = this.index;
    return this.text.substring(start, end - 1);
  }

  String nextToken() {
    String token = "";
    char ch = this.text.charAt(this.index);

    // If it's a space ignore
    if (ch == ' ') {
      this.index++;
      return this.nextToken();
    }

    // If it's a bracket send that back
    if (ch == '[' || ch == ']') {
      this.index++;
      return String.valueOf(ch);
    }

    // Otherwise accumulate until a space
    while (ch != ' ' && this.remainingTokens()) {
      token += ch;
      this.index++;
      if (this.remainingTokens()) {
        ch = this.text.charAt(this.index);
      } else {
        break;
      }
    }
    return token;
  }

List<Command> parse() {
    List<Command> commands = new ArrayList<Command>();
    final String movement = "^([fb]d|[lr]t)$";
    final String pen = "^p";
    final String repeat = "^repeat$";
    while (this.remainingTokens()) {
      String token = this.nextToken();
      if (token.matches(movement)) {
      //if (movement.test(token)) {
        Command cmd = new Command(token, this.nextToken());
        commands.add(cmd);
      } else if (token.matches(pen)) {
        Command cmd = new Command(token);
        commands.add(cmd);
      } else if (token.matches(repeat)) {
        Command cmd = new Command(token, this.nextToken());
        String toRepeat = this.getRepeat();
        Parser parser = new Parser(toRepeat);
        cmd.commands = parser.parse();
        commands.add(cmd);
      }
    }
    return commands;
  }
}
