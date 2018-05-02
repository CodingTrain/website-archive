// Obamathon
// https://github.com/ITPNYU/Obamathon
// YouTube video tutorial: https://youtu.be/nnlAH1zDBDE

// Source Obama image
PImage obama;
// Resize it
PImage smaller;
// Giant array of images
PImage[] allImages;
// Corresponding brightness value
float[] brightness;
// Images by brightness
PImage[] brightImages;

// Size of each "cell"
int scl = 16;
int w, h;

void setup() {
  size(600, 749);
  obama = loadImage("obama.jpg");

  // Find all the images
  File[] files = listFiles(sketchPath("data/photos"));
  //allImages = new PImage[files.length-1];
  // Use a smaller amount just for testing
  allImages = new PImage[100];
  // Need brightness average for each image
  brightness = new float[allImages.length];

  // Only 256 brightness values
  brightImages = new PImage[256];

  // Deal with all the images
  for (int i = 0; i < allImages.length; i++) {

    // What's the filename?
    // Should really check to see if it's a JPG
    // Starting at +1 to ignore .DS_Store on Mac
    String filename = files[i+1].toString();

    // Load the image
    PImage img = loadImage(filename);

    // Shrink it down
    allImages[i] = createImage(scl, scl, RGB);
    allImages[i].copy(img, 0, 0, img.width, img.height, 0, 0, scl, scl);
    allImages[i].loadPixels();

    // Calculate average brightness
    float avg = 0;
    for (int j = 0; j < allImages[i].pixels.length; j++) {
      float b =  brightness(allImages[i].pixels[j]);
      avg += b;
    }
    avg /= allImages[i].pixels.length;


    brightness[i] = avg;
  }

  // Find the closest image for each brightness value
  for (int i = 0; i < brightImages.length; i++) {
    float record = 256;
    for (int j = 0; j < brightness.length; j++) {
      float diff = abs(i - brightness[j]);
      if (diff < record) {
        record = diff;
        brightImages[i] = allImages[j];
      }
    }
  }

  // how many cols and rows
  w = obama.width/scl;
  h = obama.height/scl;

  smaller = createImage(w, h, RGB);
  smaller.copy(obama, 0, 0, obama.width, obama.height, 0, 0, w, h);
}

void draw() {
  background(0);
  smaller.loadPixels();
  // Columns and rows
  for (int x =0; x < w; x++) {
    for (int y = 0; y < h; y++) {
      // Draw an image with equivalent brightness to source pixel
      int index = x + y * w;
      color c = smaller.pixels[index];
      int imageIndex = int(brightness(c));
      // fill(brightness(c));
      // noStroke();
      // rect(x*scl, y*scl, scl, scl);
      image(brightImages[imageIndex], x*scl, y*scl, scl, scl);
    }
  }
  noLoop();
}


// Function to list all the files in a directory
File[] listFiles(String dir) {
  File file = new File(dir);
  if (file.isDirectory()) {
    File[] files = file.listFiles();
    return files;
  } else {
    // If it's not a directory
    return null;
  }
}