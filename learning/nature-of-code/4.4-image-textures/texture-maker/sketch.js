// Particle Systems with Image Textures (Texture Maker)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/pUhv2CA0omA
// https://thecodingtrain.com/learning/nature-of-code/4.4-image-textures.html

// Texture Maker: https://editor.p5js.org/codingtrain/sketches/NS4rB1Yx-
// Image Texture: https://editor.p5js.org/codingtrain/sketches/TTVoNt58T
// Shader (WEBGL): https://editor.p5js.org/codingtrain/sketches/EXZmcc4m_

function setup() {
  createCanvas(512, 512);
  pixelDensity(1);
  background(0);
  loadPixels();
  const cx = width / 2;
  const cy = height / 2;
  const maxD = width / 2;
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const d = dist(cx, cy, i, j);
      const b = map(d, 0, maxD, 255, 0);
      let index = (i + j * width) * 4;
      pixels[index] = 255;
      pixels[index + 1] = 255;
      pixels[index + 2] = 255;
      pixels[index + 3] = b;
    }
  }
  updatePixels();
  // save("texture.png");
}
