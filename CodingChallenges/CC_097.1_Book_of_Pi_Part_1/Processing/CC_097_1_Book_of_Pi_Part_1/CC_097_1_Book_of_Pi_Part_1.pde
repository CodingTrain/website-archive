// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Book of Pi 1
// https://youtu.be/tbvG9hrJxOU

import processing.pdf.*;

String pi;

void setup() {
  size(1000, 1000, PDF, "bookofpi-10million-text.pdf");
  PGraphicsPDF pdf = (PGraphicsPDF) g;  // Get the renderer
  pi = loadStrings("pi-10million.txt")[0];

  int cols = 100;
  int rows = 100;

  //beginDraw();
  colorMode(HSB, 1.0);
  float w = float(width)/cols;
  float h = float(height)/rows;
  int index = 0;

  int totalPages = pi.length() / (cols*rows);
  println(totalPages);

  for (int i = 0; i < totalPages; i++) {

    for (float y = 0; y < height; y += h) {
      for (float x = 0; x < width; x += w) {
        String s = "" + pi.charAt(index);
        int digit = int(s);
        float hue = digit/10.0;
        fill(hue, 1, 1);
        noStroke();
        rect(x, y, w, h);
        // fill(255-bright);
        //textAlign(CENTER,CENTER);
        //text(digit,x+w/2,y+h/2);
        index++;
        if (index >= pi.length()) {
          index = pi.length() - 1;
        }
      }
    }
    println("Page " + i + " complete!");
    pdf.nextPage();
  }
  println("Finished");
  exit();
  //endRecord();
}
