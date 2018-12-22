// Coding Train
// Ported to processing by Max (https://github.com/TheLastDestroyer)
// Origional JS by Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/E1B4UoSQMFw

// variables: A B
// axiom: A
// rules: (A → AB), (B → A)

float angle;
String axiom = "F";
String sentence = axiom;
int len = 100;
Rule[] rules;


void setup(){
  size(400,400);
  
  rules = new Rule[1];
  rules[0] = new Rule('F', "FF+[+F-F-F]-[-F+F+F]");
  
  angle = radians(45);
  background(51);
  println(axiom);
  turtle();
}

void draw(){
}


void mouseClicked(){
  println("click");
  generate();
}


class Rule {
  char a;
  String b;
  Rule(char _a, String _b){
    a = _a;
    b = _b;
  }
}

void generate(){
  len *= 0.5;
  String next_sentence = "";
  for (int i = 0; i < sentence.length(); i++){
    char current = sentence.charAt(i);
    boolean found = false;
    for (int j = 0; j < rules.length; j++){
      if (current == rules[j].a){
        found = true;
        next_sentence += rules[j].b;
        break;
      }
    }
    if (!found){
      next_sentence += current;
    }
  }
  sentence = next_sentence;
  println(sentence);
  turtle();
}


void turtle(){
  background(51);
  resetMatrix(); 
  translate(width/2, height);
  stroke(255, 100);
  for (int i = 0; i < sentence.length(); i++) {
    char current = sentence.charAt(i);

    if (current == 'F') {
      line(0, 0, 0, -len);
      translate(0, -len);
    } else if (current == '+') {
      rotate(angle);
    } else if (current == '-') {
      rotate(-angle);
    } else if (current == '[') {
      pushMatrix();
    } else if (current == ']') {
      popMatrix();
    }
  }
}
