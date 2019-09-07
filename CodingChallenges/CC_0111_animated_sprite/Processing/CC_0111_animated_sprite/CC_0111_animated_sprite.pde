// Daniel Shiffman
// http://youtube.com/thecodingtrain
// https://thecodingtrain.com/CodingChallenges/111-animated-sprite.html

// Horse Spritesheet from
// https://opengameart.org/content/2d-platformer-art-assets-from-horse-of-spring

// Animated Sprite
// https://youtu.be/3noMeuufLZY

PImage spritesheet;
JSONObject spritedata;

ArrayList<PImage> animation;

ArrayList<Sprite> horses;

void setup() {
  size(640, 480);
  animation = new ArrayList<PImage>();
  horses = new ArrayList<Sprite>();
  spritedata = loadJSONObject("horse/horse.json");
  spritesheet = loadImage("horse/horse.png");
  JSONArray frames = spritedata.getJSONArray("frames");
  for (int i = 0; i < frames.size(); i++) {
    JSONObject frame = frames.getJSONObject(i);
    JSONObject pos = frame.getJSONObject("position");
    int x = pos.getInt("x");
    int y = pos.getInt("y");
    int w = pos.getInt("w");
    int h = pos.getInt("h");
    PImage img = spritesheet.get(x, y, w, h);
    animation.add(img);
  }

  for (int i = 0; i < 5; i++) {
    horses.add(new Sprite(animation, 0, i * 75, random(0.1, 0.4)));
  }
}

void draw() {
  background(0);

  for (Sprite horse: horses) {
    horse.show();
    horse.animate();
  }

  // image(animation[frameCount % animation.length], 0, 0);
}
