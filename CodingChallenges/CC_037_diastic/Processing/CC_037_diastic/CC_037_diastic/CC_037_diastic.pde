// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/u-HUtrpyi1c

// Modifications had to be made to port into Processing
// Help for getting input in Processing: http://learningprocessing.com/examples/chp18/example-18-01-userinput

String diastic(String seed, String[] words) {
  String phrase = "";
  
  return phrase;
}

PFont font;
String seed = "";
String srctxt;
String[] words;

void setup() {
  // Getting input
  size(500, 200);
  font = createFont("Arial", 16);
  textFont(font);
  fill(0);
  
  // Coding Challenge
  srctxt = join(loadStrings("rainbow.txt"), " ");
  words = splitTokens(srctxt, " ,?!.");
}

void draw() {
  background(255);
  text("Enter your seed and hit enter to generate!", 25, 40);
  text("Your output will appear in the Processing console", 25, 80);
  text("Seed: " + seed, 25, 120);
}

void keyPressed() {
  if (key == '\n') {
    String phrase = diastic(seed, words);
  } else {
    seed += key;
  }
}
