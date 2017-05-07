import org.openkinect.processing.*; //<>//
ParticleSystem ps;

// Kinect Library object
Kinect2 kinect2;

float minThresh = 480;
float maxThresh = 830;
PImage img;

void setup() {
  size(512, 424);
  kinect2 = new Kinect2(this);
  kinect2.initDepth();
  kinect2.initDevice();
  img = createImage(kinect2.depthWidth, kinect2.depthHeight, RGB);
  ps = new ParticleSystem(new PVector(width/2, 50));
}


void draw() {
  background(0);

  img.loadPixels();

  //minThresh = map(mouseX, 0, width, 0, 4500);
  //maxThresh = map(mouseY, 0, height, 0, 4500);


  // Get the raw depth as array of integers
  int[] depth = kinect2.getRawDepth();

  float sumX = 0;
  float sumY = 0;
  float totalPixels = 0;

  for (int x = 0; x < kinect2.depthWidth; x++) {
    for (int y = 0; y < kinect2.depthHeight; y++) {
      int offset = x + y * kinect2.depthWidth;
      int d = depth[offset];

      if (d > minThresh && d < maxThresh && x > 100) {
        img.pixels[offset] = color(255, 0, 150);

        sumX += x;
        sumY += y;
        totalPixels++;
      } else {
        img.pixels[offset] = color(0);
      }
    }
  }

  img.updatePixels();
  image(img, 0, 0);

  float avgX = sumX / totalPixels;
  float avgY = sumY / totalPixels;
  fill(150, 0, 255);
  ellipse(avgX, avgY, 64, 64);

  for (int i = 0; i < 10; i++) {
    ps.addParticle(avgX, avgY);
  }
  ps.run();

  //fill(255);
  //textSize(32);
  //text(minThresh + " " + maxThresh, 10, 64);
}