// Coding Train
// http://thecodingtrain.com
// http://patreon.com/codingtrain

// Code for: https://youtu.be/JXuxYMGe4KI
// Processing port by Max (https://github.com/TheLastDestroyer)

Blob blob;

ArrayList<Blob> blobs;
float zoom = 1;

void setup() {
  size(600, 600);
  blob = new Blob(0, 0, 64);
  blobs = new ArrayList<Blob>();
  for (int i = 0; i < 200; i++) {
    float x = random(-width,width);
    float y = random(-height,height);
    blobs.add(new Blob(x, y, 16));
  }
}

void draw() {
  background(0);

  translate(width/2, height/2);
  float newzoom = 64 / blob.r;
  zoom = lerp(zoom, newzoom, 0.1);
  scale(zoom);
  translate(-blob.pos.x, -blob.pos.y);

  for (int i = blobs.size()-1; i >=0; i--) {
    blobs.get(i).show();
    if (blob.eats(blobs.get(i))) {
      blobs.remove(i);
    }
  }


  blob.show();
  blob.update();

}
