// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Snowfall
// Edited Video: https://youtu.be/cl-mHFCGzYk

// Originally written using p5.js

ArrayList<Snowflake> snow;
PVector gravity;

float zOff = 0;

PImage spritesheet;
ArrayList<PImage> textures;

void setup() {
  size(800,600);
  spritesheet = loadImage("flakes32.png");
  
  snow = new ArrayList<Snowflake>();
  textures = new ArrayList<PImage>();
  
  gravity = new PVector(0, 0.3);
  for (int x = 0; x < spritesheet.width; x += 32) {
    for (int y = 0; y < spritesheet.height; y += 32) {
      PImage img = spritesheet.get(x, y, 32, 32);
      image(img, x, y);
      textures.add(img);
    }
  }


  for (int i = 0; i < 400; i++) {
    float x = random(width);
    float y = random(height);
    int designIndex = floor(random(textures.size()));
    PImage design = textures.get(designIndex);
    snow.add(new Snowflake(x, y, design));
  }





}

void draw() {
  background(0);
  //snow.add(new Snowflake());

  zOff += 0.1;

  for (int i = 0; i < snow.size(); i++) {
    Snowflake flake = snow.get(i);
    float xOff = flake.pos.x / width;
    float yOff = flake.pos.y / height;
    float wAngle = noise(xOff, yOff, zOff) * TWO_PI;
    PVector wind = PVector.fromAngle(wAngle);
    wind.mult(0.1);

    flake.applyForce(gravity);
    flake.applyForce(wind);
    flake.update();
    flake.render();
  }

  // for (let i = snow.length - 1; i >= 0; i--) {
  //   if (snow[i].offScreen()) {
  //     snow.splice(i, 1);
  //   }
  // }

}