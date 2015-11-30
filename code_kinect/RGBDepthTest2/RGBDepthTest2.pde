import org.openkinect.processing.*; //<>//

Kinect2 kinect2;

void setup() {
  size(1024, 848, P2D);
  kinect2 = new Kinect2(this);
  // Start all data
  kinect2.initVideo();
  kinect2.initDepth();
  kinect2.initIR();
  kinect2.initRegistered();
  kinect2.initDevice();
}


void draw() {
  background(0);
  image(kinect2.getVideoImage(), 0, 0, kinect2.colorWidth*0.267, kinect2.colorHeight*0.267);
  image(kinect2.getDepthImage(), kinect2.depthWidth, 0);
  image(kinect2.getIrImage(), 0, kinect2.depthHeight);

  image(kinect2.getRegisteredImage(), kinect2.depthWidth, kinect2.depthHeight);
  fill(255);
  text("Framerate: " + (int)(frameRate), 10, 515);
}