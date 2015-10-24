// https://vimeo.com/channels/learningp5js/143374880
// p5 DOM reference: p5js.org/reference/#/libraries/p5.dom

var textbox;
var slider;
var paragraph;

function setup() {
  noCanvas();
  textbox = createInput("enter text");
  slider = createSlider(10, 64, 16);
  paragraph = createP("starting text");
  
  textbox.changed(updateText);
  slider.changed(updateSize);
  //slider.input(updateSize);
  //textbox.input(doSomething); not yet working due to editor issue (2015.10.24)
}

function updateSize() {
  // paragraph.style("font-size", "24pt");
  paragraph.style("font-size", slider.value() + "pt");  
}


function updateText() {
  paragraph.html(textbox.value());
}
