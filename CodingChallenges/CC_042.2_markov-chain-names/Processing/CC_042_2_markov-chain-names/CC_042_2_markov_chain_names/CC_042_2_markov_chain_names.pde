// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/eGFJ8vugIWA
import java.util.Hashtable;

String[] names;
ArrayList<String> beginnings;
int order = 2;
Hashtable<String, ArrayList<Character>> ngrams;

void setup() {
  size(200, 100);
  textSize(24);
  textAlign(CENTER, CENTER);
  
  names = loadStrings("names.txt");
  beginnings = new ArrayList();
  ngrams = new Hashtable();
  
  for (int j = 0; j < names.length; j++) {
    String txt = names[j];
    for (int i = 0; i < txt.length() - order; i++) {
      String gram = txt.substring(i, i + order);
      if (i == 0) {
        beginnings.add(gram);
      }
      
      if (!ngrams.containsKey(gram)) {
        ngrams.put(gram, new ArrayList());
      }
        ngrams.get(gram).add(txt.charAt(i + order));
    }
  }
}

void markovIt() {
  String currentGram = beginnings.get((int)random(beginnings.size()));
  String result = currentGram;
  for (int i = 0; i < 20; i++) {
    ArrayList<Character> possibilities = ngrams.get(currentGram);
    if (possibilities == null) {
      break;
    }
    char next = possibilities.get((int)random(possibilities.size()));
    result += next;
    int len = result.length();
    currentGram = result.substring(len - order, len);
  }
  
  println(result);
}

void draw() {
  background(255);
  fill(0);
  text("Generate", width * 0.5, height * 0.5);
}

void mouseClicked() {
  markovIt();
}
