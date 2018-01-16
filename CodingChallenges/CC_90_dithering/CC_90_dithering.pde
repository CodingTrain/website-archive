// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Floyd Steinberg Dithering
// Edited Video: https://youtu.be/0L2n8Tg2FwI

PImage kitten;

void setup() {
  size(1024, 512);
  kitten = loadImage("kitten.jpg");
  kitten.filter(GRAY);
  image(kitten, 0, 0);
}

int index(int x, int y) {
  return x + y * kitten.width;
}

void addError(int x,int y, float factor,float errR, float errG, float errB){
      if (x < 0 || x >= kitten.width|| y < 0 || y >= kitten.height) return;
      int index = index(x,y);
      color c = kitten.pixels[index];
      float r = red(c);
      float g = green(c);
      float b = blue(c);
      r = r + errR * factor;
      g = g + errG * factor;
      b = b + errB * factor;
      kitten.pixels[index] = color(r, g, b);

}

void distributeError(int x ,int y, float errR, float errG, float errB){
    addError(x+1,y  ,7/16.0,errR,errG,errB);
    addError(x-1,y+1,3/16.0,errR,errG,errB);
    addError(x  ,y+1,5/16.0,errR,errG,errB);
    addError(x+1,y+1,1/16.0,errR,errG,errB);

}


void draw() {
  kitten.loadPixels();
  for (int y = 0; y < kitten.height; y++) {
    for (int x = 0; x < kitten.width; x++) {
      color pix = kitten.pixels[index(x, y)];
      float oldR = red(pix);
      float oldG = green(pix);
      float oldB = blue(pix);
      int factor = 1;
      int newR = round(factor * oldR / 255) * (255/factor);
      int newG = round(factor * oldG / 255) * (255/factor);
      int newB = round(factor * oldB / 255) * (255/factor);
      kitten.pixels[index(x, y)] = color(newR, newG, newB);

      float errR = oldR - newR;
      float errG = oldG - newG;
      float errB = oldB - newB;

      distributeError(x,y,errR,errG,errB);
    }
  }
  kitten.updatePixels();
  image(kitten, 512, 0);
}
