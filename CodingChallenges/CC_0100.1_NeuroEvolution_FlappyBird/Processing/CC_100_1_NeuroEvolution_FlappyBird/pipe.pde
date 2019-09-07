class pipe{

  float top;
  float bottom;
  float x;
  float w;
  float speed;
  float spacing;

  pipe(){
    spacing = 125;
    top = random(height/ 6, .75 * height);
    bottom = height - (top + spacing);
    w = 80;
    x = width;
    speed = 6;
  }

  void show(){
    fill(255);
    rectMode(CORNER);
    rect(x, 0, w, top);
    rect(x, height-bottom, w, bottom);
  }

  void update(){
    x -= speed;
  }

  boolean offscreen(){
    return x < -w;
  }

  boolean hit(bird b){
    if (b.pos.y < top+b.r || b.pos.y+b.r > height-bottom){
      if (b.pos.x+b.r > x && b.pos.x < (x + w)+b.r)
        return true;
    }
    return false;
  }
}
