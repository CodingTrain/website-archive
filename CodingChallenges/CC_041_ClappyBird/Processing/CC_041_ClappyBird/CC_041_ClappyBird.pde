// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/aKiyCeIuwn4
// Ported to Processing 4 by Spencer Stith<http://github.com/spencerstith>

import processing.sound.*;
import java.util.ArrayList;

Bird bird;
ArrayList<Pipe> pipes;
AudioIn mic;
Amplitude analyzer;
float thresholdTop;
float thresholdBottom;
boolean clapping = false;

void setup() {
  size(400, 600);
  mic = new AudioIn(this, 0);
  mic.start();
  analyzer = new Amplitude(this);
  analyzer.input(mic);
  
  bird = new Bird();
  pipes = new ArrayList<>();
  pipes.add(new Pipe());
  
  thresholdTop = 0.2;
  thresholdBottom = 0.1;
}

void draw() {
  background(0);

  float vol = analyzer.analyze();

  for (int i = pipes.size() - 1; i >= 0; i--) {
    pipes.get(i).show();
    pipes.get(i).update();

    if (pipes.get(i).hits(bird)) {
      println("HIT");
    }

    if (pipes.get(i).offscreen()) {
      pipes.remove(i);
    }
  }

  bird.update();
  bird.show();

  if (frameCount % 100 == 0) {
    pipes.add(new Pipe());
  }


  if (vol > thresholdTop && !clapping) {
    bird.up();
    clapping = true;
  }

  if (vol < thresholdBottom) {
    clapping = false;
  }

  fill(0, 255, 0);
  //println(vol);
  noStroke();
  float y = map(vol, 0, 1, height, 0);
  rect(width - 50, y, 50, height - y);

  float ty = map(thresholdTop, 0, 1, height, 0);
  stroke(255, 0, 0);
  strokeWeight(4);
  line(width - 50, ty, width, ty);

  float by = map(thresholdBottom, 0, 1, height, 0);
  stroke(0, 0, 255);
  strokeWeight(4);
  line(width - 50, by, width, by);
}

void keyPressed() {
  if (key == ' ') {
    bird.up();
    //console.log("SPACE");
  }
}
