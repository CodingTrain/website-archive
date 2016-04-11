var video;
var slider;

function setup() {
  canvas = createCanvas(640, 480, WEBGL);
  canvas.id('p5canvas');
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.id('p5video');
  //video.hide();
  //slider = createSlider(0, 1, 0.5, 0.01);
  //slider.id('blur-slider');

  var seriously = new Seriously();

  var src = seriously.source('#p5video');
  var target = seriously.target('#p5canvas');

  // var blur = seriously.effect('blur');
  // blur.amount = '#blur-slider';
  // blur.source = src;
  // target.source = blur;

  var chroma = seriously.effect('chroma');
  chroma.source = src;
  target.source = chroma;
  var r = 98 / 255;
  var g = 175 / 255;
  var b = 116 / 255;
  chroma.screen = [r,g,b,1];





  seriously.go();



}


