// Logo Part 2
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/121.2-logo-interpreter.html
// https://youtu.be/i-k04yzfMpw
// https://editor.p5js.org/codingtrain/sketches/BJqG8zhlN

class Parser {
  constructor(text) {
    this.text = text;
    this.index = 0;
  }

  remainingTokens() {
    return this.index < this.text.length;
  }

  getRepeat() {
    while (this.text.charAt(this.index++) !== '[' && this.remainingTokens()) {
      /* empty */
    }
    let start = this.index;

    let bracketCount = 1;
    while (bracketCount > 0 && this.remainingTokens()) {
      let char = this.text.charAt(this.index++);
      if (char === '[') {
        bracketCount++;
      } else if (char === ']') {
        bracketCount--;
      }
    }
    let end = this.index;
    return this.text.substring(start, end - 1);
  }

  nextToken() {
    let token = '';
    let char = this.text.charAt(this.index);

    // If it's a space ignore
    if (char === ' ') {
      this.index++;
      return this.nextToken();
    }

    // If it's a bracker send that back
    if (char === '[' || char === ']') {
      this.index++;
      return char;
    }

    // Otherwise accumulate until a space
    while (char !== ' ' && this.remainingTokens()) {
      token += char;
      char = this.text.charAt(++this.index);
    }
    return token;
  }

  parse() {
    let commands = [];
    let movement = /^([fb]d|[lr]t)$/;
    let pen = /^p/;
    let repeat = /^repeat$/;
    while (this.remainingTokens()) {
      let token = this.nextToken();
      if (movement.test(token)) {
        let cmd = new Command(token, this.nextToken());
        commands.push(cmd);
      } else if (pen.test(token)) {
        let cmd = new Command(token);
        commands.push(cmd);
      } else if (repeat.test(token)) {
        let cmd = new Command(token, this.nextToken());
        let toRepeat = this.getRepeat();
        let parser = new Parser(toRepeat);
        cmd.commands = parser.parse();
        commands.push(cmd);
      }
    }
    return commands;
  }
}
