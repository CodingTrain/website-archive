// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/eGFJ8vugIWA
import java.util.Hashtable;

String txt = "The unicorn is a legendary creature that has been described since antiquity as a beast with a large, pointed, spiraling horn projecting from its forehead. The unicorn was depicted in ancient seals of the Indus Valley Civilization and was mentioned by the ancient Greeks in accounts of natural history by various writers, including Ctesias, Strabo, Pliny the Younger, and Aelian.[1] The Bible also describes an animal, the re'em, which some translations have erroneously rendered with the word unicorn.[1] In European folklore, the unicorn is often depicted as a white horse-like or goat-like animal with a long horn and cloven hooves (sometimes a goat's beard). In the Middle Ages and Renaissance, it was commonly described as an extremely wild woodland creature, a symbol of purity and grace, which could only be captured by a virgin. In the encyclopedias its horn was said to have the power to render poisoned water potable and to heal sickness. In medieval and Renaissance times, the tusk of the narwhal was sometimes sold as unicorn horn.";
int order = 2;
Hashtable<String, ArrayList<Character>> ngrams;

void setup() {
  size(200, 100);
  textSize(24);
  textAlign(CENTER, CENTER);
  
  ngrams = new Hashtable();
  
  for (int i = 0; i < txt.length() - order; i++) {
    String gram = txt.substring(i, i + order);
    
    if (!ngrams.containsKey(gram)) {
      ngrams.put(gram, new ArrayList());
    }
      ngrams.get(gram).add(txt.charAt(i + order));
  }
}

void markovIt() {
  String currentGram = txt.substring(0, order);
  String result = currentGram;
  for (int i = 0; i < 100; i++) {
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
