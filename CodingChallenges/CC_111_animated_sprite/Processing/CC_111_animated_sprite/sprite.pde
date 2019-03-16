// Daniel Shiffman
// http://youtube.com/thecodingtrain
// https://thecodingtrain.com/CodingChallenges/111-animated-sprite.html

// Horse Spritesheet from
// https://opengameart.org/content/2d-platformer-art-assets-from-horse-of-spring

// Animated Sprite
// https://youtu.be/3noMeuufLZY

class Sprite {
  float x, y, w, speed;
  int len, index;
  ArrayList<PImage> animation;
  Sprite(ArrayList<PImage> animation_, float x_, float y_, float speed_) {
    x = x_;
    y = y_;
    animation = animation_;
    w = animation.get(0).width;
    len = animation.size();
    speed = speed_;
    index = 0;
  }

  void show() {
    int index = floor(this.index) % len;
    image(animation.get(index), x, y);
  }

  void animate() {
    index += speed;
    x += speed * 15;

    if (x > width) {
      x = -w;
    }
  }
}
