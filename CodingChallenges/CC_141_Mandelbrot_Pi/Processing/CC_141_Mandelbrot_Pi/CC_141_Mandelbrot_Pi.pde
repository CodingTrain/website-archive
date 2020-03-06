// Mandelbrot Pi
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/141-mandelbrot-pi.html
// https://youtu.be/pn2vlselv_g

import java.math.BigDecimal;
import java.math.BigInteger;
import java.math.MathContext;

int digits = 11;
MathContext mc = new MathContext(digits * digits + 1);
BigDecimal c = new BigDecimal(0.25);
BigDecimal hundred = new BigDecimal(100);
BigDecimal e = BigDecimal.ONE.divide(hundred.pow(digits - 1), mc);
BigDecimal z = BigDecimal.ZERO;
BigInteger iterations = BigInteger.ZERO;
BigDecimal two = new BigDecimal(2);

PImage mandel;
void setup() {
  size(1440, 1080);
  frameRate(60);
  mandel = loadImage("mandelbrot.jpg");
  c = c.add(e, mc);
}

void draw() {
  for (int i = 0; i < 25691; i++) {
    if (z.compareTo(two) == -1) {
      z = z.multiply(z, mc);
      z = z.add(c, mc);
      //if (iterations % 10000 == 0 || z.compareTo(two) == 1) {
      //println(z.toString());
      iterations = iterations.add(BigInteger.ONE);
    } else {
      noLoop();
      break;
    }
  }

  background(mandel);
  fill(255);
  textSize(48);
  textAlign(CENTER);
  String s = iterations.toString();
  int diff = digits - s.length();
  for (int i = 0; i < diff; i++) {
    s = '0' + s;
  }
  s = s.substring(0, 1) + '.' + s.substring(1, s.length());
  text(s, width/2 + 250, height/2 + textDescent());
}
