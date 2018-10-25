// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Book of Pi 2
// https://youtu.be/4Ns9S-Z89-0

import processing.pdf.*;

String pi;
PGraphicsPDF pdf;

void renderBook() {
  //int cols = 10;
  //int rows = 10;

  //beginDraw();
  float w = textWidth("0");//float(width)/cols;
  float h = 14.4;//float(height)/rows;
  int index = 0;



  //int totalPages = pi.length() / (cols*rows);
  //println(totalPages);

  background(255);

  PFont f = createFont("Courier", 12);
  textFont(f);

  //for (int i = 0; i < totalPages; i++) {
  int margin = 100;
  int pageNum = 0;
  while (true) {
    for (float y = margin; y < height-margin; y += h) {
      //for (float x = 0; x < width; x += w) {
      float x = margin;
      while (x < width-margin-w/2) {
        String s = "" + pi.charAt(index);
        //int digit = int(s);
        fill(0);
        textAlign(CENTER, CENTER);
        text(s, x+w/2, y+h/2);
        x += w;//textWidth(s);
        index++;
        if (index >= pi.length()) {
          return;
        }
      }
    }
    pageNum++;
    println("Page " + pageNum + " complete!");
    pdf.nextPage();
  }
}

void setup() {
  size(850, 1150, PDF, "bookofpi-10million-text.pdf");
  pdf = (PGraphicsPDF) g;  // Get the renderer
  pi = "3." + loadStrings("pi-10million.txt")[0];


  renderBook();

  println("Finished");
  exit();

  //endRecord();
}
