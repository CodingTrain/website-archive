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
Label decimalP;
Button shiftButton;

void setup() {
  size(400, 200);
  
  decimalP = new Label("", 10, 130);
  shiftButton = new Button(">>", 10, 150, 100, 40);
  
  float w = width / 8;
  for (int i = 0; i < 8; i++) {
    byte_[i] = new Bit(w / 2 + i * w, 50, w - 4);
    byte_[i].setState(num.charAt(i) == '1');
  }
}

void shiftBits() {
  String num = getBinaryString();
  int val = binaryToDecimal(num);
  val = val >> 1;
  num = decimalToBinary(val);
  for (int i = 0; i < 8; i++) {
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

  // draw the label
  decimalP.setText(Integer.toString(binaryToDecimal(num)));
  decimalP.show();

  // draw shift button
  shiftButton.show();
}

void mousePressed() {
  for (int i = 0; i < byte_.length; i++) {
    byte_[i].toggle(mouseX, mouseY);
  }

  // check if shiftButton clicked
  if (shiftButton.isInside()) {
    shiftBits();
  }
}

String decimalToBinary(int num) {
  String bits = "";
  int rem = num;
  for (int i = 7; i >= 0; i--) {
    int divisor = (int) Math.pow(2, i);
    int bitValue = (int) (rem / divisor);
    bits += bitValue;
    rem = rem % divisor;
  }
  return bits;
}

int binaryToDecimal(String val) {
  int sum = 0;
  for (int i = 0; i < val.length(); i++) {
    String bit = String.valueOf(val.charAt(val.length() - i - 1));
    sum += Integer.parseInt(bit) * pow(2, i);
  }
  return sum;
}
