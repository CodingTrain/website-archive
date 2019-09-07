// Daniel Shiffman
// http://youtube.com/thecodingtrain
// http://codingtra.in
// Processing transcription: Chuck England

// Coding Challenge 120: Bit Shifting
// https://youtu.be/oCBlwsY8sR4

// p5.js editor version: 0.7.2 (December 21, 2018)
// https://editor.p5js.org/codingtrain/sketches/Hk8CVYvi7

String num = "10101001";
Bit[] byte_ = new Bit[8];

void setup() {
  size(400, 200);
  println(binaryToDecimal(num));
  float w = width / 8;
  for (int i = 0; i < 8; i++) {
    byte_[i] = new Bit(w / 2 + i * w, 50, w - 4);
    byte_[i].setState(num.charAt(i) == '1');
  }
}

String getBinaryString() {
  String num = "";
  for (int i = 0; i < byte_.length; i++) {
    byte_[i].show();
    num += byte_[i].state ? "1" : "0";
  }
  return num;
}

void draw() {
  background(51);

  num = getBinaryString();

  noStroke();
  fill(255);
  textSize(50);
  text(Integer.toString(binaryToDecimal(num)), 10, 130);
}

void mousePressed() {
  for (int i = 0; i < byte_.length; i++) {
    byte_[i].toggle(mouseX, mouseY);
  }
}

int binaryToDecimal(String val) {
  int sum = 0;
  for (int i = 0; i < val.length(); i++) {
    String bit = String.valueOf(val.charAt(val.length() - i - 1));
    sum += Integer.parseInt(bit) * pow(2, i);
  }
  return sum;
}
